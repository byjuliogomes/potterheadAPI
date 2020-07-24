require('./dbConnect');
const Personagem = require('./personagem');
const uuid = require('uuid');
const User = require('./usuario.modelo');
const axios = require("axios")

async function isAuthorized(req, res) {
    // const token = req.header('Token');
    const token = req.query.token;
    const user = await User.findOne({ token });
    if (!user) {
        res.status(401).json({ message: 'Acesso negado: token inválido' });
        return false;
    }
    return true;
}

function setup(app) {


    app.post('/signup', async (req, res) => {
        const email = req.body.email;
        // finge que a gente validou que é um email

        const user = await User.findOne({ email: email });
        if (user) {
            res.status(200).json({ message: 'Usuário ja existente', token: user.token });
            return;
        }

        const token = uuid.v4();
        const newUser = new User({
            email: email,
            token: token,
        });

        newUser.save()
            .then(() => {
                res.status(201).json({ message: 'Aqui está seu token de acesso', token: token });
            })
            .catch((error) => {
                res.status(400).json({ message: error.message });
            });
    });





    app.get('/personagens', async (req, res) => {
        const token = req.query.token;
        if (!await isAuthorized(req, res)) return;

        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const skip = (page - 1) * limit;

        const personagens = await Personagem.find().limit(limit).skip(skip);
        const numberOfPersonagens = await Personagem.countDocuments();
        // const result = {personagens}
        const hasNextPage = Math.ceil(numberOfPersonagens / limit) > page;
        if (hasNextPage) {
            personagens.nextPage = `http://localhost:3000/personagens?limit=${limit}&page=${page + 1}&token=${token}`;
        }

        res.status(200).json(personagens);
    });
    
    app.get('/personagem/nome/:nome', async (req, res) => {
        const token = req.query.token;
        if (!await isAuthorized(req, res)) return;

        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const skip = (page - 1) * limit;

        const nome = req.params.nome;
        const personagens = await Personagem.find({ nome: nome }).limit(limit).skip(skip);
         const numberOfPersonagens = await Personagem.countDocuments();
        const result = { data: personagens };
        const hasNextPage = Math.ceil(numberOfPersonagens / limit) > page;
        if (hasNextPage) {
            result.nextPage = `http://localhost:3000/restaurants?limit=${limit}&page=${page + 1}&token=${token}`;
        }

        res.status(200).json(result);
    });

    app.get('/personagem/id/:id', async (req, res) => {
        const token = req.query.token;
        if (!await isAuthorized(req, res)) return;

        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const skip = (page - 1) * limit;

        
        const id = req.params.id;
        const idPersonagens = await Personagem.find({ id: id });
        const result = { data: idPersonagens }

        const hasNextPage = Math.ceil(numberOfPersonagens / limit) > page;
        if (hasNextPage) {
            result.nextPage = `http://localhost:3000/restaurants?limit=${limit}&page=${page + 1}&token=${token}`;
        }
        

        res.status(200).json(result);
    });

    app.get('/personagens/casa/:casa', async (req, res) => {
        const token = req.query.token;
        if (!await isAuthorized(req, res)) return;

        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const skip = (page - 1) * limit;
        
        
        const casa = req.params.casa;
        const casaUpper = casa.substring(0, 1).toUpperCase().concat(casa.substring(1));
        const casaPersonagens = await Personagem.find({ casa: casaUpper }).limit(limit).skip(skip);
        const numberOfPersonagens = await Personagem.countDocuments();
        const result = { data: casaPersonagens }

        const hasNextPage = Math.ceil(numberOfPersonagens / limit) > page;
        if (hasNextPage) {
            result.nextPage = `http://localhost:3000/personagens/casa/${casaUpper}/?limit=${limit}&page=${page + 1}&token=${token}`;
        }

        res.status(200).json(result);
    });

    app.get('/personagens/escola/:escola', async (req, res) => {
        const token = req.query.token;
        if (!await isAuthorized(req, res)) return;

        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const skip = (page - 1) * limit;


        const escola = req.params.escola;
        const escolaUpper = escola.substring(0, 1).toUpperCase().concat(escola.substring(1));
        const escolaPersonagens = await Personagem.find({ escola: escolaUpper }).limit(limit).skip(skip);
        const numberOfPersonagens = await Personagem.countDocuments();
        const result = { data: escolaPersonagens }

        const hasNextPage = Math.ceil(numberOfPersonagens / limit) > page;
        if (hasNextPage) {
            result.nextPage = `http://localhost:3000/personagens/escola/${escolaUpper}/?limit=${limit}&page=${page + 1}&token=${token}`;
        }

        res.status(200).json(result);
    });
    

}

module.exports = setup;