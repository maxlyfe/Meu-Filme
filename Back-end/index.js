const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const FilmesRoutes = require("./routes/filmes.routes");
const Conn = require("./conn/conn");

Conn();

app.use("/filmes", FilmesRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
