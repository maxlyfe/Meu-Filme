const express = require("express");
const FilmeController = require("./../controllers/filme.controllers");

const router = express.Router();
const filmesController = new FilmeController();

router.get("/", filmesController.getFilmes); //Rota par pegar os filmes.

router.get("/:id", filmesController.getFilmesById); // Rota para pegar um filme por id.

router.post("/add", filmesController.createFilme); // Rota para adicionar um filme.

router.put("/upDate/:id", filmesController.upDateFilme); // Rote para Atualizar o filme.

router.delete("/delete/:id", filmesController.DeleteFilme); // Rota para deletar um filme.

module.exports = router;
