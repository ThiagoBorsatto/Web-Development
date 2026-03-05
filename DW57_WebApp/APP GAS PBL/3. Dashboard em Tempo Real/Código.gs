function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Meu App Vinculado')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function salvarDados(obj) {
  let planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheets()[0];

  aba.appendRow([
    new Date(),
    obj.nome,
    obj.email,
    obj.status = 'Pendente'
  ]);

  return "Enviado com sucesso para a planilha!";
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function obterTotalCadastros() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheets()[0];

  var total = aba.getLastRow() - 1;

  return total > 0 ? total : 0;
}

function buscarUltimoNome() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheets()[0];
  let nome = aba.getRange(aba.getLastRow(), 2).getValue();

  return nome;
}