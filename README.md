# AulaJS
Destinado a aprendizagem de programador de sistemas do senai.

# NODE.js

## Sumário

- [Comandos](#comandos)
- [Frameworks](#frameworks)
- [Servidor Básico](#servidor-básico)
- [Fetch Client](#fetch-client)
- [GPPPDOH](#get-post-put-patch-delete-options-head)
- [Busca de conteúdo](#busca-de-conteúdo)
- [Adição de conteúdo](#adição-de-conteúdo)
- [Atualização de conteúdo](#atualização-de-conteúdo)
- [Apagar conteúdo](#apagar-conteúdo)
- [Mostrar dados JSON em um webiste a partir do CSS](#mostrar-dados-json-em-um-webiste-a-partir-do-css)
- [Pegar dados de um usuário para efetuar um cadastro](#pegar-dados-de-um-usuário-para-efetuar-um-cadastro)
- [Atualizar Dados do Cadastro](#atualização-de-dados)

### Comandos

```bash
// mkdir servidor.js # cria a pasta
// cd servidor.js # entra na pasta
// npm install express ##- biblioteca
// node nome.js ##- roda servidor
// npm init -y ##- inicia o servidor/modo padrão
// ctrl c ##- encerra o servidor
// node servidor.js --watch ## atualiza o servidor automaticamente (salve)
```

### Frameworks

- **Express:** 

```bash
npm install express
```

### Servidor básico:

- 

```javascript
const express = require('express'); // framework do nodejs
const app = express(); // transforma a framework em um objeto.
const port = 3000; // Variável para armazenar a porta

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
```

### Localizações:

De forma resumida, isso serve para definir locais diferentes. tipo www.sitelegal.com/usuarios.

```javascript
const usuarios = [
    {"id": 1, "nome": "Otavio", "idade": 20, "senha": "123"},
    {"id": 1, "nome": "Admin", "idade": 20, "senha": "1234"}
]

app.listen(port, () => {
    console.log("Servidor rodando: http://localhost:3000")
})

app.get("/", (request, response) => {
    response.send("Primeiro servidor AI PSII 2025/1 V1  - Malwee")
})

app.get("/usuarios", (req, res) => {
    res.send(usuarios);
})

```

### Fetch Client

Serve para organizar todas as informações relacionadas ao servidor.
Por exemplo, se alguém cadastra uma conta em seu website, as informações
de login serão armazenadas no Fetch Client.

```json
[
    {
        "id": 1,
        "nome": "Otavio",
        "idade": 20,
        "senha": "123"
    },
    {
        "id": 1,
        "nome": "Admin",
        "idade": 20,
        "senha": "1234"
    }
]
```
### Get, Post, Put, Patch, Delete, Options, Head

#### GET: Solicita dados do servidor (ler).

#### POST: Envia dados para o servidor para criar um recurso.

#### PUT: Atualiza um recurso completo no servidor (substitui).

#### PATCH: Atualiza parcialmente um recurso no servidor.

#### DELETE: Remove um recurso do servidor.

#### OPTIONS: Consulta os métodos HTTP suportados por um recurso.

#### HEAD: Igual ao GET, mas retorna só os cabeçalhos, sem o corpo.


### Busca de conteúdo

Podemos destacar informações específicas em páginas/pesquisas. O YouTube funciona de forma parecida, pois, podemos pesquisar por vídeos de acordo coom o gênero, ou pesquisar por nomes de usuários:

```javascript
(tipo usuarios.find(usuarios.nome = canalDoYoutube))

//ou

app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id); // parse - string para legível

    const usuarioPorId = usuarios.find(usuarios => usuarios.id == id)
})
```

Também existe a possibilidade de adicionar uma resposta 404 (erro) caso o elemento não seja encontrado, por exemplo:

```javascript
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id); // parse - string para legível

    const usuarioPorId = usuarios.find(usuarios => usuarios.id == id)

    if (usuarioPorId != null) {
        res.send(usuarioPorId)
    } else {
        res.status(404).send("Usuário não encontrado")
    }
})
```

### O que foi feito aqui?

Primeiramente, estou criando uma função de requisição e resposta.
A requisição é "Usuários com ID: 1". Caso não seja encontrado, erro 404.

### Adição de conteúdo

Para incrementar informaçõoes no servidor, pode-se organizar tudo a partir de listas JSON. Por exemplo, nome, idade, senha, etc. Além do mais, você pode gerar randomicamente o ID de usuário e fazê-lo crescer de acordo com a quantidade de usuários na plataforma, como o ROBLOX studio faz.

```javascript
app.post("/usuarios", (req, res) => {
    const novoUsuario = req.body;
    novoUsuario.id = usuarios.length + 1;
    usuarios.push(novoUsuario);

    res.status(201).send(novoUsuario) // 201 - created
})
```

### Atualização de conteúdo

Ao criar algum usuário, talvez você possa querer alterar alguma informação, como o nome de usuário ou e-mail. Você pode fazer isso dessa forma:

```javascript
app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const novoUsuario = req.body;
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if(index != null){
        usuarios[index] = novoUsuario;
        res.status(204).send(novoUsuario);
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})
```

### Apagar conteudo

Apesar de não ser ideal ou de forma alguma recomendado, seguindo a mesma estrutura, você pode deletar um usuário.

```javascript
app.delete("/usuarios/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null) {
        usuarios.splice(index, 1); // slice copia, slice deleta.
        res.status(204).send(`Usuário com id: ${id} removido com sucesso!`)
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})
```

### Mostrar dados JSON em um webiste a partir do CSS

Do mesmo jeito que sites mostram que você está logado, seus dados na página de perfil, etc.
Você deve iniciar um servidor NODE.JS como mencionado anteriormente, e, posteriormente, utilizar a técnica abaixo no INDEX:

```javascript
fetch("http://localhost:3000/usuarios").then(async res=>{
    if(!res.ok){
        throw new Error("Erro na requisição")
    }
    return res.json();


}).then(usuarios=>{
    console.log(usuarios);
    const listaUsuarios = document.getElementById("lista-usuarios");
    console.log(listaUsuarios);
})
.catch(err=>{
    console.error(err);
});
```

Servidor JS:
```javascript
const express = require('express'); // Importa o Express
const cors = require('cors'); // importa o cors lá

const app = express(); //Cria o servidor

const port = 3000; //Variavel para armazenar a porta

//Para permitir receber json nas requisições
app.use(express.json());
app.use(cors());

const usuarios = [
    { "id": 1, "nome": "Otavio", "idade": 20, "senha": "123" },
    { "id": 2, "nome": "Admin", "idade": 20, "senha": "1234" }
]

//request - requisição
//response - respota
app.get("/", (request, response) => {
    response.send("Primeiro servidor DESI - Malwee");
})

//Buscar todos os usuários
app.get("/usuarios", (req, res) => {
    //send -> envia os dados
    res.send(usuarios);
})

//Buscar um usuário -> get by id
app.get("/usuarios/:id", (req, res) => {
    //params - parametros da requisição (fica na url)
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(usuario => usuario.id == id);

    if (usuario != null) {
        res.send(usuario)
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})

//Criar um usuário
app.post("/usuarios", (req, res) => {
    //body - corpo da requisição
    const novoUsuario = req.body;
    novoUsuario.id = usuarios.length + 1;
    usuarios.push(novoUsuario);

    res.status(201).send(novoUsuario)
})

//Atualizar um usuário
app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const novoUsuario = req.body;
    novoUsuario.id = id;
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null) {
        usuarios[index] = novoUsuario;
        res.status(204).send(novoUsuario);
    } else {
        res.status(404).send("Usuário não encontrado!")
    }

})

//Deletar um usuário
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if (index != null) {


        
        usuarios.splice(index, 1);
        res.status(204).send("Usuário com id:" + id + " removido com sucesso!")
    } else {
        res.status(404).send("Usuário não encontrado!")
    }
})

app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3000");
})
```

### Pegar dados de um usuário para efetuar um cadastro:

```javascript
function cadastroUsuario(event) {
    event.preventDefault();
    
    let nome = event.target.nome.value;
    let idade = event.target.idade.value;
    let senha = document.getElementById("senha").value;
    
    fetch('http://localhost:3000/usuarios', {

    method: 'POST',

    headers: {

        'Content-Type': 'application/json'

    },

    body: JSON.stringify({
        "nome": nome,
        "idade": idade,
        "senha": senha
    })

})

    .then(response => response.json()) //converte a resposta em json
    .then(dados => { 
        console.log(dados) // dados retornados do backend
        alert("Usuário cadastrado com sucesso") // mensagem de sucesso para o front-end
        window.location.href = "../index.html" // redireciona para a página de listagem de usuários)
    }) 
    .catch(error => console.log(error)); // mensagem de erro

};
```
O código irá pegar os dados a partir de um evento do html [onsubmit="cadastroUsuario(event)] assim conseguimos armazenar esses mesmos dados em um arquivo .JSON

### Atualização de Dados de Cadastro:

O usuarioId é extraído da URL usando URLSearchParams, que busca o parâmetro id na query string. Após o carregamento completo da página (DOMContentLoaded), o código faz uma requisição GET para a URL para buscar os dados de um usuário (nome, idade e senha) com base no usuarioId. Se a requisição for bem-sucedida, os valores de nome, idade e senha são preenchidos automaticamente nos campos correspondentes da página. A função atualizarUsuario é chamada quando um evento (como um clique em um botão) ocorre. Ela envia uma requisição PUT para atualizar os dados do usuário na URL. A requisição envia um objeto JSON (a variável data, que parece não estar definida no código) com as alterações realizadas nos campos do formulário.

```javascript
const params = new URLSearchParams(window.location.search); // Pega os parâmetros da URL


const usuarioId = params.get("id"); // Pega o valor do parâmetro "id"
let nome = document.getElementById("nome"); // Pega o elemento do input nome
let idade = document.getElementById("idade"); // Pega o elemento do input idade
let senha = document.getElementById("senha"); // Pega o elemento do input senha

document.addEventListener("DOMContentLoaded", () => { // Executa quando o DOM estiver carregado
    !fetch(`http://localhost:3000/usuarios/${usuarioId}`) // Faz a requisição para o backend

    
        .then(response => response.json())

        .then(data => { 
            console.log(data)
            nome.value = data.nome;
            idade.value = data.idade;
            senha.value = data.senha;
        })

        .catch(error => console.log(error));
});

function atualizarUsuario(event) { // Função para atualizar o usuário
    event.preventDefault();

    fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
    
        method: 'PUT',
    
        headers: {
    
            'Content-Type': 'application/json'
    
        },
    
        body: JSON.stringify(data)
    
    })
    
        .then(response => response.json())
    
        .then(data => console.log(data))
    
        .catch(error => console.log(error));
};
```


# Por hoje, é isso - 01 / 09