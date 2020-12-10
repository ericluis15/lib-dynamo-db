const Manager = require('./managers/aws-manager');
const config = require('../config/aws');

/**
 * Uma classe que representa o cache.
 */
class Cache {
  /**
   * Cria um Cache.
   * @param {string} keyName - O nome da tabela/coleção.
   */
  constructor() {
    this._manager = new Manager(config);
  }

  /**
   * Adicona um item ao cache.
   * @param {Object} item - O objeto a ser guardado.
   * @returns {Boolean} - O resultado da operação.
   */
  async create(keyName, item) {
    try {
      return await this._manager.create(item, keyName);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Altera um item do cache
   * @param {Object} key - A chave do objeto a ser alterado.
   * @param {Object} attributes - o atributos que serão alterados.
   * @returns {Boolean} - O resultado da operação.
   */
  async update(keyName, key, attributes) {
    try {
      return await this._manager.update(key, attributes, keyName);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deleta um item do cache pelo seu id.
   * @param {Object} criteria - O objeto a ser deletado.
   * @returns {Boolean} - O resultado da operação.
   */
  async delete(keyName, criteria) {
    try {
      return await this._manager.delete(criteria, keyName);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtém um item do cache pelo seu id.
   * @param {Object} criteria - O objeto a ser buscado.
   * @returns {Object} - O item buscado.
   */
  async get(keyName, criteria) {
    try {
      return await this._manager.get(criteria, keyName);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtém itens do cache.
   * @param {Object} props - As propriedades de para busca.
   * @returns {Array} - A lista de itens buscado.
   */
  async query(keyName, props) {
    try {
      return await this._manager.scan(props, keyName);
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Exporta a classe Cache.
 * @returns {Cache}
 */
module.exports = Cache;
