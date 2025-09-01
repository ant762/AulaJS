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
    
        body: JSON.stringify(
            {
                nome: nome.value,
                idade: idade.value,
                senha: senha.value
            }
        )
    
    })
    
        .then(response => response.json())
    
        .then(data => {
            console.log(data)
            alert(`Usuário ${usuarioId} foi atualizado com sucesso!`)
            window.location.href = "../index.html";
        })
    
        .catch(error => console.log(error));
};