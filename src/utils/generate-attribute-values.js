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
    recursive: false
  }, options);
}

/**
 * Transforma um dado objeto para o objeto 'ExpressionAttributeValues' usado nos métodos da classe 'DynamoDB.DocumentClient'
 *
 * Exemplo:
 *  objeto: { name: "Foo" }
 *  resultado: { ':name': "Foo" }
 *
 * Exemplo recursivo:
 *  objeto: { name: { first: "Foo", last: "Bar" } }
 *  resultado: { ':name_first': "Foo", name_last: "Bar" }
 *
 * @param {string} props - Objeto a ser tranformado.
 * @param {Boolean} recursive (default = false) - Define se deve ser usado as sub-propriedades do objeto passado
 */
module.exports = ({ props, recursive = false }) => {
  if (!props) {
    throw new TypeError('The \'props\' params are required');
  }

  try {
    if (recursive) {
      return getPathsObject(props).reduce((o, k) => {
        return Object.assign(o, { [`:${k.path.join('_')}`]: k.value });
      }, {});
    }

    return Object.keys(props).reduce((o, k) => {
      return Object.assign(o, { [`:${k}`]: props[k] });
    }, {});
  } catch (error) {
    throw error;
  }
};
