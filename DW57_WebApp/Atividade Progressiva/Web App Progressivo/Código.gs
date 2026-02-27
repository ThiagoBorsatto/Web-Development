function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
.setTitle('Aula 1 - Sucesso')
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function processarDados(nome, numero1, numero2) {
  var somaDosDoisNumeros = Number(numero1) + Number(numero2);
  var mensagem = "Olá, " + nome + "! O servidor recebeu seu nome com sucesso. \n A soma dos dois números é: " + somaDosDoisNumeros;
  return mensagem;
}

function somarDoisNumeros(numero1, numero2) {
  var somaNumeros = Number(numero1) + Number(numero2);
  var mensagemNumeros = "A soma dos números é: " + somaNumeros;
  
  return mensagemNumeros;
}
