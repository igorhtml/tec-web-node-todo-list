// biblioteca
const fs = require("fs").promises;

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
        for (let i = 0; i < tarefas.length; i++) {
            console.log(`${i + 1}. ` + tarefas[i]);
        }
    } catch (erro) {

        console.error("Erro ao ler o arquivo:", erro);
        return 0;
    }
}

// Criar nova tarefa (adicionar uma nova linha ao arquivo)
async function escreverTarefa(caminhoDoArquivo, conteudoTarefa) {
    try {
        await fs.appendFile(caminhoDoArquivo, conteudoTarefa + "\n"); // "\n" adiciona uma nova linha após o conteúdo
        console.log("Tarefa adicionada com sucesso!");

    } catch (erro) {
        console.error("Erro ao criar a tarefa: ", erro);
        return 0;
    }
}

// Deletar uma tarefa especifica
async function deletarTarefa(caminhoDoArquivo) {
    try {
        let tarefas = await recuperarTarefas(caminhoDoArquivo); // Recupera as tarefas para deletar uma delas
        await listarTarefas(caminhoDoArquivo);                                        // Mostra as tarefas para o usuário escolher qual deletar

        const numeroTarefa = lerEntrada("Digite o número da tarefa a deletar: ");
        tarefas.splice(numeroTarefa - 1, 1); // Retira do array a tarefa a ser deletada

        await fs.writeFile(caminhoDoArquivo, ""); // Deleta todas as linhas (tarefas) do arquivo tarefas.txt

        // Reescreve o arquivo sem a tarefa que foi deletada
        for (let i = 0; i < tarefas.length; i++) {
            await fs.appendFile(caminhoDoArquivo, tarefas[i] + "\n");
        }

    } catch (erro) {
        console.error("Erro ao deletar a tarefa: ", erro);
    }
}

// Deletar todas as tarefas
async function deletarTodas(caminhoDoArquivo) {
    try {
        await fs.writeFile(caminhoDoArquivo, "");
        console.log("Tarefas deletada com sucesso!");

    } catch (erro) {
        console.error("Erro ao deletar tarefas: ", erro);
    }
}

module.exports = { escreverTarefa, deletarTarefa, listarTarefas, deletarTodas };