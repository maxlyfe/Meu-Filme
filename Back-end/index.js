const express = require('express');

const app = express();

app.use(express.json());

const cors = require('cors');

app.use(cors());

const routes = require('../Back-end/routes/routes');

app.use('/filmes', routes);

app.get('/', (req, res) => {
    res.send('Home');
});

const port = 3000;

app.listen(port, () => {
    console.log(`O servidor roda na porta ${port}`);
});