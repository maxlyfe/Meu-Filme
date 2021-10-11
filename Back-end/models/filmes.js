const mongoose = require("mongoose"); // Importo o mongoose

const modeloFilme = new mongoose.Schema({
  // crio meu modelo (Schema) para estruturar como serão meus documentos.
  nome: { type: String, required: true },
  capa: { type: String, required: true },
  nota: { type: Number, required: true },
  descricao: { type: String, required: true },
});

const Filme = mongoose.model("filme", modeloFilme); //guardo a estrutura dentro da constante 'Filme'

module.exports = Filme; //exporto 'filme'.
