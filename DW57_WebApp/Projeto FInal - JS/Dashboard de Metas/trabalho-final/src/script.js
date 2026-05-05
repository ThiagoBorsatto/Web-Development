let metas = [];

function createMeta() {
  const tituloMeta = document.getElementById('titulo-da-meta').value.trim();
  const valorAlvo = Number(document.getElementById('valor-alvo').value);
  const valorAlcancado = Number(document.getElementById('valor-alcancado').value);
  
  if (tituloMeta === "" || valorAlvo === 0 || valorAlcancado === 0) {
    alert("Um ou mais campos estão vazios! Por favor preencha todos os campos para poder criar uma META!");
    return;
  }
  
  const meta = {
    id: Date.now(),
    tituloMeta: tituloMeta, 
    valorAlvo: valorAlvo,
    valorAlcancado: valorAlcancado
  };
  
  metas.push(meta);
  
  document.getElementById('titulo-da-meta').value = "";
  document.getElementById('valor-alvo').value = "";
  document.getElementById('valor-alcancado').value = "";
  
  readMetas();
}

function readMetas() {
  let totalAlmejado = 0;
  let totalAlcancado = 0;
  let meta;
    
  for (let i = 0; i < metas.length; i++) {
    meta = metas[i];
    
    totalAlmejado += meta.valorAlvo;
    totalAlcancado += meta.valorAlcancado;
    
    if (meta.valorAlcancado >= meta.valorAlvo) {
      console.log("Meta Batida! pintar de verder");
    } else {
      console.log("Meta não Batida! pintar de vermelho");
    }
  }
  
  const elementoTotalAlmejado = document.getElementById("total-almejado");
  const elementoTotalAlcancado = document.getElementById("total-alcancado");
  
  elementoTotalAlmejado.innerHTML = `Total Almejado: R$ ${totalAlmejado.toFixed(2)}`;
  elementoTotalAlcancado .innerHTML = `Total Alcançado: R$ ${totalAlcancado.toFixed(2)}`;
}