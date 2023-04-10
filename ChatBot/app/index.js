const wppconnect = require('@wppconnect-team/wppconnect');
const Chamadas = require('./Utils/chamadas.js');
const Utils = require('./Utils/Utils.js');
const Mensagem = require('./Utils/Mensagens.js');
const dialogflow = require('./API/DialogFLOW/ReqDialog.js');
const UsuarioDAO = require('./DAO/UsuarioDAO.js');
const HospedaExpress = require('./API/HospedaExpress.js');
Utils.client.connect();
var Instancia;

/*************Liga ChatBot***************** */
wppconnect
  .create({
    session: 'linebreak',
    headless: true,
    devtools: false,
    useChrome: true,
    debug: false,
    logQR: true,
    browserWS: '',
    browserArgs: [''],
    puppeteerOptions: {},
    disableWelcome: false,
    updatesLog: false,
    autoClose: 60000,
    tokenStore: 'file',
    folderNameToken: './tokens',
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

/***************Funções ChatBot******************* */
function start(client) {
  Instancia = client;
  client.onMessage(async (msg) => {
    try {
      var pergunta = Utils.especialCharMask(msg.body).toLowerCase();
      console.log(Chamadas.EventosAjuda.includes(pergunta))
      if (Chamadas.EventosAjuda.includes(pergunta)) {
        const resposta = Mensagem.mensagemAjuda;
        console.log(resposta)
        client.sendText(msg.from, resposta);
      }else if (Chamadas.EventosInfo.includes(pergunta)) {
        const resposta = await Mensagem.mensagemUsuarioEspecifico(
          Utils.formataNumero(msg.from)
        );
        console.log(resposta);
        client.sendText(msg.from,resposta);
      } else if (
        msg.body.includes('!cpf ') &&
        Chamadas.NumeroAdmin.includes(msg.from)
      ) {
        const pergunta = msg.body.substring(5, msg.body.length);
        const resposta = await Mensagem.mensagemUsuarioEspecifico(pergunta);
        setTimeout(() => {
          client.sendText(msg.from, resposta);
        }, 1000);
      }else if(msg.body == "ping"){
        client.sendText(msg.from,"pong")
      } else {
        var textoResposta = await dialogflow.pegarValores(
          'newagent-vqrt',
          msg.from,
          [msg.body],
          'pt-BR'
        );
        console.log(textoResposta.Texto + " TextoFinal");
        console.log(textoResposta.FinalInteracao + " FinalInteração");
        if (textoResposta.FinalInteracao == 'true') {
          let number = Utils.formataNumero(msg.from);
          let registarBanco = (
            textoResposta
              .replace('Data de nascimento: ', '')
              .replace('Senha: ', '')
              .replace('CPF: ', '')
              .replace('Nome: ', '')
              .replace('Email: ', '  ')
              .replace('false', '')
              .replace('true', '') +
            ',' +
            number
          )
            .replace('\n', ',')
            .replace('\n', ',')
            .replace('\n', ',')
            .replace('\n', ',');
          console.log(registarBanco.split(','));
          concat = registarBanco.split(',');
          const setuserfrom = await UsuarioDAO.cadastrarLogin();
          console.log(setuserfrom);
        }
        client.sendText(msg.from,textoResposta.Texto);
      }
    } catch (e) {
      console.log(e);
    }
  });
}
