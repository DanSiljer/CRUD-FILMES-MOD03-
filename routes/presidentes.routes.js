const express = require('express');
// inicializar as rotas do express
const router = express.Router();

const presidentes = [
    {
        id: Math.random(),
        nome: 'Floriano Vieira Peixoto',
        partido: 'Militar',
        imagem:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Floriano_Peixoto_%281891%29.jpg/214px-Floriano_Peixoto_%281891%29.jpg',
        ano:'1891 - 1894 ',
    },
]

// [GET] /presidentes - Retornar uma lista de presidentes
router.get('/', (req, res) => {
    res.send(presidentes);
})

// [GET] /presidentes/{id} - Retornar um unico presidente por id.
router.get('/:id', (res, req) => {
    const idParam = req.params.id;
    const presidente = presidentes.find(presidente.id == idParam);

    // verifica se o presidente nao foi encontrado
    if(!presidente) {
        res.statusCode(404).send({error: 'Presidente não encontrado'});
        return;
    }
    res.send(presidente);
})

// [POST] /presidentes/add - Cadastro de uma nova presidente
router.post('/add', (req, res) => {
    const presidente = req.body;

    //validação
    if(!presidente || !presidente.nome || !presidente.partido || presidente.imagem || presidente.ano) {
        res.status(400).send({
            menssage: 'Cadastro inválido, preencha todos os campos'
        })
        return;
    }
    presidente.id = Math.random();
    presidentes.push(presidente);
    res.status(201).send({
        menssage: 'Cadastro com sucesso',
        data: presidente
    });
})