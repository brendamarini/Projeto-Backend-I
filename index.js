
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const port = 3000;
const app = express();
app.use(express.json())

let lista = [
];

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});

app.get('/getlista', (req, res) => {
    res.send(lista);
});

app.get('/getlista/:id', (req, res) => {
    const list = lista.find(t => t.id === req.params.id);
    if (!list) {
        res.status(404).send('Tarefa não encontrada na lista');
    } else {
        res.send(list);
    }
});



app.post('/includelistas', (req, res) => {
    const tarefa = {
        id: uuidv4(),
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        finalizada: false
    };
    lista.push(tarefa);
    res.send(`<h1> A lista ${JSON.stringify(tarefa)} foi adicionada! </h1>`);
});

app.put('/updatelista/:id', (req, res) => {
    const index = lista.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        res.status(404).send('Tarefa não encontrada');
    } else {
        const tarefa = {
            id: req.params.id,
            titulo: req.body.titulo || lista[index].titulo,
            descricao: req.body.descricao || lista[index].descricao,
            finalizada: req.body.finalizada || lista[index].finalizada
        };
        lista[index] = tarefa;
        res.send(`<h1> A lista ${JSON.stringify(tarefa)} foi atualizada! </h1>`);
    }
});

app.delete('/deletelista/:id', (req, res) => {
    lista = lista.filter(tarefa => tarefa.id !== req.params.id);
    res.json({ message: 'Tarefa removida' });
});
