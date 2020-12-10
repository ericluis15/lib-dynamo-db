const Handler = require.requireActual('../../src/handler.js');
const manager = require('../__mocks__/aws-manager');

describe('A classe Handler', () => {
  describe('no método create', () => {
    let _handler = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _handler = new Handler({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o manager falhe ao inserir o item', async () => {
      manager.__setValue(Promise.reject(new Error()));
      await expect(_handler.create({})).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      manager.__setValue(true);
      await expect(_handler.create({})).resolves.toBe(true);
    });
  });

  describe('no método update', () => {
    let _handler = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _handler = new Handler({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o manager falhe ao atualizar o item', async () => {
      manager.__setValue(Promise.reject(new Error()));
      await expect(_handler.update({})).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      manager.__setValue(true);
      await expect(_handler.update({})).resolves.toBe(true);
    });
  });

  describe('no método delete', () => {
    let _handler = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _handler = new Handler({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o manager falhe ao inserir o item', async () => {
      manager.__setValue(Promise.reject(new Error()));
      await expect(_handler.delete({})).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      manager.__setValue(true);
      await expect(_handler.delete({})).resolves.toBe(true);
    });
  });

  describe('no método get', () => {
    let _handler = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _handler = new Handler({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o manager falhe ao obter o item', async () => {
      manager.__setValue(Promise.reject(new Error()));
      await expect(_handler.get({})).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      manager.__setValue({
        someProperty: 'some-value'
      });
      await expect(_handler.get('some-id')).resolves.toMatchObject({
        someProperty: 'some-value'
      });
    });
  });

  describe('no método query', () => {
    let _handler = null;

    beforeEach(() => {
      jest.resetAllMocks();
      _handler = new Handler({
        region: 'some-region',
        endpoint: 'some-endpoint'
      });
    });

    it('deve lançar um erro caso o manager falhe ao obter o item', async () => {
      manager.__setValue(Promise.reject(new Error()));
      await expect(_handler.query({})).rejects.toBeInstanceOf(Error);
    });

    it('deve retornar o resultado da operação', async () => {
      manager.__setValue([{
        someProperty: 'some-value'
      }]);
      await expect(_handler.query('some-id')).resolves.toMatchObject([{
        someProperty: 'some-value'
      }]);
    });
  });
});
