// importacao das libs externas (express e cors)
const express = require('express');
const cors = require('cors');

// importar as rotas
const presidentesRouter = require('./routes/presidentes.routes');
// inicializacao do express
const app = express();
// habilitar o modo json do express; JSON (Javascript Objective Notation)
app.use(express.json());
// habilitar o midleware do cors
app.use(cors());
//inicializar a rota /presidentes de acordo com as configuracoes do arquivo de rotas
app.use('/presidentes', presidentesRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})