// ============================================
// CONTROLE DE ESTOQUE - SEU CÓDIGO AQUI 👇
// ============================================

// 🎯 CONFIGURAÇÃO (dica: use const para valores fixos)
const LIMITE_ESTOQUE_BAIXO = 10; // ⬅️ Eles podem ajustar este valor!

// 🗄️ NOSSO "BANCO DE DADOS" (dica: array vazia para começar)
let produtos = []; 

// ============================================
// FUNÇÃO 1: Adicionar produto
// ============================================
function adicionarProduto() {
  // 1️⃣ Capture os valores dos inputs (dica: use .value e .trim())
  const nome = document.getElementById('inputNome').value.trim();
  const qtd = Number(document.getElementById('inputQtd').value);
  const preco = Number(document.getElementById('inputPreco').value);
  const marca = document.getElementById('selectMarca').value;
  
  // 2️⃣ Validação: se algum campo estiver inválido, use alert() e return
  if (nome === "" || qtd === 0 || preco === 0 || marca === "") {
    alert("Campos vazios, preencha todos os campos para poder adicionar um produto!");
    return;
  }

  // 3️⃣ Crie o objeto do novo produto (dica: use Date.now() para o ID)
  const novoProduto = {
    id: Date.now(),
    nome: nome,
    qtd: qtd,
    preco: preco,
    marca: marca
  };

  // 4️⃣ Adicione o produto na array (dica: método .push())
  produtos.push(novoProduto);

  // 5️⃣ Limpe os campos do formulário
  document.getElementById('inputNome').value = "";
  document.getElementById('inputQtd').value = "";
  document.getElementById('inputPreco').value = "";
  document.getElementById('selectMarca').value = "";

  // 6️⃣ Atualize a tela (chame a função que vamos criar abaixo)
  atualizarTela();
}

// ============================================
// FUNÇÃO 2: Atualizar a tela (AQUI ESTÁ O DESAFIO!)
// ============================================
function atualizarTela() {
  const listaEl = document.getElementById('listaProdutos');
  const valorTotalEl = document.getElementById('valorInventario');
  const totalItensEl = document.getElementById('totalItens');
  const totalItensEmEstoque = document.getElementById('itensTotaisEmEstoque');
  const alertaEl = document.getElementById('alertaGeral');
  const mensagemVazia = document.getElementById('mensagemVazia');

  // 1️⃣ Limpe a lista antes de re-renderizar
  listaEl.innerHTML = "";
  mensagemVazia.innerHTML = "";
  
  let valorTotalInventario = 0;
  let temEstoqueBaixo = false; // ⬅️ Variável "bandeira" para o alerta
  let totalDeItensCadastrados = 0;

  // 2️⃣ PERCORRA a array com FOR (desafio principal!)
  for (let i = 0; i < produtos.length; i++) {
    let produto = produtos[i];
   
    //   a) Calcular: valorItem = qtd * preco
    let valorItem = produto.qtd * produto.preco;
    
    //   b) Somar ao total: valorTotalInventario += valorItem
    valorTotalInventario += valorItem;
    totalDeItensCadastrados += produto.qtd;
    
    //   c) Verificar com IF: se qtd < LIMITE_ESTOQUE_BAIXO → temEstoqueBaixo = true
    if (produto.qtd < LIMITE_ESTOQUE_BAIXO) {
      console.log("ESTOQUE BAIXO!");
      temEstoqueBaixo = true;
    }
    
    //   d) Criar o HTML do item com innerHTML += `...`
    const li = document.createElement('li');
    
    if (produto.qtd < LIMITE_ESTOQUE_BAIXO) {
      li.classList.add('estoque-baixo');
    }
    
    li.innerHTML = `
      <div class="info-produto">
        <strong>${produto.nome}</strong>
        <small>${produto.qtd} un. × R$ ${produto.preco.toFixed(2)}</small>
        <strong>Marca: ${produto.marca}</strong>
        <span class="valor-produto">R$ ${valorItem.toFixed(2)}</span>
      </div>
      <div class="badge">
        <button class="btn-remover" onclick="removerItem(${produto.id})">×</button>
      </div>`;
    
    //   e) Inserir na lista: listaEl.appendChild(li) ou innerHTML
    listaEl.appendChild(li);
  }

  // 3️⃣ ATUALIZE O PLACAR (dica: use .toFixed(2) para moeda)
  valorTotalEl.innerText = `R$ ${valorTotalInventario.toFixed(2)}`;
  
  // 4️⃣ ATUALIZE O CONTADOR DE ITENS
  totalItensEl.innerText = `Cadastro de Itens: ${produtos.length}`;
  totalItensEmEstoque.innerText = `Total de itens cadastrados: ${totalDeItensCadastrados}`;
  
  // 5️⃣ MOSTRE/ESCONDA O ALERTA GERAL (use if/else com classList)
  if (temEstoqueBaixo) { 
    alertaEl.classList.remove('oculto'); 
  } else { 
    alertaEl.classList.add('oculto'); 
  }
}

// ============================================
// FUNÇÃO 3: Remover produto (desafio bônus!)
// ============================================
function removerItem(id) {
  produtos = produtos.filter(produtos => produtos.id !== id);
  // Depois, atualize a tela:
  atualizarTela();
}

// ============================================
// BÔNUS: Permitir adicionar com ENTER (opcional)
// ============================================
// 💡 Dica: adicione um 'addEventListener' de 'keypress' no campo de preço
let preco = document.getElementById('inputPreco');
preco.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
       adicionarProduto(); 
    }
});