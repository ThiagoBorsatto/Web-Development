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
    obj.email.toLowerCase(),
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

function buscarNumeroDeGmail() {
  let ultimaLinha = aba.getLastRow();
  let numeroDeGmail = 0;

  for (let i = 1; i <= ultimaLinha; i++) {
    let emailParaTeste = aba.getRange(i, 3).getValue();

    if (emailParaTeste.toString().toLowerCase().includes("@gmail.com")) {
      numeroDeGmail = numeroDeGmail + 1;
    }
  }

  return numeroDeGmail > 0 ? numeroDeGmail + " pessoa(s)." : "Ninguém usa @gmail!";
}

function acharEmailPeloNome(nomeDoEmail) {
  nomeDoEmail = nomeDoEmail.toLowerCase().trim().replace(/\s+/g, "");
  let ultimaLinha = aba.getLastRow() - 1;

  for (let i = 1; i <= ultimaLinha; i++) {
    let nomeNoBD = aba.getRange(i, 2).getValue().toLowerCase().trim().replace(/\s+/g, "");
    let email;

    if (nomeNoBD == nomeDoEmail) {
      email = aba.getRange(i, 3).getValue();
      return "E-mail encontrado: " + email;
    } 
  }
  
  return "Pessoa não cadastrada!";
}

function buscarCadastroDeHoje() {
  let contadorDeHoje = 0;
  let ultimaLinha = aba.getLastRow();
  
  const diaDeHoje = new Date().toLocaleDateString();

  for (let linha = 2; linha <= ultimaLinha; linha++) {
    let dadosDaPlanilha = aba.getRange(linha, 1).getValue();
    let diaNaPlanilha = dadosDaPlanilha.toLocaleDateString();
    
    if (diaDeHoje === diaNaPlanilha) {
      contadorDeHoje++;
    }
    
  }

  return contadorDeHoje;
}

