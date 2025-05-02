// bibliotecas


// modulos
const { lerEntrada } = require("./entrada.js"); // Entrada de dados
const { deletarTarefas, listarTarefas, escreverTarefa} = require("./arquivo.js"); // Manipulação do arquivo


const CAMINHO_ARQUIVO = "./tarefas/tarefas.txt"; // Caminho do arquivo com as tarefas;

async function main() {

    let opcao = parseInt(await lerEntrada("1 - Criar\n2 - Listar\n3 - Deletar\nEscolha sua opcao: ")); // Lê a opção através do terminal com o modulo

    switch (opcao) {

        // Criar nova tarefa
        case 1:
            // ler conteudo da tarefa com uma função
            const conteudoTarefa = await lerEntrada("Digite a tarefa: ")
            escreverTarefa(CAMINHO_ARQUIVO, conteudoTarefa);

            break;
        // Listar tarefas existentes
        case 2:
            listarTarefas(CAMINHO_ARQUIVO);
            break;

        // Deletar uma tarefa
        case 3:
            deletarTarefas(CAMINHO_ARQUIVO)
            break;
        
        default:
            console.log("Escolha uma opção válida!\n");
    }

}

main();