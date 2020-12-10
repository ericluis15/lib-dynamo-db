const generateExpression = require.requireActual('../../../src/utils/generate-expression');

describe('O util generate expression', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve lançar um erro caso os parâmetros obrigatórios não sejam fornecidos', () => {
    expect(() => generateExpression()).toThrow();
    expect(() => generateExpression({ props: {} })).toThrow();
    expect(() => generateExpression({ separador: 'and' })).toThrow();
  });

  it('deve lançar um erro caso o action passado não exista', () => {
    const options = { props: {}, separador: '', action: 'not_exists' };
    expect(() => generateExpression(options)).toThrow();
  });

  it('deve gerar a expressão com opções padrão quando as opcionais não forem fornecidas', () => {
    const options = {
      props: {
        name: {
          first: 'Foo',
          last: 'Bar'
        },
        phone: 99999999
      },
      separator: 'and'
    };

    expect(generateExpression(options)).toEqual('name = :name and phone = :phone');
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
      separator: 'and',
      action: 'set',
      special: '#',
      recursive: true
    };

    expect(generateExpression(options)).toEqual('SET #name.#first = :name_first and #name.#last = :name_last and #phone = :phone');
  });
});
