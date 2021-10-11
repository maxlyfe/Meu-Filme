const Filme = require("./../models/filmes"); //Importamos o Schema de models.

class FilmeServices {
  // criamos uma classe com as funções dentro.
  findAll = async () => await Filme.find(); //Função para pegar os filmes

  findById = async (id) => {
    // Função para pegar um filme por ID
    return await Filme.findById(id);
  };

  createFilme = async (filme) => {
    // Função para criar um filme
    return await Filme.create(filme);
  };

  upDateFilme = async (id, filme) => {
    return await Filme.updateOne({ _id: id }, filme);
  };

  deleteFilme = async (id) => {
    return await Filme.deleteOne({ _id: id });
  };
}

module.exports = FilmeServices; //Exportamos a classe com suas funções.
