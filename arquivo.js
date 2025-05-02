const fs = require("fs").promises;


// Lista todas as tarefas no terminal
async function listarTarefas(caminhoDoArquivo) {
    try {
        let conteudo = await fs.readFile(caminhoDoArquivo, "utf-8"); // Recupera o conteudo do arquivo
        let linhas = conteudo.split("\n"); // Cria um array contendo cada linha como um elemento do array
        let tarefas = linhas.filter(linha => linha.trim() !== ""); // Filtra o array removendo os elementos vazios, sobrando as tarefas
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
    }
}

// Deletar todas as tarefas
async function deletarTarefas(caminho) {
    try {
        await fs.writeFile(caminho, "");
        console.log("Tarefas deletadas com sucesso!");

    } catch (erro) {
        console.error("Erro ao deletar tarefas: ", erro);
    }
}

module.exports = { escreverTarefa, deletarTarefas, listarTarefas };