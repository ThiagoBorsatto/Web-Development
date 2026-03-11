const ss = SpreadsheetApp.getActiveSpreadsheet();
const aba = ss.getSheets()[0];

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Meu App Vinculado')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
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

function obterTotalCadastros() {
  let total = aba.getLastRow() - 1;

  return total > 0 ? total : 0;
}

function buscarUltimoNome() {
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

function acharEmailPeloNome(nome) {
  nome = nome.toLowerCase().trim().replace(/\s+/g, '');
  let ultimaLinha = aba.getLastRow();

  for (let linha = 2; linha <= ultimaLinha; linha++) {
    let nomeNoBD = aba.getRange(linha, 2).getValue().toLowerCase().trim().replace(/\s+/g, '');

    if (nomeNoBD === nome) {
      let email = aba.getRange(linha, 3).getValue();
      return "O E-mail no sistema é: " + email;
    } 
  }
  
  return "Pessoa não cadastrada no sistema!" + ultimaLinha + nome + " " + nomeParaTeste;
}

function buscarCadastroDeHoje() {
  let contadorDeHoje = 0;
  let ultimaLinha = aba.getLastRow();

  const diaDeHoje = new Date().toLocaleDateString();

  for (let linha = 2; linha <= ultimaLinha; linha++) {
     let dadosDaPlanilha = aba.getRange(linha, 1).getValue().toLocaleDateString();
    
    if (diaDeHoje === dadosDaPlanilha) {
      contadorDeHoje++;
    }
  }

  return contadorDeHoje;
}

function deletarDadosDaPlanilha(){
  const ultimaLinha = aba.getLastRow();

  
  for (let linha = 2; linha <= ultimaLinha; linha++) {
    aba.deleteRows(linha, ultimaLinha - 1);
  }

  return "Planilha deletada com sucesso!";
}

function teste() {
  let nome = 'TestE 2';
  let nomeNaPlanilha = acharEmailPeloNome(nome);
  Logger.log(nomeNaPlanilha);
}
