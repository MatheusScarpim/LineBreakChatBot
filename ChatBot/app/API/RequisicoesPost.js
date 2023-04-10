const Hospeda = require('../API/HospedaExpress.js');

Hospeda.app.post('/disparoGrupo', async function (req, res) {
  console.log('Solicitou envio de mensagem VIA POST');
  console.log('Requested sending VIA POST message');

  //parametros vindos na requisição ... parameters coming in the request
  var telnumber = req.body.telnumber;
  var mensagemparaenvio = req.body.message;
  var idPessoa = req.body.idPessoa;
  var nomePessoa = req.body.nomePessoa;
  //***********/

  var mensagemretorno = ''; //mensagem de retorno da requisição ... request return message
  var sucesso = false; //Se houve sucesso na requisição ... If the request was successful
  var return_object;

  const executa = async () => {
    if (typeof Instancia === 'object') {
      // Validando se a lib está iniciada .... Validating if lib is started
      status = await Instancia.getConnectionState(); // validadado o estado da conexão com o whats

      if (status === 'CONNECTED') {
        let numeroexiste = await Instancia.checkNumberStatus(
          telnumber + '@c.us'
        ); //Validando se o número existe ... Validating if the number exists
        if (numeroexiste.canReceiveMessage === true) {
          await Instancia.sendText(
            numeroexiste.id._serialized,
            mensagemparaenvio
          )
            .then((result) => {
              console.log('Result: ', result); //return object success
              Instancia.sendText(
                '120363044398167308@g.us',
                'Uma nova pessoa foi cadastrada \nId: ' +
                  idPessoa +
                  '\nNome: ' +
                  nomePessoa
              );
              sucesso = true;
              mensagemretorno = result.id;
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
        } else {
          mensagemretorno =
            'O numero não está disponível ou está bloqueado - The number is not available or is blocked.';
        }
      } else {
        mensagemretorno =
          'Valide sua conexao com a internet ou QRCODE - Validate your internet connection or QRCODE';
      }
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
