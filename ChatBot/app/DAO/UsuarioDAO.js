const { Client } = require('pg');
const Utils = require('../Utils/Utils.js');
const client = new Client(Utils.dadosDobanco);
/**********************Funções pega valores************************* */

var jsonUsuarioEspecifico = async (pergunta) => {
  var retorno;
  try {
    const res = await Utils.client.query(
      `SELECT * from ${Utils.tabelaUsuario} where (cpf = $1 or numero = $1)`,
      [Utils.formataNumero(pergunta)]
    );
    console.log(res.rowCount);
    if (res.rows != null && res.rowCount != 0) {
      retorno = res.rows[0]
      
    }
  } catch (error) {
    console.error('Erro jsonUsuarioEspecifico ', error);
  }
  
  return retorno;
};

const JsonTodosUsuarios = async (i) => {
  try {
    const res = await Utils.client.query('SELECT * from usuarioslinebreak');
    if (res.rows !== null)
      return JSON.stringify(res.rows[i])
        .replace(/[{}":]\s/g, '')
        .replace('nomeusu', '');
  } catch (err) {
    console.log(err);
  }
};

/****************Cadastros***************** */

var cadastrarLogin = async (
  cpf,
  nomeusu,
  niver,
  email,
  senha,
  numero,
  excluido
) => {
  var retorno;
  try {
    Utils.client.query(
      "INSERT INTO usuarioslinebreak(idusuario,cpf,nomeusu,niver,email,senha,numero,excluido) values(DEFAULT,$1,$2,$3,$4,$5,$6,'n')",
      [cpf, nomeusu, niver, email, senha, numero, excluido]
    ),
      (err, res) => {
        if (err) {
          console.error(err);
          retorno = 'Erro não foi possivel te cadastrar, tente novamente';
        } else {
          resposta = 'Cadastrado com sucesso';
          console.log(res.rows[0]);
        }
      };
  } catch (err) {
    retorno = 'Erro não foi possivel te cadastrar, tente novamente';
  }
  
  return retorno;
};

exports.JsonTodosUsuarios = JsonTodosUsuarios;
exports.cadastrarLogin = cadastrarLogin;
exports.jsonUsuarioEspecifico = jsonUsuarioEspecifico;