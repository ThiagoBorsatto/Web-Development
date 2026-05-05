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
    valorAlcancado: valorAlcancado,
    diferencaDaMeta: Math.abs(valorAlcancado - valorAlvo)
  };
  
  metas.push(meta);
  
  document.getElementById('titulo-da-meta').value = "";
  document.getElementById('valor-alvo').value = "";
  document.getElementById('valor-alcancado').value = "";
  
  readMetas();
}

function readMetas() {
  const listaParaInjecao = document.getElementById('lista-para-injecao');
  listaParaInjecao.innerHTML = "";
  
  let totalAlmejado = 0;
  let totalAlcancado = 0;
  let meta;
    
  for (let i = 0; i < metas.length; i++) {
    meta = metas[i];
    
    totalAlmejado += meta.valorAlvo;
    totalAlcancado += meta.valorAlcancado;
    
    const itemDaLista = document.createElement('item-da-tabela');
    itemDaLista.innerHTML = `
      <li>
        <div class="informacoes-da-meta">
          <p><strong>ID:</strong> ${meta.id}</p>
          <p><strong>Título da meta:</strong> ${meta.tituloMeta}</p>
          <p><strong>Valor Alvo:</strong> R$${meta.valorAlvo.toFixed(2)}</p>
          <p><strong>Valor Alcançado:</strong> R$${meta.valorAlcancado.toFixed(2)}</p>
          <p><strong>Diferença dos valores:</strong> R$${meta.diferencaDaMeta.toFixed(2)}</p>
        </div> 
      </li>
    `;
    
    if (meta.valorAlcancado >= meta.valorAlvo) {
      console.log("Meta Batida! pintar de verder");
      itemDaLista.innerHTML = `
        <li>
          <div id="informacoes-da-meta" class="informacoes-da-meta">
            <p><strong>ID:</strong> ${meta.id}</p>
            <p><strong>Título da meta:</strong> ${meta.tituloMeta}</p>
            <p><strong>Valor Alvo:</strong> R$${meta.valorAlvo.toFixed(2)}</p>
            <p><strong>Valor Alcançado:</strong> R$${meta.valorAlcancado.toFixed(2)}</p>
            <p>Meta batida foi batida por <strong>R$${meta.diferencaDaMeta.toFixed(2)}</strong></p>
            <button id="btn-editar-meta" class="btn-editar-meta" onClick="updateMeta(${meta.id})">Editar Meta</button>
            <button id="btn-deletar-meta" class="btn-deletar-meta" onClick="deleteMeta(${meta.id})">X</button>
          </div>
        </li>
      `;
      itemDaLista.classList.add('meta-batida');
    } else {
      console.log("Meta não Batida! pintar de vermelho");
      itemDaLista.classList.add('meta-nao-batida');
      itemDaLista.innerHTML = `
        <li>
          <div id="informacoes-da-meta" class="informacoes-da-meta">
            <p><strong>ID:</strong> ${meta.id}</p>
            <p><strong>Título da meta:</strong> ${meta.tituloMeta}</p>
            <p><strong>Valor Alvo:</strong> R$${meta.valorAlvo.toFixed(2)}</p>
            <p><strong>Valor Alcançado:</strong> R$${meta.valorAlcancado.toFixed(2)}</p>
            <p>Faltou <strong>R$${meta.diferencaDaMeta.toFixed(2)}</strong> para bater a meta</p>
            <button id="btn-editar-meta" class="btn-editar-meta" onClick="updateMeta(${meta.id})">Editar Meta</button>
            <button id="btn-deletar-meta" class="btn-deletar-meta" onClick="deleteMeta(${meta.id})">X</button>
          </div>
        </li>
      `;
    }
    listaParaInjecao.appendChild(itemDaLista);
  }
   
  const elementoTotalAlmejado = document.getElementById("total-almejado");
  const elementoTotalAlcancado = document.getElementById("total-alcancado");
  const semMetas = document.getElementById("sem-metas");
  
  elementoTotalAlmejado.innerHTML = `Total Almejado: R$ ${totalAlmejado.toFixed(2)}`;
  elementoTotalAlcancado .innerHTML = `Total Alcançado: R$ ${totalAlcancado.toFixed(2)}`;
  
  if (metas.length == 0) {
    semMetas.classList.remove('hidden');
  } else {
    semMetas.classList.add('hidden');
  }
}

function updateMeta(id) {
  console.log("Edição ativa!");
  let meta;
  
  for (let i = 0; i < metas.length; i++) {
    meta = metas[i];
    
    if (meta.id == id) {
      const botaoDeSalvarEdiacao = document.querySelector('#botao-de-salvar');
      const botaoDeCancelarEdicao = document.getElementById('botao-de-cancelar-edicao');
      const infomacoesDeEdicao = document.getElementById('informacoes-meta-h3');
      
      document.getElementById('titulo-da-meta').value = meta.tituloMeta;
      document.getElementById('valor-alvo').value = meta.valorAlvo;
      document.getElementById('valor-alcancado').value = meta.valorAlcancado;
      
      botaoDeSalvarEdiacao.innerHTML = "Salvar Edição da Meta";
      botaoDeSalvarEdiacao.removeAttribute('onclick');
      botaoDeSalvarEdiacao.onclick = function() {
        salvarEdicao(id);
      };
      infomacoesDeEdicao.innerHTML= `Edição das informações da meta do ID: ${id}`;
      botaoDeCancelarEdicao.classList.remove('hidden');
    }
  }
}

function salvarEdicao(id) {
  const tituloMeta = document.getElementById('titulo-da-meta').value.trim();
  const valorAlvo = Number(document.getElementById('valor-alvo').value);
  const valorAlcancado = Number(document.getElementById('valor-alcancado').value);
  
  if (tituloMeta === "" || valorAlvo === 0 || valorAlcancado === 0) {
    alert("Um ou mais campos estão vazios! Por favor preencha todos os campos para poder criar uma META!");
    return;
  }
  
  const meta = {
    id: id,
    tituloMeta: tituloMeta, 
    valorAlvo: valorAlvo,
    valorAlcancado: valorAlcancado,
    diferencaDaMeta: Math.abs(valorAlcancado - valorAlvo)
  };
  
  const index = metas.findIndex(meta => meta.id === id);
  
  metas[index] = meta;
  readMetas();
  cancelarEdicao();
  console.log("Edição Salva!");
}

function cancelarEdicao() {
  console.log("Edição desativa!");
  const botaoDeSalvarEdiacao = document.getElementById('botao-de-salvar');
  const botaoDeCancelarEdicao = document.getElementById('botao-de-cancelar-edicao');
  const infomacoesDeEdicao = document.getElementById('informacoes-meta-h3');
      
  botaoDeSalvarEdiacao.innerHTML = "Salvar Meta";
  botaoDeSalvarEdiacao.removeAttribute('onclick');
  botaoDeSalvarEdiacao.onclick = function() {
    createMeta();
  };
  infomacoesDeEdicao.innerHTML = "Informações da Meta";
  botaoDeCancelarEdicao.classList.add('hidden');
  
  document.getElementById('titulo-da-meta').value = "";
  document.getElementById('valor-alvo').value = "";
  document.getElementById('valor-alcancado').value = "";
}

function deleteMeta(id) {
  console.log("Meta deletada!");
  metas = metas.filter(metas => metas.id !== id);
  readMetas();
}