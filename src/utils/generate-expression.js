const getPathsObject = require('./commons/get-paths-object');

/**
 * Ações permitidas que serão adicionadas a query gerada
 */
const allowedActions = {
  set: 'SET ',
  remove: 'REMOVE ',
  add: 'ADD ',
  delete: 'DELETE ',
  none: ''
};

/**
 * Trata o objeto de opções do útil.
 *
 * Tratamentos:
 *  - Mescla com as opções padrão
 *  - Valida opções obrigatórias
 *  - Valida a action fornecida
 *
 * @param {Object} options - O objeto de opções do util
 */
const _handleOptions = (options) => {
  if (!options) {
    throw new TypeError('The \'options\' param are required');
  }
  if (!options.props || !options.separator) {
    throw new TypeError('The \'props\' and \'separator\' params are required');
  }

  options = Object.assign({
    action: 'none',
    special: '',
    recursive: false
  }, options);

  if (options.action !== 'none' && !allowedActions[options.action]) {
    throw new TypeError('The action does not exists');
  }

  return options;
}

/**
 * Transforma um dado objeto para a query 'UpdateExpression' e 'FilterExpression' usados nos métodos da classe 'DynamoDB.DocumentClient'.
 *
 *  Exemplo:
 *   objeto: { name: "Foo" }
 *   resultado: "<special>name = :name"
 *
 *  Exemplo recursivo:
 *   objeto: { name: { first: "Foo", last: "Bar" } }
 *   resultado: "<special>name.<special>first = :name_first <separator> <special>name.<special>last = :name_last }
 *
 * @param {Object} options - O objeto de opções do util
 *    {string} props - Objeto a ser tranformado.
 *    {string} separator - Separador entre as chaves.
 *    {string} action (default = 'none') - A ação da expressão que será gerada | set | add | delete | remove
 *    {string} special (default = '') - Um caracter que será incluído no início do nome de cada chave do objeto gerado
 *    {Boolean} recursive (default = false) - Define se deve ser usado as sub-propriedades do objeto passado
 */
module.exports = (options) => {
  try {
    const { props, separator, action, special, recursive } = _handleOptions(options);

    if (recursive) {
      const generatedExpression = getPathsObject(props).map((item) => {
        item.converted = item.path.map((p) => `${special}${p}`);
        return `${item.converted.join('.')} = :${item.path.join('_')}`;
      }).join(` ${separator} `);

      return `${allowedActions[action]}${generatedExpression}`;
    }

    const generatedExpression = Object.keys(props).map((k) => {
      return `${special}${k} = :${k}`;
    }).join(` ${separator} `);

    return `${allowedActions[action]}${generatedExpression}`;
  } catch (error) {
    throw error;
  }
};
