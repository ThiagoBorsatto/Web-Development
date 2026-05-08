let metas = [];

function createMeta() {
  const mes = document.getElementById("seletor-de-mes").value;
  const tituloMeta = document.getElementById("titulo-da-meta").value.trim();
  const valorAlvo = Number(document.getElementById("valor-alvo").value);
  const valorAlcancado = Number(
    document.getElementById("valor-alcancado").value
  );
  const descricao = document.getElementById("descricao").value;

  console.log(mes);

  if (
    tituloMeta === "" ||
    valorAlvo === 0 ||
    valorAlcancado === 0 ||
    descricao === "" ||
    mes === ""
  ) {
    alert(
      "Um ou mais campos estão vazios! Por favor preencha todos os campos para poder criar uma META!"
    );
    return;
  }

  const meta = {
    id: Date.now(),
    mes: mes,
    tituloMeta: tituloMeta,
    valorAlvo: valorAlvo,
    valorAlcancado: valorAlcancado,
    descricao: descricao,
    diferencaDaMeta: Math.abs(valorAlcancado - valorAlvo)
  };

  metas.push(meta);

  document.getElementById("seletor-de-mes").value = "";
  document.getElementById("titulo-da-meta").value = "";
  document.getElementById("valor-alvo").value = "";
  document.getElementById("valor-alcancado").value = "";
  document.getElementById("descricao").value = "";

  esconderFiltro();
  readMetas();
}

function readMetas() {
  const listaParaInjecao = document.getElementById("lista-para-injecao");
  listaParaInjecao.innerHTML = "";

  let totalAlmejado = 0;
  let totalAlcancado = 0;
  let meta;

  for (let i = 0; i < metas.length; i++) {
    meta = metas[i];

    totalAlmejado += meta.valorAlvo;
    totalAlcancado += meta.valorAlcancado;

    const itemDaLista = document.createElement("item-da-tabela");
    itemDaLista.innerHTML = criarTemplateDoItemDaLista(meta);

    classificarMetaBatidaOuNao(meta, itemDaLista);

    listaParaInjecao.appendChild(itemDaLista);
  }

  const elementoTotalAlmejado = document.getElementById("total-almejado");
  const elementoTotalAlcancado = document.getElementById("total-alcancado");
  const semMetas = document.getElementById("sem-metas");

  elementoTotalAlmejado.innerHTML = `Total de Quilômetros Almejados: ${totalAlmejado.toFixed(2)} Km`;
  elementoTotalAlcancado.innerHTML = `Total de Quilômetros Alcançados: ${totalAlcancado.toFixed(2)} Km`;

  if (metas.length == 0) {
    semMetas.classList.remove("hidden");
  } else {
    semMetas.classList.add("hidden");
  }
}

function criarTemplateDoItemDaLista(meta) {
  let template = `
        <li>
          <div id="informacoes-da-meta" class="informacoes-da-meta">
            <p><strong>ID da viagem:</strong> ${meta.id}</p>
            <p><strong>Mês da viagem:</strong> ${meta.mes}</p>
            <p><strong>Título da viagem:</strong> ${meta.tituloMeta}</p>
            <p><strong>Quilômetragem Alvo:</strong> ${meta.valorAlvo.toFixed(2)}Km</p>
            <p><strong>Quilômetragem Alcançado:</strong> ${meta.valorAlcancado.toFixed(2)}Km</p>
            <p id="texto-da-diferenca-${meta.id}"></p>
            <p id="descricao-da-meta-${meta.id}"><strong>Descrição: </strong>${meta.descricao}</p>
            <button id="btn-editar-meta" class="btn-editar-meta" onClick="updateMeta(${meta.id})">Editar Meta</button>
            <button id="btn-deletar-meta" class="btn-deletar-meta" onClick="deleteMeta(${meta.id})">X</button>
          </div>
        </li>
      `;
  return template;
}

function classificarMetaBatidaOuNao(meta, itemDaLista) {
  const textoDaDiferenca = itemDaLista.querySelector(`#texto-da-diferenca-${meta.id}`);

  if (meta.valorAlcancado >= meta.valorAlvo) {
    console.log("Meta Batida! pintar de verder");
    textoDaDiferenca.innerHTML = `Quilômetragem acima da meta:<strong> ${meta.diferencaDaMeta.toFixed(2)} Km</strong>`;
    itemDaLista.classList.add("meta-batida");
  } else {
    console.log("Meta não Batida! pintar de vermelho");
    textoDaDiferenca.innerHTML = `Quilômetragem abaixo da meta:<strong> ${meta.diferencaDaMeta.toFixed(2)} Km</strong>`;
    itemDaLista.classList.add("meta-nao-batida");
  }
}

function updateMeta(id) {
  console.log("Edição ativa!");
  let meta;

  for (let i = 0; i < metas.length; i++) {
    meta = metas[i];

    if (meta.id == id) {
      const botaoDeSalvarEdiacao = document.querySelector("#botao-de-salvar");
      const botaoDeCancelarEdicao = document.getElementById("botao-de-cancelar-edicao");
      const infomacoesDeEdicao = document.getElementById("informacoes-meta-h3");

      document.getElementById("titulo-da-meta").value = meta.tituloMeta;
      document.getElementById("valor-alvo").value = meta.valorAlvo;
      document.getElementById("valor-alcancado").value = meta.valorAlcancado;
      document.getElementById("descricao").value = meta.descricao;
      document.getElementById("seletor-de-mes").value = meta.mes;

      botaoDeSalvarEdiacao.innerHTML = "Salvar Edição";
      botaoDeSalvarEdiacao.removeAttribute("onclick");
      botaoDeSalvarEdiacao.onclick = function () {
        salvarEdicao(id);
      };
      infomacoesDeEdicao.innerHTML = `Edição das informações da meta do ID: ${id}`;
      botaoDeCancelarEdicao.classList.remove("hidden");
    }
  }
}

function salvarEdicao(id) {
  const mes = document.getElementById("seletor-de-mes").value;
  const tituloMeta = document.getElementById("titulo-da-meta").value.trim();
  const valorAlvo = Number(document.getElementById("valor-alvo").value);
  const valorAlcancado = Number(document.getElementById("valor-alcancado").value);
  const descricao = document.getElementById("descricao").value;

  if (
    tituloMeta === "" ||
    valorAlvo === 0 ||
    valorAlcancado === 0 ||
    descricao === "" ||
    mes === ""
  ) {
    alert(
      "Um ou mais campos estão vazios! Por favor preencha todos os campos para poder criar uma META!"
    );
    return;
  }

  const meta = {
    id: id,
    mes: mes,
    tituloMeta: tituloMeta,
    valorAlvo: valorAlvo,
    valorAlcancado: valorAlcancado,
    descricao: descricao,
    diferencaDaMeta: Math.abs(valorAlcancado - valorAlvo)
  };

  const index = metas.findIndex((meta) => meta.id === id);

  metas[index] = meta;
  readMetas();
  cancelarEdicao();
  console.log("Edição Salva!");
}

function cancelarEdicao() {
  console.log("Edição desativa!");
  const botaoDeSalvarEdiacao = document.getElementById("botao-de-salvar");
  const botaoDeCancelarEdicao = document.getElementById("botao-de-cancelar-edicao");
  const infomacoesDeEdicao = document.getElementById("informacoes-meta-h3");

  botaoDeSalvarEdiacao.innerHTML = "Salvar Quilômetragem";
  botaoDeSalvarEdiacao.removeAttribute("onclick");
  botaoDeSalvarEdiacao.onclick = function () {
    createMeta();
  };
  esconderFiltro();
  infomacoesDeEdicao.innerHTML = "Criar Histórico de Quilômetragem";
  botaoDeCancelarEdicao.classList.add("hidden");

  document.getElementById("titulo-da-meta").value = "";
  document.getElementById("valor-alvo").value = "";
  document.getElementById("valor-alcancado").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("seletor-de-mes").value = "";
}

function deleteMeta(id) {
  console.log("Meta deletada!");
  metas = metas.filter((metas) => metas.id !== id);

  esconderFiltro();
  readMetas();
}

function filtrarQuilometragemPorMes() {
  console.log("filtrando!");
  
  const semMetas = document.getElementById("sem-metas");
  const totalMensalAlmejado = document.getElementById("total-mensal-almejado");
  const totalMensalAlcancado = document.getElementById("total-mensal-alcancado");
  
  let mesDoFiltro = document.getElementById("filtro-por-mes").value;

  if (mesDoFiltro === "") {
    totalMensalAlmejado.classList.add("hidden");
    totalMensalAlcancado.classList.add("hidden");
    readMetas();
    return;
  }

  const listaParaInjecao = document.getElementById("lista-para-injecao");
  listaParaInjecao.innerHTML = "";

  let metasDeQuilometrosDoMes = [];
  metasDeQuilometrosDoMes = metas.filter((metas) => metas.mes === mesDoFiltro);

  let totalDeQuilometrosDoMesAlvo = 0;
  let totalDeQuilometrosDoMesAlcancados = 0;

  for (let i = 0; i < metasDeQuilometrosDoMes.length; i++) {
    let meta = metasDeQuilometrosDoMes[i];

    totalDeQuilometrosDoMesAlvo += meta.valorAlvo;
    totalDeQuilometrosDoMesAlcancados += meta.valorAlcancado;

    const itemDaLista = document.createElement("item-da-tabela");
    itemDaLista.innerHTML = criarTemplateDoItemDaLista(meta);

    classificarMetaBatidaOuNao(meta, itemDaLista);

    listaParaInjecao.appendChild(itemDaLista);
  }

  totalMensalAlmejado.innerHTML = `Total de ${totalDeQuilometrosDoMesAlvo} Km Almejados no mês de ${mesDoFiltro}`;
  totalMensalAlcancado.innerHTML = `Total de ${totalDeQuilometrosDoMesAlcancados} Km Alcançados no mês de ${mesDoFiltro}`;

  if (metasDeQuilometrosDoMes.length == 0) {
    semMetas.classList.remove("hidden");
    totalMensalAlmejado.classList.add("hidden");
    totalMensalAlcancado.classList.add("hidden");
  } else {
    semMetas.classList.add("hidden");
    totalMensalAlmejado.classList.remove("hidden");
    totalMensalAlcancado.classList.remove("hidden");
  }
}

function esconderFiltro() {
  document.getElementById("filtro-por-mes").value = "";
  const totalMensalAlmejado = document.getElementById("total-mensal-almejado");
  const totalMensalAlcancado = document.getElementById("total-mensal-alcancado");
  totalMensalAlmejado.classList.add("hidden");
  totalMensalAlcancado.classList.add("hidden");
}
