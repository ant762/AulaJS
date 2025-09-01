fetch("http://localhost:3000/usuarios").then(res => {
    if (!res.ok) {
        throw new Error("Erro na requisição")
    }

    return res.json();
}).then(usuarios => {
    console.log(usuarios);
    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach(usuario => {
        console.log(usuario.nome);
        listaUsuarios.innerHTML += `
        <li class="list-group-item">
        <div class = "d-flex justify-content-between">
            <h5>Nome: ${usuario.nome} - Idade: ${usuario.idade}</h5>
            <a href="useredit/index3.html?id=${usuario.id}" class="btn btn-primary">Atualizar</button>
        <div>
        </li>`;

    });
})

    .catch(err => {
        console.error(err);
    });