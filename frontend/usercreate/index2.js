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

    .then(response => response.json())
    .catch(error => console.log(error));


};


