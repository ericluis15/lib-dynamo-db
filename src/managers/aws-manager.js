const AWS = require('aws-sdk');
const generateExpression = require('../utils/generate-expression');
const generateAttributeValues = require('../utils/generate-attribute-values');
const generateAttributeNames = require('../utils/generate-attribute-names');

class AWSManager {
  /**
   * Cria um Manager.
   * @param {Object} config - Configuração da AWS | region: AWS region | endpoint: endpoint de acesso ao cache.
   */
  constructor(config) {
    this._dynamodb = new AWS.DynamoDB.DocumentClient({
      region: config.region,
      endpoint: config.endpoint
    });
  }

  /**
   * Adicona um item ao cache.
   * @param {Object} item - O objeto a ser guardado.
   * @param {Object} tableName - O nome da tabela.
   * @returns {Boolean} - O resultado da operação.
   */
  async create(item, tableName) {
    try {
      const params = {
        Item: item,
        TableName: tableName
      };

      return new Promise((resolve, reject) => {
        this._dynamodb.put(params, (error) => {
          if (error) {
            return reject(error);
          }
          return resolve(true);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Atualiza um item do cache
   * @param {Object} criteria - O criterio para a busca do objeto a ser atualizado.
   * @param {Object} item - O objeto a ser atualizado.
   * @param {Object} tableName - O nome da tabela.
   * @returns {Boolean} - O resultado da operação.
   */
  async update(criteria, props, tableName) {
    try {
      const options = { props, separator: ',', special: '#', recursive: true, action: 'set' };

      const params = {
        Key: criteria,
        ExpressionAttributeNames: generateAttributeNames(options),
        ExpressionAttributeValues: generateAttributeValues(options),
        UpdateExpression: generateExpression(options),
        TableName: tableName,
        ReturnValues: 'ALL_NEW'
      };

      return new Promise((resolve, reject) => {
        this._dynamodb.update(params, (error) => {
          if (error) {
            return reject(error);
          }
          return resolve(true);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deleta um item do cache pelo seu chave primária.
   * @param {Object} criteria - O objeto a ser deletado.
   * @param {Object} tableName - O nome da tabela.
   * @returns {Boolean} - O resultado da operação.
   */
  async delete(criteria, tableName) {
    try {
      const params = {
        Key: criteria,
        TableName: tableName
      };

      return new Promise((resolve, reject) => {
        this._dynamodb.delete(params, (error) => {
          if (error) {
            return reject(error);
          }
          return resolve(true);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtém um item do cache pelo sua chave primária.
   * @param {Object} criteria - O objeto a ser buscado.
   * @param {Object} tableName - O nome da tabela.
   * @returns {Object} - O item buscado.
   */
  async get(criteria, tableName) {
    try {
      const params = {
        Key: criteria,
        TableName: tableName
      };

      return new Promise((resolve, reject) => {
        this._dynamodb.get(params, (error, data) => {
          if (error) {
            return reject(error);
          }
          return resolve(data.Item);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtém itens do cache.
   * @param {Object} id - O id do item.
   * @param {Object} tableName - O nome da tabela.
   * @returns {Array} - A lista de itens buscado.
   */
  async scan(props, tableName) {
    try {
      const options = { props, separator: 'and' };

      const params = {
        TableName: tableName,
        FilterExpression: generateExpression(options),
        ExpressionAttributeValues: generateAttributeValues(options)
      };

      return new Promise((resolve, reject) => {
        this._dynamodb.scan(params, (error, data) => {
          if (error) {
            return reject(error);
          }
          return resolve(data.Items);
        });
      });
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Exporta a classe AWSManager.
 * @returns {AWSManager}
 */
module.exports = AWSManager;
