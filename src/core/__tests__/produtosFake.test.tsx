import produtosFake from '../screens/produtosFake';

describe('produtosFake', () => {
  it('deve ser um array com itens', () => {
    expect(Array.isArray(produtosFake)).toBe(true);
    expect(produtosFake.length).toBeGreaterThan(0);
  });

  it('cada produto deve ter id, nome, preco e imagem', () => {
    produtosFake.forEach(produto => {
      expect(produto).toHaveProperty('id');
      expect(typeof produto.id).toBe('number');

      expect(produto).toHaveProperty('nome');
      expect(typeof produto.nome).toBe('string');
      expect(produto.nome.length).toBeGreaterThan(0);

      expect(produto).toHaveProperty('preco');
      expect(typeof produto.preco).toBe('number');
      expect(produto.preco).toBeGreaterThan(0);

      expect(produto).toHaveProperty('imagem');
      expect(typeof produto.imagem).toBe('string');
      expect(produto.imagem.startsWith('http')).toBe(true);
    });
  });
});
