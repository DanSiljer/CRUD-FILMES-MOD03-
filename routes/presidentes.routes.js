const express = require('express');

const router = express.Router();

const presidentes = [
    {
        id: Date.now(),
        nome: 'Deodoro da Fonseca',
        partido: 'Nenhum',
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Deodoro_da_Fonseca_%281889%29.jpg/800px-Deodoro_da_Fonseca_%281889%29.jpg',
        ano:'1889 - 1891 ',
        governo: ' República da Espada',
        descricao: ' Em meio a diversas crises que assolavam a monarquia brasileira, Deodoro liderou o golpe de Estado que depôs o Império e proclamou a república no país. Com a mudança de sistema de governo, Deodoro assumiu o comando do país na qualidade de chefe do Governo Provisório da República. As primeiras mudanças de seu governo envolviam a criação do Código Penal Brasileiro, a reforma do Código Comercial do Brasil e medidas que oficializavam a separação da Igreja e o Estado.'
    },

    {
        id: Date.now(),
        nome: 'Floriano Peixoto',
        partido: 'Nenhum',
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Floriano_Peixoto_%281891%29.jpg/220px-Floriano_Peixoto_%281891%29.jpg',
        ano:'1891 - 1894 ',
        governo: ' República da Espada',
        descricao: 'Seu governo foi marcado por um intenso clima de rebeliões.'
    },
]

router.get('/', (req, res) => {
    res.send(presidentes);
})

router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const vaga = presidentes.find(presidente =>  presidente.id == idParam);

    if(!presidente) {
        res.status(404).send({erro: 'Presidente não encontrada'});
        return;
    }

    res.send(presidente);
})

router.post('/add', (req, res) => {
    const presidente = req.body;
    //validação
    if(!presidente || !presidente.nome || !presidente.partido || presidente.imagem || presidente.ano) {
        res.status(400).send({
            menssage: 'Cadastro inválido, preencha todos os campos'
        })
        return;
    }
    presidente.id = Date.now();
    presidentes.push(presidente);
    res.status(201).send({
        menssage: 'Cadastro com sucesso',
        data: presidente
    });
})

    router.put('/edit/:id', (req, res) => {
 
    const presidenteEdit = req.body;
    const idParam = req.params.id;

    let index = presidentes.findIndex(presidente => presidente.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'O Presidente que você está tentando editar não foi encontrada'
        })
        return;
    }

    presidentes[index] = {
        ...presidentes[index],
        ...presidenteEdit
    }

    res.send({
        message: `Presidente${Presidentes[index].titulo} atualizado com sucesso`,
        data: presidentes[index]
    })
})

router.delete('/delete/:id', (req, res) => {

    const idParam = req.params.id;

    const index = presidentes.findIndex(presidente => presidente.id == idParam);
    const nome = presidentes[index];
   
    presidentes.splice(index, 1);
    res.send({
        message: `Presidente ${nome.nome} excluida com sucesso !`,
    })
})

module.exports = router;