const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors()); // determina que pode usar a aplicação ex. na opcoão origin:meuapp.com.br
app.use(express.json());
app.use(routes);


app.listen(3333);