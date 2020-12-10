const generateAttributeValues = require.requireActual('../../../src/utils/generate-attribute-values');

describe('O util generate attribute values', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve lançar um erro caso os parâmetros obrigatórios não sejam fornecidos', () => {
    expect(() => generateAttributeValues()).toThrow();
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

    expect(generateAttributeValues(options)).toEqual({
      ':name': {
        first: 'Foo',
        last: 'Bar'
      },
      ':phone': 99999999
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
      recursive: true
    };

    expect(generateAttributeValues(options)).toEqual({
      ':name_first': 'Foo',
      ':name_last': 'Bar',
      ':phone': 99999999
    });
  });
});
