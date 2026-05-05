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

  // 2️⃣ Validação: se algum campo estiver inválido, use alert() e return
  // 💡 Seu código aqui: if (nome === "" || ...) { alert(...); return; }
  

  // 3️⃣ Crie o objeto do novo produto (dica: use Date.now() para o ID)
  const novoProduto = {
    id: /* seu código aqui */,
    nome: /* seu código aqui */,
    qtd: /* seu código aqui */,
    preco: /* seu código aqui */
  };

  // 4️⃣ Adicione o produto na array (dica: método .push())
  // 💡 Seu código aqui: produtos.??? (novoProduto)

  // 5️⃣ Limpe os campos do formulário
  document.getElementById('inputNome').value = "";
  document.getElementById('inputQtd').value = "";
  document.getElementById('inputPreco').value = "";

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
  const alertaEl = document.getElementById('alertaGeral');

  // 1️⃣ Limpe a lista antes de re-renderizar
  listaEl.innerHTML = "";
  
  let valorTotalInventario = 0;
  let temEstoqueBaixo = false; // ⬅️ Variável "bandeira" para o alerta

  // 2️⃣ PERCORRA a array com FOR (desafio principal!)
  // 💡 Estrutura: for (let i = 0; i < produtos.length; i++) { ... }
  
  // 🎯 DENTRO DO LOOP, para cada item você deve:
  //   a) Calcular: valorItem = qtd * preco
  //   b) Somar ao total: valorTotalInventario += valorItem
  //   c) Verificar com IF: se qtd < LIMITE_ESTOQUE_BAIXO → temEstoqueBaixo = true
  //   d) Criar o HTML do item com innerHTML += `...`
  //   e) Inserir na lista: listaEl.appendChild(li) ou innerHTML
  
  // 💡 Dica de template string para o item:
  /*
  <li class="${estaBaixo ? 'estoque-baixo' : ''}">
    <div>
      <strong>${item.nome}</strong>
      <small>${item.qtd} un. × R$ ${item.preco.toFixed(2)}</small>
    </div>
    <div>
      <span>R$ ${valorItem.toFixed(2)}</span>
      <button onclick="removerItem(${item.id})">×</button>
    </div>
  </li>
  */

  // 3️⃣ ATUALIZE O PLACAR (dica: use .toFixed(2) para moeda)
  // 💡 valorTotalEl.innerText = `R$ ${valorTotalInventario.???}`
  
  // 4️⃣ ATUALIZE O CONTADOR DE ITENS
  // 💡 totalItensEl.innerText = `${produtos.length} item(s)...`
  
  // 5️⃣ MOSTRE/ESCONDA O ALERTA GERAL (use if/else com classList)
  // 💡 if (temEstoqueBaixo) { alertaEl.classList.remove('oculto'); } 
  // 💡 else { alertaEl.classList.add('oculto'); }
}

// ============================================
// FUNÇÃO 3: Remover produto (desafio bônus!)
// ============================================
function removerItem(id) {
  // 🎯 Use o método .filter() para criar uma nova array SEM o item clicado
  // 💡 Dica: produtos = produtos.filter(item => item.id !== id)
  
  // Depois, atualize a tela:
  // atualizarTela();
}

// ============================================
// BÔNUS: Permitir adicionar com ENTER (opcional)
// ============================================
// 💡 Dica: adicione um 'addEventListener' de 'keypress' no campo de preço