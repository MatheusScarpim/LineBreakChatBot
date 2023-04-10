const Hospeda = require('../API/HospedaExpress.js');

Hospeda.app.get('/getconnectionstatus', async function (req, res) {
  console.log('Solicitou status de conexao');
  console.log('Requested connection status');

  var mensagemretorno = ''; //mensagem de retorno da requisição ... request return message
  var sucesso = false; //Se houve sucesso na requisição ... If the request was successful
  var return_object;

  const executa = async () => {
    if (typeof Instancia === 'object') {
      // Validando se a lib está iniciada .... Validating if lib is started
      mensagemretorno = await Instancia.getConnectionState(); // validadado o estado da conexão com o whats
      //whats connection status validated
      sucesso = true;
    } else {
      mensagemretorno =
        'A instancia não foi inicializada - The instance was not initialized';
    }
    return_object = {
      status: sucesso,
      message: mensagemretorno,
    };
    res.send(return_object);
  };
  executa();
});
