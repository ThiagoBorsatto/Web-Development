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