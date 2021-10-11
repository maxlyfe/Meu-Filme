const mongoose = require("mongoose"); // Importo o Mongoose.

const Conn = () => {
  mongoose
    .connect("mongodb://localhost:27017/Filmes", {
      //conectamos com noso banco de dados (mongodb).
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conetado!");
    })
    .catch((err) => console.log(err));
};

module.exports = Conn;
