const animais = [
  "Rato",
  "Boi",
  "Tigre",
  "Coelho",
  "Dragão",
  "Serpente",
  "Cavalo",
  "Bode",
  "Macaco",
  "Galo",
  "Cão",
  "Porco",
  // Lista dos animais do ano chinês.
];

function calcularAnimal() {
  let anoInput = document.getElementById("ano");
  let resultado = document.getElementById("resultado");
  // Função para calcular o animal do ano chinês e salvar no histórico.

  let ano = parseInt(anoInput.value);
  // Obtém o ano informado pelo usuário.

  if (isNaN(ano) || ano < 1900 || ano > 2100) {
    resultado.innerText = "Por favor, insira um ano válido entre 1900 e 2100.";
    return;
  }
  //Valide se a entrada é um número e está dentro de um intervalo válido.

  let resto = ano % 12;
  // Calcula o resto da divisão do ano por 12.

  let animal = animais[resto];
  // Retorna o animal correspondente ao resto.

  resultado.innerText = `O animal do ano ${ano} é: ${animal}`;
  // Exibe o animal correspondente ao ano inserido.

  salvarHistorico(ano, animal);
  // Salva o cálculo no histórico.
}

function salvarHistorico(ano, animal) {
  let historico = localStorage.getItem("historico");

  if (!historico) {
    historico = [];
  } else {
    historico = JSON.parse(historico);
  }

  historico.push({ ano: ano, animal: animal });

  localStorage.setItem("historico", JSON.stringify(historico));

  exibirHistorico();
  // Função para salvar o cálculo e atualizar no histórico usando localStorage.
}

function exibirHistorico() {
  let historicoContainer = document.getElementById("historico-container");
  let historico = JSON.parse(localStorage.getItem("historico"));

  if (!historico || historico.length === 0) {
    historicoContainer.innerHTML = "<p>Nenhum cálculo no histórico ainda.</p>";
    return;
  }

  let historicoHTML = "<ul>";
  historico.forEach((item) => {
    historicoHTML += `<li>Ano ${item.ano}: ${item.animal}</li>`;
  });
  historicoHTML += "</ul>";

  historicoContainer.innerHTML = historicoHTML;
  // Função para exibir o histórico na página
}

exibirHistorico();
// Função para exibir o histórico na página
