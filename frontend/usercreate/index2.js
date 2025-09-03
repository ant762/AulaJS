      const cepInput = document.getElementById('cep');
      const ruaInput = document.getElementById('rua');
      const bairroInput = document.getElementById('bairro');
      const cidadeInput = document.getElementById('cidade');
      const estadoInput = document.getElementById('estado');
      const cepErrorSpan = document.getElementById('cep-error');

      let cepValido = false;

      function limparEndereco() {
          ruaInput.value = '';
          bairroInput.value = '';
          cidadeInput.value = '';
          estadoInput.value = '';
      }

      function preencherEndereco(data) {
          ruaInput.value = data.logradouro;
          bairroInput.value = data.bairro;
          cidadeInput.value = data.localidade;
          estadoInput.value = data.uf;
      }

      async function buscarCep() {
          const cep = cepInput.value.replace(/\D/g, '');
          limparEndereco();
          cepErrorSpan.classList.add('hidden');
          cepValido = false;

          if (cep.length !== 8) {
              return;
          }

          try {
              const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
              const data = await response.json();

              if (data.erro) {
                  cepErrorSpan.classList.remove('hidden');
                  alert('CEP não encontrado. Por favor, verifique o número digitado.');
              } else {
                  preencherEndereco(data);
                  cepValido = true;
              }
          } catch (error) {
              console.error('Erro ao buscar CEP:', error);
              cepErrorSpan.classList.remove('hidden');
              alert('Erro na conexão. Verifique sua internet.');
          }
      }

      cepInput.addEventListener('blur', buscarCep);
      
      async function cadastroUsuario(event) {
          event.preventDefault();

          if (!cepValido) {
              alert('O CEP deve ser válido para continuar o cadastro.');
              cepInput.focus();
              return;
          }

          let nome = event.target.nome.value;
          let idade = event.target.idade.value;
          let senha = document.getElementById("senha").value;
          let cep = cepInput.value;
          let rua = ruaInput.value;
          let bairro = bairroInput.value;
          let cidade = cidadeInput.value;
          let estado = estadoInput.value;

          try {
              const response = await fetch('http://localhost:3000/usuarios', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      "nome": nome,
                      "idade": idade,
                      "senha": senha,
                      "cep": cep,
                      "rua": rua,
                      "bairro": bairro,
                      "cidade": cidade,
                      "estado": estado,
                  })
              });

              if (response.ok) {
                  const dados = await response.json();
                  console.log(dados);
                  alert("Usuário cadastrado com sucesso!");
                  window.location.href = "../index.html";
              } else {
                  console.error("Erro na resposta do servidor:", response.status);
                  alert("Erro ao cadastrar usuário. Verifique os dados.");
              }
          } catch (error) {
              console.error("Erro na requisição:", error);
              alert("Ocorreu um erro ao conectar ao servidor.");
          }
      }