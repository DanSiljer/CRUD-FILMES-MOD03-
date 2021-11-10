const express = require('express');

const router = express.Router();

const presidentes = [
    {
        id: Date.now(),
        nome: 'Deodoro da Fonseca',
        partido: 'Nenhum',
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Deodoro_da_Fonseca_%281889%29.jpg/800px-Deodoro_da_Fonseca_%281889%29.jpg',
        ano:'1889 - 1891 ',
        governo: ' Governo Constitucional (eleitos por voto indireto)',
        descricao: 'Deodoro da Fonseca foi o primeiro presidente do Brasil. Militar, ele assumiu o poder depois da Proclamação da República, em 1889. Foi o responsável pela primeira Constituição Republicana do país. Seu governo foi instável, pois era um momento de transição da monarquia para o regime republicano. Governou até 1891, quando ele renuncia ao cargo devido a graves problemas econômicos, como inflação, falência de bancos e fechamento de indústrias.'
    },

    {
        id: Date.now(),
        nome: 'Floriano Peixoto',
        partido: 'Nenhum',
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Floriano_Peixoto_%281891%29.jpg/220px-Floriano_Peixoto_%281891%29.jpg',
        ano:'1891 - 1894 ',
        governo: ' Governo Constitucional (eleitos por voto indireto)',
        descricao: 'Assumiu a presidência em 1891, consolidando o regime republicano. Conhecido como Marechal de Ferro, junto com Deodoro da Fonseca governou no período chamado República da Espada, pois os dois eram militares. Reprimiu revoltas populares que exigiam novas eleições, pois ele assumiu o cargo por ser vice-presidente de Deodoro, sem eleições diretas. Apesar disso, conseguiu reduzir em parte os impostos, aluguéis e produtos, o que melhorou um pouco a vida da população. Enfrentou a insatisfação da elite cafeeira e revoltas como a Revolução Federalista e a Revolta Armada.'
    },

    {
        id: Date.now(),
        nome: 'Campos Salles ',
        partido: '',
        img:'https://s.ebiografia.com/img/ca/mp/campos_sales_c.jpg',
        ano:'1898 a 1902',
        governo: 'Governo Constitucional (eleitos por voto popular)',
        descricao: 'Fazendeiro e advogado, Campos Salles representava a oligarquia cafeeira de São Paulo. Assume o poder em 1898, em meio a uma enorme crise econômica, dívida externa e redução dos preços do café para exportação. Por isso, Salles adota medidas para conter a crise, aumentando impostos e cancelando obras públicas, o que afetou fortemente os setores pobres do país..'
    },

    {
        id: Date.now(),
        nome: 'Rodrigues Alves ',
        partido: '',
        img:'https://s.ebiografia.com/img/ro/dr/rodrigues_alves_3_c.jpg',
        ano:'1902 a 1906',
        governo: 'Governo Constitucional (eleitos por voto popular)',
        descricao: 'O primeiro presidente eleito do século XX no Brasil foi Rodrigues Alves, também pertencente à elite cafeeira paulista. Em seu mandato teve destaque estímulos à reurbanização, políticas de saneamento básico e modernização. Entretanto, para concluir esses planos, desalojou populações carentes a fim de construir estradas e obras, o que resultou na origem das favelas. Ele foi também o responsável, com o apoio do médico Oswaldo Cruz, pela Lei da Vacinação Obrigatória, que, imposta sem uma prévia conscientização da população, gerou a Revolta da Vacina, em 1904.'
    },
]

router.get('/', (req, res) => {
    res.send(presidentes);
})
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const presidente = presidentes.find(presidente =>  presidente.id == idParam);

    if(!presidente) {
        res.status(404).send({error: 'Presidente não encontrado'});
        return;
    }

    res.send(presidente);
})

router.post('/add', (req, res) => {
    const presidente = req.body;
    //validação
    if(!presidente || !presidente.nome || !presidente.img || !presidente.ano) {
        res.status(400).send({
            message:'Cadastro inválido, preencha todos os campos'
        })
        return;
    }
    presidente.id = Date.now();
    presidentes.push(presidente);
    res.status(201).send({
        message: 'Cadastro com sucesso',
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
        message: `Presidente ${presidentes[index].nome} atualizado com sucesso`,
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