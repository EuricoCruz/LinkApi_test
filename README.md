Tecnologias utilizadas :

Mongo, React, Node

Como rodar a aplicação e o script:

Para rodar o script primeiro é preciso acessar o node, com npm run dev na pasta myapp

Em seguida basta ir na pasta onde está localizado o script e chamar node script.js, para que ela mande as informações para a rota que salva os veículos.

Assim que a aplicação estiver abastecida e rodando, basta rodar o front-end com yarn start

Eu pretendia criar um login real, mas apenas usei o react-cookie para dar uma sensação de login

por conta do meu atraso e da minha falta de tempo não fiz os testes da API com o Jest

No mais, agradeço a oportunidade

API Base_URL = http://localhost:5000/

Endpoints da API

Veículos

todos os veículos = get /vehicle
veículo especifício = get /vehicle/:id 
atualiza todos os dados de um veículo = put /vehicle/:id 
atualiza parte dos dados de um veículo = patch /vehicle/:id
deleta um veículo = delete /delete/:id

Usuários

loga um usuário /users/login precisa de email e password

cria um usuário /users precisa de email, password, passwordConfirmation e name








