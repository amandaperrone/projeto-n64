const fs = require('fs');
// npm install --save dotenv
const dotenv = require('dotenv'); // Arquivos sensíveis 
// npm install --save mongoose
const  { Schema, model, connect} = require('mongoose');

dotenv.config();

const GameSchema = new Schema({title: String}, {strict: false})
const Game = model('Game', GameSchema)

const parseJSON = (data) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        return null;
    }
}

const connectToDB = () => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    return connect(process.env.DATABASE, options);
}

// Ler o arquivo .json
const readGamesFromFile = (filename) => {
    const promiseCallBack = (resolve, reject) => {

        fs.readFile(filename, (err, data) => {
            if(err) return reject(err);
            const json = parseJSON(data)
            if (!json) return reject(`Not able to parse JSON file ${filename}`)
            return resolve(json);
        });

    };
    
    return new Promise(promiseCallBack);
}

// Fazer um loop entre os itens
const storeGame = (data) => { // salva o jogo no banco
    const game = new Game(data)
    return game.save()
}

const importGames = async () => {
    await connectToDB() //conecta o banco

    const games = await readGamesFromFile('games.json') // lê os jogos do arq

    for(let i = 0; i < games.length; i++) { // salva os itens no banco
        const game = games[i]
        await storeGame(game)
        console.log(game.title)
    }

    process.exit()
}

importGames()

