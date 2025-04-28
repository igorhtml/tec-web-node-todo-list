const readline = require('readline-sync');

let opcao = parseInt(readline.question("1 - Criar\n2 - Listar\n3 - Deletar\nEscolha sua opcao: "));

switch (opcao) {
    case 1:
        console.log("Criar");
        break;
    case 2:
        console.log("Listar");
        break;
    case 3:
        console.log("Deletar");
        break;
}