const mongoose = require("mongoose"); //Importamos o mongoose.

const FilmesServices = require("./../services/filme.services"); // Importamos a classe FilmeServices.

const filmeServices = new FilmesServices();

class FilmesController {
  getFilmes = async (req, res) => {
    // pega todos os filmes
    const filmes = await filmeServices.findAll();
    res.send(filmes); //responde como todos os filmes
  };

  getFilmesById = async (req, res) => {
    // Pega filme por ID
    const id = req.params.id; //Guarda o parametro ID na constanto id.

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(403).send("Não Achei esse ID");
      return;
    }

    const filme = await filmeServices.findById(id);

    if (!filme) {
      res.status(404).send("Não consegui achar o filme.");
    }
    res.status(200).send(filme); // Se passar pelos 2 IF retorna o filme.
  };

  createFilme = async (req, res) => {
    const filme = req.body;
    const filmeSalvo = await filmeServices.createFilme(filme);
    res.send({
      message: `Filme foi adicionado com sucesso.`,
    });
  };

  upDateFilme = async (req, res) => {
    const id = req.params.id;
    const filme = req.body;
    await filmeServices
      .upDateFilme(id, filme)
      .then(() => {
        res.status(200).send({ message: "Filme Atualizado." });
      })
      .catch((err) => {
        console.log(err), res.status(400).send({ error: err });
      });
  };

  DeleteFilme = async (req, res) => {
    const id = req.params.id;
    await filmeServices.deleteFilme(id);
    res.send({
      message: "Filme Excluido",
    });
  };
}

module.exports = FilmesController;
