
// Importação da biblioteca
var readlineSync = require('readline-sync');


// Função para receber entrada no terminal
function lerEntrada(pergunta) {
    const entrada = readlineSync.question(pergunta);
    return entrada;
}

module.exports = {  lerEntrada };