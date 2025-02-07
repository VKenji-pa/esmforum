const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('testando cadastro de uma pergunta e uma resposta para ela', () => {
  modelo.cadastrar_pergunta('Qual a molecula do octano?');
  modelo.cadastrar_resposta(0, 'C8H18');
  const perguntas = modelo.listar_perguntas();
  const respostas = modelo.get_respostas(0)
  expect(perguntas[0].texto).toBe('Qual a molecula do octano?');
  expect(respostas.length).toBe(1);
  expect(respostas[0].texto).toBe('C8H18');
});

test('testando cadastro de tres perguntas e a pesquisa pela 2a pergunta usando id', () => {
  modelo.cadastrar_pergunta('De onde vem o Jhin, de League of Legends');
  modelo.cadastrar_pergunta('Quantos balas tem na arma do Jhin?');
  modelo.cadastrar_pergunta('10 x 10 = ?');
  const perguntas = modelo.listar_perguntas();
  const segundaP = modelo.get_pergunta(perguntas[1].id_pergunta);
  expect(segundaP.texto).toBe('Quantos balas tem na arma do Jhin?') 
});
