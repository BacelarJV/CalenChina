let nome = localStorage.getItem("usuario");
let senha = localStorage.getItem("senha");
// Puxa os itens do LocalStorege.
function login() {
  let nomeInput = document.getElementById("usuario").value;
  let senhaInput = document.getElementById("senha").value;
  // Executa a função login puxa os valores inserido em nome e senha e valida com os salvos no LocalStorege.

  if (nomeInput == nome && senhaInput == senha) {
    console.log("logou");
    window.location.href = "../app/home/home.html";
    // Se estiver certo acessa a página home.
  } else {
    console.log("usuario ou senha incorreta!");
  }
  // Se estiver errado apresenta a mensagem de usuario ou senha incorreta!
}
