const generateAttributeNames = require.requireActual('../../../src/utils/generate-attribute-names');

describe('O util generate attribute names', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve lançar um erro caso os parâmetros obrigatórios não sejam fornecidos', () => {
    expect(() => generateAttributeNames()).toThrow();
  });

  it('deve gerar a expressão com opções padrão quando as opcionais não forem fornecidas', () => {
    const options = {
      props: {
        name: {
          first: 'Foo',
          last: 'Bar'
        },
        phone: 99999999
      }
    };

    expect(generateAttributeNames(options)).toEqual({
      'name': 'name',
      'phone': 'phone'
    });
  });

  it('deve gerar a expressão com opções fornecidas', () => {
    const options = {
      props: {
        name: {
          first: 'Foo',
          last: 'Bar'
        },
        phone: 99999999
      },
      special: '#',
      recursive: true
    };

    expect(generateAttributeNames(options)).toEqual({
      '#name': 'name',
      '#first': 'first',
      '#last': 'last',
      '#phone': 'phone'
    });
  });
});
