function doGet(e) {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('Lançador de Despesas');
}

function lancarDespesa(dadosDoFormulario) {
  try {
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const abaDespesa = planilha.getSheets()[0];

    const novaLinha = [
      new Date(), // Coluna A: Data
      dadosDoFormulario.descricao, // Coluna B: Descrição 
      dadosDoFormulario.categoria, // Coluna C: Categoria
      dadosDoFormulario.valor // Coluna D: Valor
    ]

    abaDespesa.appendRow(novaLinha);

    return { success: true, message: "Despesa lançada com sucesso!"}

  } catch (e) {
    Logger.log(e);
    return { success: false, message: "Ocorreu um erro: " + e.message}
  }
}