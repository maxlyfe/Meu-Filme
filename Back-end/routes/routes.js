const express = require('express');
const routes = express.Router();

const filmes = [
    {
        id: Date.now(),
        img: 'data:image/jpeg;base64,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',
        titulo: 'Homem Aranha 3',
        nota: '9',
        genero: 'Ficção Científica',
    },
]

routes.get('/:id', (req, res) => {
    const idParams = req.params.id;
    const index = filmes.findIndex(filme => filme.id == idParams);
    const filme = filmes[index];
    res.send(filme);
});

routes.post('/add', (req, res) => {
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: 'Seu filme foi adicionado!',
        data: filme
    });
});

routes.put('/:id', (req, res) => {
    const filmeEdit = req.body;
    const id = req.params.id;
    let pelicula = filme.find((filme) => filme.id == id);

    pelicula.imagem = filmeEdit.imagem;
    pelicula.titulo = filmeEdit.titulo;
    pelicula.nota = filmeEdit.nota;
    pelicula.genero = filmeEdit.genero;

    res.send({
        message:  `Filme ${pelicula.id} foi atualizado`,
    });
});

routes.delete('/:id', (req, res) =>{
    const id = req.params.id;
    const idnex =  filmes.findIndex((filme) => filme.id == id);
    filmes.splice(index, 1);

    res.send({
        message: `Deletado com sucesso`,
    });
});

module.exports = routes;