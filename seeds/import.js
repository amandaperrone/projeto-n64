const fs = require('fs');
// npm install --save dotenv
const dotenv = require('dotevn'); // Arquivos sensíveis 
// npm install --save mongoose
const  { Schema, model, connect} = require('mongoose');

dotenv.config();

console.log(process.env.DATABASE);

// Ler o arquivo .json
// Fazer um loop entre os itens
// Salvar cada um dos itens no banco