fetch("http://localhost:3000/usuarios").then(res=>{
    if(!res.ok){
        throw new Error("Erro na requisição")
    }

    return res.json();
}).then(usuarios=>{
    console.log(usuarios);
    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach(usuario =>{
        console.log(usuario.nome);
        listaUsuarios.innerHTML += `<li class="list-group-item">${usuario.nome}</li>`;
    });
})
.catch(err=>{
    console.error(err);
});
