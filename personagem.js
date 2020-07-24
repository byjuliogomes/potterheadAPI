const mongoose = require('mongoose');

const personagemSchema =  new mongoose.Schema({
    id: Number,
    nome: { type: String, required: true },
    genero: { type: String, required: true },
    escola: { type: String, required: true },
    dataDeNascimento: String,
    anoDeNascimento: Number,
    localDeNascimento: String,
    casa: String,
    estadoCivil: String,
    especie: String,
    sangue: String,
    corDosOlhos: String,
    corDoCabelo: String,
    varinha: {
        madeira: String,
        nucleo: String,
        tamanho: Number,
    },
    patrono: String,
    bichoPapao: String,
    estudanteDeHogwarts: Boolean,
    ordemDaFenix: Boolean,
    armadaDeDumbledore: Boolean,
    ator: String,
    vivo: Boolean,
    comensalDaMorte: Boolean,
    profissao: String,
    imagem: String,
    assinatura: String,
});

personagemSchema.methods.greetClient = function () {
    console.log(`Boas vindas ao ${this.nome}! Posso te ajudar?`);
}
// personagemSchema.statics.findByCuisine = function (cuisine) {
//     return this.find({ cuisine: cuisine });
// }
// personagemSchema.statics.findByName = function (name) {
//     return this.find({ nome: nome });
// }

const Personagem = mongoose.model('personagem', personagemSchema);

module.exports = Personagem;