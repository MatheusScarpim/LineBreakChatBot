const Chamadas = require('./chamadas.js');
const ProdutoDAO = require('../DAO/ProdutoDAO.js');
const UsuarioDAO = require('../DAO/UsuarioDAO.js');

var mensagemAjuda =  `---------------------------------------------------------\n\n
 *Fazer o seu cadastro*\n
 ${Chamadas.EventosCadastro.join('\n ')}\n
 !ping *Testar Conexão*\n
 *Ver suas informações*\n
 ${Chamadas.EventosInfo.join('\n ')} \n\n
---------------------------------------------------------`;
const mensagemProduto = async (idProduto) => {
  var texto;
  try {
    var json = ProdutoDAO.jsonProdutoEspecifico(idProduto);
    texto = `
            Informações do Produto
            Id do produto = ${json.idproduto}\n
            Nome do Produto = ${json.nomeper}\n
            Preço = ${json.preco}
            `;
  } catch (error) {
    console.error('Erro na função mensagemProduto ', error);
  }
};

var mensagemUsuarioEspecifico = async (cpf) => {
  console.log("Caiu especifico")
  var texto;
  try {
    var json = await UsuarioDAO.jsonUsuarioEspecifico(cpf);
texto = `
Informações do usuário\n
Id do usuário = ${json.idusuario}\n
Nome = ${json.nomeusu}\n
CPF = ${json.cpf}\n
Email = ${json.email}\n
Número = ${json.numero}
`;
  } catch (error) {
    console.error('Erro na função mensagem ', error);
  }
  return texto.toString();
};

exports.mensagemAjuda = mensagemAjuda;
exports.mensagemProduto = mensagemProduto;
exports.mensagemUsuarioEspecifico = mensagemUsuarioEspecifico;
