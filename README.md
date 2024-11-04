# puma-code-challenge-andreozzi

## 1. Dados Pessoais
+ **Nome:** Victor Andreozzi de La Rocque Couto 
+ **Matricula** 221029285

## 2. Oque é?
Este projeto é um aplicativo web para criar e gerenciar uma lista de usuários favoritos do GitHub, conforme descrito no desafio PUMA. A aplicação utiliza a API oficial do GitHub para buscar informações dos usuários e permite que os favoritos sejam salvos, visualizados, removidos e marcados com uma estrela de destaque. 
## 3. Relato de desenvolvimento 
### Visão Geral 
Este projeto é uma aplicação web que permite aos usuários adicionar, listar, remover e marcar como favoritos usuários do GitHub. A estrutura da aplicação foi desenvolvida utilizando a arquitetura MVC (Model-View-Controller), que separa claramente as responsabilidades entre os diferentes componentes do sistema.
### Tecnologias utilizadas
- Backend: Node.js, Express.js, axios, cors
- Frontend: Vue.js, Tailwind CSS
- Testes: Jest
- Gerenciamento de Dependências: npm
- Integração de API: Axios (para consumir a API do GitHub)
### Desenvolvimento do BackEnd 
O desenvolvimento do backend foi realizado utilizando Node.js e suas bibliotecas. A estrutura do projeto foi organizada da seguinte forma:

- Routes: Definição das rotas da API.
- Controllers: Lógica de controle das requisições e respostas.
- Repository: Implementação que atua como uma abstração do banco de dados, permitindo uma fácil manipulação dos dados em memória durante a execução da aplicação.
O backend implementa as seguintes funcionalidades:

- Adicionar um usuário à lista de favoritos.
- Listar usuários favoritos.
- Remover um usuário da lista de favoritos.
- Alternar a marcação de um usuário como favorito.
Além disso, o backend foi testado utilizando o Jest para garantir que todas as funcionalidades estão funcionando conforme o esperado.

### Desenvolvimento FrontEnd
Após a conclusão do backend, iniciei o desenvolvimento do frontend utilizando Vue.js e Tailwind CSS para a estilização. A interface do usuário foi projetada para ser intuitiva e responsiva, permitindo que os usuários facilmente adicionem e visualizem seus usuários favoritos do GitHub.

As principais funcionalidades do frontend incluem:

- Um campo de entrada para que o usuário digite o username do GitHub que deseja adicionar.
- Um botão para adicionar o usuário à lista de favoritos.
- Exibição dos usuários favoritos em formato de cartões, com informações como foto, nome e link para o perfil do GitHub.
- Botões para excluir um usuário e alternar a marcação como favorito.
- Um botão para ordenar a lista de usuários favoritos em ordem alfabética.
### Integração 
Com o backend e frontend desenvolvidos, trabalhei na integração de ambos os ambientes. Utilizei Axios no frontend para enviar requisições HTTP ao backend e manipular as respostas recebidas. Durante essa fase, apliquei as regras de negócio necessárias para garantir que a aplicação se comportasse conforme esperado.
### Testes 
Depois de concluir o desenvolvimento, realizei testes no backend utilizando Jest. Os testes cobriram as principais funcionalidades da aplicação, garantindo que as operações de adicionar, listar, remover e alternar a marcação de usuários favoritos funcionassem corretamente. Essa etapa foi crucial para assegurar a qualidade e a estabilidade do sistema.

## 4. Como Rodar:
Antes de começar, certifique-se de ter os seguintes itens instalados em sua máquina:
- Node.js (versão 14 ou superior)
- npm 
### 4.1 Setup do Backend
Depois de clonar o repositório, devemos ir ate a pasta do backend e abrir o terminal lá.

Com o terminal aberto execute esses comandos para instalar as dependencias: 

```


npm i axios express cors jest

```
E depois inicie o servidor com o comando: 

```

npm start

```

### 4.2 Setup do Frontend
1. Depois de clonar o repositorio, vá ate a pasta frontend e abra o terminal la.
2. Instale as dependencias:

```

npm install axios express cors

```

3. Agora execute este comando para rodar o front:

```

npm run serve

```

### 4.3 Setup do projeto (Executar Rodar front e back com um so comando)
1. Depois de clonar o repositorio, vá ate a pasta puma-code-challenge e abra o terminal la.
2. Instale as dependencias:

```

npm install axios express cors jest
npm install npm-run-all --save-dev

```

3. Agora execute este comando para rodar o projeto:

```

npm run dev

```