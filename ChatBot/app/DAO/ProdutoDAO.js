const { Client } = require('pg');
const Utils = require('../Utils/Utils.js');

const jsonProdutoEspecifico = async (pergunta) => {
  var retorno;
  try {
    const res = await Utils.client.query(
      `SELECT * from ${Utils.tabelaProduto} where idproduto = $1`,
      [pergunta]
    );
    if (res.rows != null) {
      retorno = JSON.parse(res.rows[0]);
    }
  } catch (error) {
    console.error('Erro jsonUsuarioEspecifico ', error);
  }
  
  return retorno;
};

exports.jsonProdutoEspecifico = jsonProdutoEspecifico;
