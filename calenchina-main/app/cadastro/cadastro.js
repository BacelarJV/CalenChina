$(document).ready(function () {
  $("#cepInput").mask("00000-000"); // Aplica a máscara no campo de CEP

  $("#usuario").on("blur", function () {
    validateNome();
  }); // Define uma ação quando o campo de usuário perde o foco

  enableSubmitButtonOnFormChange(); // Chama uma função para habilitar/desabilitar o botão de cadastro do formulário

  function validateNome() {
    const nomeInput = document.getElementById("usuario").value;
    const nomeError = document.getElementById("usuario-erro");

    localStorage.setItem("usuario", nomeInput);

    if (!nomeInput.trim()) {
      nomeError.textContent = "Deve utilizar um nome real";
    } else {
      nomeError.textContent = "";
    }
    return nomeInput;
  } // Função para validar o nome do usuário e armazenar no localStorage

  function validateSenha() {
    const senha = document.getElementById("senha").value;
    const senhaValida = senha.length >= 6;
    const senhaError = document.getElementById("senha-erro");

    localStorage.setItem("senha", senha);

    if (!senhaValida) {
      senhaError.textContent = "A senha deve ter no mínimo 6 caracteres";
    } else {
      senhaError.textContent = "";
    }

    return senha;
  } // Função para validar a senha do usuário e armazenar no localStorage

  $("#cadastrarButton").click(function (event) {
    event.preventDefault();
    validateNome();
    validateSenha();

    const cep = localStorage.getItem("cep");
    const logradouro = localStorage.getItem("logradouro");
    const bairro = localStorage.getItem("bairro");
    const cidade = localStorage.getItem("cidade");
    const estado = localStorage.getItem("estado");
  }); // Ao clicar no botão de cadastrar evita o comportamento padrão do formulário

  function enableSubmitButtonOnFormChange() {
    const submitButton = document.getElementById("cadastrarButton");
    submitButton.disabled = true;

    document
      .getElementById("cadastroForm")
      .addEventListener("input", function () {
        if (this.checkValidity()) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      }); // Adiciona um evento de "input" ao formulário para habilitar/desabilitar o botão de cadastro
  }

  $(".modal").modal(); // Ativa o modal

  $("#buscarButton").click(function () {
    buscarCEP();
  }); // Ao clicar no botão de buscar, chama a função para buscar e exibir os dados do CEP
});

function buscarCEP() {
  const cep = $("#cepInput").val();
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("CEP não encontrado");
      }
      return response.json();
    })
    .then((data) => {
      $("#cepInfo").text(`CEP: ${data.cep}`);
      $("#logradouroInfo").text(`Logradouro: ${data.logradouro}`);
      $("#bairroInfo").text(`Bairro: ${data.bairro}`);
      $("#cidadeInfo").text(`Cidade: ${data.localidade}`);
      $("#estadoInfo").text(`Estado: ${data.uf}`);

      $("#modal1").modal("open");
      // Abrir o modal após preencher os dados
    });

  $("#modal1 .modal-footer a").addClass("disabled");
  // Desabilitar o botão "Ok" inicialmente

  $("#modal1 .modal-footer a").on("click", function (event) {
    if (!$("#confirmação-checkbox").prop("checked")) {
      event.preventDefault();
      alert("Por favor, confirme os dados marcando a caixa de seleção.");
      return;
    }
    // Verificar se a checkbox está marcada ao clicar no botão "Ok"
  });

  $("#confirmação-checkbox").on("change", function () {
    if ($(this).prop("checked")) {
      $("#modal1 .modal-footer a").removeClass("disabled");
    } else {
      $("#modal1 .modal-footer a").addClass("disabled");
    }
    // Atualizar o estado do botão "Ok" quando a checkbox for marcada ou desmarcada
  });
}
