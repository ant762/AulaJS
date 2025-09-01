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


