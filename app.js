const fs = require('fs').promises;
const readlineSync = require('readline-sync');

const CAMINHO_ARQUIVO = './tarefas/tarefas.txt'; // Caminho onde o arquivo contendo as tarefas está

async function main() {

    let opcao = parseInt(readlineSync.question("1 - Criar\n2 - Listar\n3 - Deletar\nEscolha sua opcao: ")); // Lê a opção através do terminal

    switch (opcao) {

        // Criar nova tarefa
        case 1:
            const conteudoTarefa = readlineSync.question("Digite a tarefa: ");
            escreverTarefa(CAMINHO_ARQUIVO, conteudoTarefa);

            break;

        // Listar tarefas existentes
        case 2:
            const quantidadeLinhas = await contarLinhas(CAMINHO_ARQUIVO);
            // console.log(`O arquivo contém ${quantidadeLinhas} linha(s).`);
            listarTarefas(CAMINHO_ARQUIVO);
            break;

        // Deletar uma tarefa
        case 3:
            deletarTarefas(CAMINHO_ARQUIVO)
            break;
    }

}

main();


// Funções (serão metodos)

// Contar quantidade de linhas (aqui, de tarefas) em um arquivo
async function contarLinhas(caminho) {
    try {
        let conteudo = await fs.readFile(caminho, "utf-8"); // Recupera o conteudo do arquivo
        let linhas = conteudo.split("\n"); // Cria um array contendo cada linha como um elemento do array
        let semLinhasVazias = linhas.filter(linha => linha.trim() !== ""); // Filtra o array removendo os elementos vazios
        return semLinhasVazias.length;

    } catch (erro) {
        console.error("Erro ao ler o arquivo: ", erro);
        return 0;
    }
}

// Lista todas as tarefas
async function listarTarefas(caminho) {
    try {
        const conteudo = await fs.readFile(caminho, "utf-8"); // Recupera o conteudo do arquivo
        const tarefas = conteudo.split("\n").filter(linha => linha.trim() !== "");
        for(let i = 0; i < tarefas.length; i++) {
            console.log(`${i+1}. ` + tarefas[i]);
        }
    } catch (erro) {

        console.error("Erro ao ler o arquivo:", erro);
        return 0;
    }
}

// Criar nova tarefa (adicionar uma nova linha ao arquivo)
async function escreverTarefa(caminho, conteudo) {
    try {
        await fs.appendFile(caminho, conteudo + "\n"); // "\n" adiciona uma nova linha após o conteúdo
        console.log("Tarefa adicionada com sucesso!");

    } catch (erro) {
        console.error("Erro ao criar o arquivo: ", erro);
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