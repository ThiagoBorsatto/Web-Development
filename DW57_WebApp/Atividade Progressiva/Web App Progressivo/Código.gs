function doGet() {
  return HtmlService.createTemplateFromFile('Index')
  .evaluate()
  .setTitle('Aula 1 - Sucesso')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function processarDados(nome) {
  var mensagem = "Olá, " + nome + "! O servidor recebeu seu nome com sucesso!";
  return mensagem;
}

function somarDoisNumeros(numero1, numero2) {
  var somaNumeros = Number(numero1) + Number(numero2);
  var mensagemNumeros = "A soma dos números é: " + somaNumeros;
  
  return mensagemNumeros;
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}