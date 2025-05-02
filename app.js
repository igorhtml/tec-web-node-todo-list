// modulos
const { lerEntrada } = require("./entrada.js"); // Entrada de dados
const { deletarTarefa, listarTarefas, escreverTarefa, deletarTodas, pesquisarTarefa } = require("./arquivo.js"); // Manipulação do arquivo


const CAMINHO_ARQUIVO = "./tarefas/tarefas.txt"; // Caminho do arquivo com as tarefas;

let fecharPrograma = false; // Variavel de controle para o loop. Ao se tornar true, o loop acaba e o programa é encerrado;

async function main() {

    let opcao = parseInt(lerEntrada("1 - Criar tarefa\n2 - Listar tarefas\n3 - Deletar tarefa\n4 - Deletar todas as tarefas\n5 - Pesquisar tarefa\n6 - Fechar o programa\n\nEscolha sua opcao: ")); // Lê a opção através do terminal com o modulo
    console.log(""); // Linha vazia para separar a escolha de opção e as outras ações;

    switch (opcao) {

        // Criar nova tarefa
        case 1:
            // ler conteudo da tarefa com uma função
            const conteudoTarefa = lerEntrada("Digite a tarefa: ");
            await escreverTarefa(CAMINHO_ARQUIVO, conteudoTarefa);

            break;
        // Listar tarefas existentes
        case 2:
            await listarTarefas(CAMINHO_ARQUIVO);
            break;

        // Deletar uma tarefa
        case 3:
            await deletarTarefa(CAMINHO_ARQUIVO);
            break;

        // Deletar todas as tarefas
        case 4:
            await deletarTodas(CAMINHO_ARQUIVO);
            break;

        case 5:
            const palavraChave = lerEntrada("Digite a palavra chave da pesquisa: ");
            console.log("");
            await pesquisarTarefa(palavraChave, CAMINHO_ARQUIVO);
            break;

        case 6:
            fecharPrograma = true;
            break;

        default:
            console.log("Escolha uma opção válida!\n");
    }

}

async function iniciarPrograma() {
    while (!fecharPrograma) {
        await main();
    }
}

iniciarPrograma();