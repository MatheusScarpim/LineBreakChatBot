var especialCharMask = (especialChar) => {
  especialChar = especialChar.replace('/[áàãâä]/ui', 'a');
  especialChar = especialChar.replace('/[éèêë]/ui', 'e');
  especialChar = especialChar.replace('/[íìîï]/ui', 'i');
  especialChar = especialChar.replace('/[óòõôö]/ui', 'o');
  especialChar = especialChar.replace('/[úùûü]/ui', 'u');
  especialChar = especialChar.replace('/[ç]/ui', 'c');
  return especialChar.toLowerCase();
};

var formataNumero = (numeroComMascara) => {
  formataNumero = numeroComMascara.replace('55', '').replace('@c.us', '');
  return formataNumero;
};

const tabelaUsuario = 'usuarioslinebreak';

const tabelaProduto = 'produtoslinebreak';

const dadosDobanco = {
  user: 'projetoscti',
  password: 'gaspar',
  host: 'pgsql.projetoscti.com.br',
  port: 5432,
  database: 'projetoscti',
};
const { Client } = require('pg');
const client = new Client(dadosDobanco);

exports.especialCharMask = especialCharMask;
exports.formataNumero = formataNumero;
exports.tabelaProduto = tabelaProduto;
exports.tabelaUsuario = tabelaUsuario;
exports.dadosDobanco = dadosDobanco;
exports.client = client;