const params = new URLSearchParams(window.location.search);
const usuarioId = params.get("id");

let nome = document.getElementById("nome");
let idade = document.getElementById("idade");
let senha = document.getElementById("senha");
let cep = document.getElementById("cep");
let estado = document.getElementById("estado");
let cidade = document.getElementById("cidade");
let bairro = document.getElementById("bairro");
let rua = document.getElementById("rua");

document.addEventListener("DOMContentLoaded", () => {
    fetch(`http://localhost:3000/usuarios/${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            nome.value = data.nome;
            idade.value = data.idade;
            senha.value = data.senha;
            cep.value = data.cep;
            estado.value = data.estado;
            cidade.value = data.cidade;
            bairro.value = data.bairro;
            rua.value = data.rua;
        })
        .catch(error => console.log(error));
});

function preencherEndereco(cepValue) {
    const cepFormatado = cepValue.replace(/\D/g, "");
    if (cepFormatado.length === 8) {
        fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    bairro.value = data.bairro;
                    rua.value = data.logradouro;
                    estado.value = data.uf;
                    cidade.value = data.localidade;
                } else {
                    alert("CEP não encontrado!");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Erro ao buscar dados do CEP.");
            });
    } else {
        alert("CEP inválido!");
    }
}

cep.addEventListener("blur", () => {
    preencherEndereco(cep.value);
});

nome.addEventListener("blur", () => {
    if (nome.value.trim() === "") {
        alert("Nome não pode ser vazio!");
    }
});

idade.addEventListener("blur", () => {
    if (idade.value.trim() === "" || isNaN(idade.value)) {
        alert("Idade deve ser um número válido!");
    }
});

function atualizarUsuario(event) {
    event.preventDefault();

    if (!nome.value || !idade.value || !senha.value) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome.value,
            idade: idade.value,
            senha: senha.value,
            cep: cep.value,
            estado: estado.value,
            cidade: cidade.value,
            bairro: bairro.value,
            rua: rua.value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(`Usuário ${usuarioId} foi atualizado com sucesso!`);
            window.location.href = "../index.html";
        })
        .catch(error => console.log(error));
}
