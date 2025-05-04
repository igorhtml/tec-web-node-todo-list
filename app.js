// bibliotecas
const chalk = require("chalk");

// modulos
const { lerEntrada } = require("./entrada.js"); // Entrada de dados
const { deletarTarefa, listarTarefas, escreverTarefa, deletarTodas, pesquisarTarefa, concluirTarefa} = require("./arquivo.js"); // Manipulação do arquivo


const CAMINHO_ARQUIVO = "./tarefas/tarefas.txt"; // Caminho do arquivo com as tarefas;

let fecharPrograma = false; // Variavel de controle para o loop. Ao se tornar true, o loop acaba e o programa é encerrado;

async function main() {

    console.log(chalk.blue.bold("Lista de tarefas"));
    console.log(chalk.blue("1 - Criar tarefa\n2 - Listar tarefas\n3 - Pesquisar tarefa\n4 - Marcar como concluida\n5 - Deletar uma tareda\n6 - Deletar todas as tarefas\n7 - Fechar o programa"));
    let opcao = parseInt(lerEntrada("Escolha sua opcao: ")); // Lê a opção através do terminal com o modulo
    console.log(""); // Linha vazia para separar a escolha de opção e as outras ações;

    switch (opcao) {

        // Criar nova tarefa
        case 1:
            const conteudoTarefa = lerEntrada("Digite a tarefa: ");
            await escreverTarefa(CAMINHO_ARQUIVO, conteudoTarefa);

            break;
        // Listar tarefas existentes
        case 2:
            await listarTarefas(CAMINHO_ARQUIVO);
            break;

        // Pesquisar uma tarefa
        case 3:
            await pesquisarTarefa(CAMINHO_ARQUIVO);
            break;

        // Marcar uma tarefa como concluida
        case 4:
            await concluirTarefa(CAMINHO_ARQUIVO);
            break;


        // Deletar uma tarefa
        case 5:
            await deletarTarefa(CAMINHO_ARQUIVO);
            break;

        // Deletar todas as tarefas
        case 6:
            await deletarTodas(CAMINHO_ARQUIVO);
            break;
        
        // Fechar programa
        case 7:
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