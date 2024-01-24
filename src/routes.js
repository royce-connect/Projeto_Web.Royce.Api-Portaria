const express = require('express');

const routes = express.Router();
const DocumentoController = require('./Controllers/Documento');
const PortariaController = require('./Controllers/Portaria');
const NFControleController = require('./Controllers/NfControle');
const NFControleDSController = require('./Controllers/NfControleDS');
const PedidosController = require('./Controllers/Separacao/Pedidos');

routes.get('/PedirDocumento', DocumentoController.PedirDoc);
routes.get('/Documento', DocumentoController.Imagem);
routes.get('/DadosDoc', DocumentoController.DadosDoc);
routes.post('/InserirDocumento', DocumentoController.IncluiDoc);
routes.get('/Saida', DocumentoController.Saida);

routes.post('/Portaria', PortariaController.Incluir);

// ENDPOINT PARA NF Controle
routes.post('/nf/nota', NFControleController.Incluir);

// ENDPOINT PARA NF Controle da DSPlastic
routes.post('/ds/nf/nota', NFControleDSController.Incluir);

// ENDPOINT PARA APP SEPARACAO
routes.get('/separacao/pedidos', PedidosController.Pedidos);
routes.get('/separacao/pedidos/item', PedidosController.Itens);

routes.get('/UptimeRobot', (request, response) =>{ return response.status(200).json({msg: "ok"}); });

module.exports = routes;