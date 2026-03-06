const ss = SpreadsheetApp.getActiveSpreadsheet();
const aba = ss.getSheets()[0];

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Meu App Vinculado')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function salvarDados(obj) {
  if (obj.urgencia === 'Alta') {
    obj.status = 'IMEDIATO';
  } else {
    obj.status = 'Pendente';
  }

  aba.appendRow([
    new Date(),
    obj.nome,
    obj.email,
    obj.status,
    obj.telefone,
    obj.urgencia,
    obj.mensagem
  ]);

  return "Enviado com sucesso para a planilha!";
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function obterTotalCadastros() {
  let total = aba.getLastRow() - 1;

  return total > 0 ? total : 0;
}

function buscarUltimoNome() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheets()[0];
  let nome = aba.getRange(aba.getLastRow(), 2).getValue();

  return nome;
}