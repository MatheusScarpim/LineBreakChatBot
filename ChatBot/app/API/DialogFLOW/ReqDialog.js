const Hospeda = require('../HospedaExpress.js');
const { WebhoookClient } = require('dialogflow-fulfillment');
const dialogflow = require('@google-cloud/dialogflow');

Hospeda.app.post('/webhook', function (request, response) {
  const agent = new WebhoookClient({ request, response });
  let intentMap = new Map();
  intentMap.set('nomedaintencao', nomedafuncao);
  agent.handleRequest(intentMap);
});

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: 'suachave',
});
async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };
  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }
  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}
var pegarValores = async (
  projectId,
  sessionId,
  queries,
  languageCode
) =>  {
  let context;
  let intentResponse;
  for (const query of queries) {
    try {
      console.log(`Pergunta: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      console.log('Enviando Resposta');
      console.log(intentResponse.queryResult.fulfillmentText);
      var resposta = intentResponse.queryResult.fulfillmentText;
      return {
        Texto: resposta,
        FinalInteracao: intentResponse.queryResult.intent.endInteraction,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

exports.pegarValores = pegarValores;