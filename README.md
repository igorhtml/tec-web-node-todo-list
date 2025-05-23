Neste arquivo fiz uma descrição completa das etapas e tecnologias que vou utilizar para desenvolver a versão inicial da lista de tarefas.

Projeto: Lista de Tarefas via Terminal em Node.js

Objetivo:
Criar uma aplicação Node.js que permita criar, listar e remover tarefas, utilizando módulos personalizados, manipulação de arquivos (fs) e entrada de dados via terminal (readline).

Divisão em problemas pequenos:

1. Receber dados via terminal
- Usar o módulo readline do Node.js para:
  - Perguntar ao usuário qual operação deseja fazer.
  - Receber entradas (exemplo: nome/descrição da tarefa).

2. Escolher a operação: Cadastrar, listar ou remover
- Usar switch case para:
  - Se escolher cadastrar: criar uma nova tarefa.
  - Se escolher listar: mostrar todas as tarefas.
  - Se escolher remover: deletar uma tarefa específica.

3. Criar tarefas
- Usar o módulo fs:
  - Salvar as tarefas dentro de um único arquivo.
  - Adicionar uma nova linha no arquivo para cada nova tarefa usando fs.appendFile ou leitura + escrita.

4. Listar tarefas
- Usar fs.readFile para:
  - Ler o conteúdo de tarefas.txt.
  - Separar as tarefas usando .split('\n').
  - Exibir cada tarefa numerada no terminal.

5. Remover tarefas
- Usar fs.readFile e fs.writeFile:
  - Ler todas as tarefas.
  - Mostrar a lista para o usuário.
  - Perguntar qual número da tarefa deseja remover.
  - Remover a linha escolhida do array de tarefas.
  - Reescrever o arquivo tarefas.txt sem a tarefa removida.
  - Não deixar linhas em branco.

Bibliotecas principais:

- readline: receber dados do usuário pelo teclado.
- fs: ler, escrever, adicionar e remover dados de arquivos.

Etapas práticas:

1. Criar o arquivo principal app.js.
2. Criar um módulo personalizado, como tarefas.js, para conter as funções de adicionar, listar e remover tarefas.
3. Usar readline para interagir com o usuário no index.js.
4. Chamar as funções corretas do módulo tarefas.js conforme a escolha do usuário.

OBS: Tentarei usar promisses para deixar o código mais moderno e seguro.
OBS 2: Usar Chalk para colorir e organizar a interface da lista de tarefas.
