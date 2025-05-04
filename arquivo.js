// biblioteca
const fs = require("fs").promises;
const chalk = require("chalk");

const { error } = require("console");
//módulo
const { lerEntrada } = require("./entrada.js");


// Recuperar tarefas em um array sem linhas vazias
async function recuperarTarefas(caminhoDoArquivo) {
    try {
        const conteudo = await fs.readFile(caminhoDoArquivo, "utf-8"); // Recupera o conteudo do arquivo
        const linhas = conteudo.split("\n"); // Cria um array contendo cada linha como um elemento do array
        const tarefas = linhas.filter(linha => linha.trim() !== ""); // Filtra o array removendo os elementos vazios, sobrando as tarefas

        return tarefas;
    } catch (erro) {
        console.error("Erro ao ler o arquivo: ", erro);
        return 0;
    }
}



// Lista todas as tarefas no terminal
async function listarTarefas(caminhoDoArquivo) {
    try {
        tarefas = await recuperarTarefas(caminhoDoArquivo);
        let naoEncontrouTarefa = true; // Controle para caso não hajam tarefas exibir uma mensagem "Não há nenhuma tarefa"

        console.log(chalk.yellow.bold("-- Tarefas --"));

        for (let i = 0; i < tarefas.length; i++) {
            console.log(chalk.yellow(`${i + 1}. ` + tarefas[i]));
            naoEncontrouTarefa = false;
        }

        if (naoEncontrouTarefa) {
            console.log(chalk.red("Não há nenhuma tarefa!"))
        }

        console.log("");
    } catch (erro) {

        console.error("Erro ao ler o arquivo:", erro);
        return 0;
    }
}

// Pesquisar tarefas que contenham uma palavra
async function pesquisarTarefa(caminhoDoArquivo) {
    try {
        let tarefas = await recuperarTarefas(caminhoDoArquivo);
        const palavraChave = lerEntrada("Digite a palavra chave da pesquisa: ");
        console.log("");


        let naoEncontrouTarefa = true; // Controle para mostrar que não foram encontradas tarefas, caso não haja tarefa com a palavra pesquisada


        console.log(chalk.yellow.bold("-- Tarefas --"));
        // Transforma a tarefa (que está nas casas do vetor tarefas) e palavra em minusculo e compara as duas
        for (let i = 0; i < tarefas.length; i++) {
            if ((tarefas[i].toLowerCase()).includes(palavraChave.toLowerCase())) {
                console.log(chalk.yellow(`${i + 1}. ` + tarefas[i]));
                naoEncontrouTarefa = false;
            }
        }

        if (naoEncontrouTarefa) {
            console.log(chalk.red("Nenhuma tarefa encontrada!"));
        }

        console.log("");

    } catch (erro) {
        console.error("Erro ao pesquisar tarefa: ", erro)
    }

}

// Criar nova tarefa (adicionar uma nova linha ao arquivo)
async function escreverTarefa(caminhoDoArquivo, conteudoTarefa) {
    try {
        await fs.appendFile(caminhoDoArquivo, "[ ] " + conteudoTarefa + "\n"); // "\n" adiciona uma nova linha após o conteúdo
        console.log(chalk.green("Tarefa adicionada com sucesso!\n"));

    } catch (erro) {
        console.error("Erro ao criar a tarefa: ", erro);
        return 0;
    }
}

async function concluirTarefa(caminhoDoArquivo) {
    try {
        let tarefas = await recuperarTarefas(caminhoDoArquivo); // Recupera as tarefas
        await listarTarefas(caminhoDoArquivo);                  // Mostra as tarefas para o usuário escolher qual concluir

        const numeroTarefa = lerEntrada("Digite o número da tarefa a conluir: ");

        if (tarefas[numeroTarefa - 1].includes("[ ]")) {
            tarefas[numeroTarefa - 1] = tarefas[numeroTarefa - 1].replace("[ ]", "[x]");

            await fs.writeFile(caminhoDoArquivo, ""); // Deleta todas as linhas (tarefas) do arquivo tarefas.txt para reescrever atualizando
            for (let i = 0; i < tarefas.length; i++) {
                await fs.appendFile(caminhoDoArquivo, tarefas[i] + "\n");
            }
        }



    } catch (erro) {
        console.error("Erro ao conluir a tarefa: ", erro);
    }
}

// Deletar uma tarefa especifica
async function deletarTarefa(caminhoDoArquivo) {
    try {
        let tarefas = await recuperarTarefas(caminhoDoArquivo); // Recupera as tarefas para deletar uma delas
        await listarTarefas(caminhoDoArquivo);                  // Mostra as tarefas para o usuário escolher qual deletar

        const numeroTarefa = lerEntrada("Digite o número da tarefa a deletar: ");
        tarefas.splice(numeroTarefa - 1, 1); // Retira do array a tarefa a ser deletada

        await fs.writeFile(caminhoDoArquivo, ""); // Deleta todas as linhas (tarefas) do arquivo tarefas.txt

        // Reescreve o arquivo sem a tarefa que foi deletada
        for (let i = 0; i < tarefas.length; i++) {
            await fs.appendFile(caminhoDoArquivo, tarefas[i] + "\n");
        }

        console.log(chalk.green("Tarefa deletada com sucesso!\n"));

    } catch (erro) {
        console.error("Erro ao deletar a tarefa: ", erro);
    }
}

// Deletar todas as tarefas
async function deletarTodas(caminhoDoArquivo) {
    try {
        await fs.writeFile(caminhoDoArquivo, ""); // Sobrescreve o arquivo com vazio
        console.log(chalk.green("Tarefas deletadas com sucesso!\n"));

    } catch (erro) {
        console.error("Erro ao deletar tarefas: ", erro);
    }
}

module.exports = { escreverTarefa, deletarTarefa, listarTarefas, deletarTodas, pesquisarTarefa, concluirTarefa };