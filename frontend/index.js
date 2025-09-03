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
            <h5>${usuario.nome}, ${usuario.idade} anos - ${usuario.cidade}, ${usuario.estado}</h5>

            <div>
                <a href="useredit/index3.html?id=${usuario.id}" class="btn btn-primary">Atualizar</a>
                <button type="button" class="btn btn-danger" onclick="deletarUsuario(${usuario.id})">Deletar</button>
            <div>
        <div>
        </li>`;

    });
})

    .catch(err => {
        console.error(err);
    });

function deletarUsuario(userId) {
    let confirmar = confirm("Você realmente deseja excluir o usuário: " + userId + "?");
    if (confirmar ) {
        fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if(response.ok = true){
                    alert("Usuário " + userId + " excluído com sucesso!");
                    window.location.reload();
                }
            })

            .catch(error => {
                alert("Erro ao excluír o usuário: " + userId);
            })
    }
}