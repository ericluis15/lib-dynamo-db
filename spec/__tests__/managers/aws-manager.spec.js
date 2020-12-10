const AWSManager = require.requireActual('../../../src/managers/aws-manager.js');
const aws = require('../../__mocks__/aws-sdk');

describe('A classe AWSManager', () => {
  describe('no método create', () => {
    let _awsManager = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _awsManager = new AWSManager({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o aws-sdk falhe ao inserir o item', async () => {
      aws.__setValue(new Error(), {});
      await expect(_awsManager.create({}, 'some_table')).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      aws.__setValue(null, {});
      await expect(_awsManager.create({}, 'some_table')).resolves.toBe(true);
    });
  });

  describe('no método update', () => {
    let _awsManager = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _awsManager = new AWSManager({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o aws-sdk falhe ao atualizar o item', async () => {
      aws.__setValue(new Error(), {});
      await expect(_awsManager.update({}, 'some_table')).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      aws.__setValue(null, {});
      await expect(_awsManager.update({}, 'some_table')).resolves.toBe(true);
    });
  });

  describe('no método delete', () => {
    let _awsManager = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _awsManager = new AWSManager({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o aws-sdk falhe ao deletar o item', async () => {
      aws.__setValue(new Error(), {});
      await expect(_awsManager.delete({}, 'some_table')).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      aws.__setValue(null, {});
      await expect(_awsManager.delete({}, 'some_table')).resolves.toBe(true);
    });
  });

  describe('no método get', () => {
    let _awsManager = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _awsManager = new AWSManager({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o aws-sdk falhe ao obter o item', async () => {
      aws.__setValue(new Error(), {});
      await expect(_awsManager.get({}, 'some_table')).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      aws.__setValue(null, {
        Item: {
          someProperty: 'some-value'
        }
      });
      await expect(_awsManager.get('some-id', 'some_table')).resolves.toMatchObject({
        someProperty: 'some-value'
      });
    });
  });

  describe('no método scan', () => {
    let _awsManager = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _awsManager = new AWSManager({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o aws-sdk falhe ao obter o item', async () => {
      aws.__setValue(new Error(), {});
      await expect(_awsManager.scan({}, 'some_table')).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      aws.__setValue(null, {
        Items: [{
          someProperty: 'some-value'
        }]
      });
      await expect(_awsManager.scan('some-id', 'some_table')).resolves.toMatchObject([{
        someProperty: 'some-value'
      }]);
    });
  });
});
