const getPathsObject = require('./commons/get-paths-object');

/**
 * Trata o objeto de opções do útil.
 *
 * Tratamentos:
 *  - Mescla com as opções padrão
 *  - Valida opções obrigatórias
 *
 * @param {Object} options - O objeto de opções do util
 */
const _handleOptions = (options) => {
  if (!options) {
    throw new TypeError('The \'options\' param are required');
  }
  if (!options.props) {
    throw new TypeError('The \'props\' param are required');
  }

  return Object.assign({
    special: '',
    recursive: false
  }, options);
}

/**
 * Transforma um dado objeto para o objeto 'ExpressionAttributeNames' usado nos métodos da classe 'DynamoDB.DocumentClient'
 *
 * Exemplo:
 *  objeto: { name: "Foo" }
 *  resultado: { '<special>name': 'name' }
 *
 * Exemplo recursivo:
 *  objeto: { name: { first: "Foo", last: "Bar" } }
 *  resultado: { '<special>name': 'name', '<special>first': 'first', '<special>last': 'last' }
 *
 * @param {Object} options - O objeto de opções do util
 *    {string} props - Objeto a ser tranformado.
 *    {string} special (default = '') - Um caracter que será incluído no início do nome de cada chave do objeto gerado
 *    {Boolean} recursive (default = false) - Define se deve ser usado as sub-propriedades do objeto passado
 */
module.exports = (options) => {
  try {
    const { props, special, recursive } = _handleOptions(options);

    if (recursive) {
      return getPathsObject(props).reduce((o, k) => {
        k.path.forEach((value) => {
          Object.assign(o, { [`${special}${value}`]: value });
        });
        return o;
      }, {});
    }

    return Object.keys(props).reduce((o, k) => {
      return Object.assign(o, { [`${special}${k}`]: k });
    }, {});
  } catch (error) {
    throw error;
  }
};
