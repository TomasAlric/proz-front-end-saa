const API_URL = "http://127.0.0.1:5000/alunos"; // Corrigindo para a porta 5000

async function cadastrarAluno(event) {
  event.preventDefault();

  const aluno = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    cpf: document.getElementById("cpf").value,
    data_nascimento: document.getElementById("data-nascimento").value,
    curso: document.getElementById("curso").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });

    if (!response.ok) {
      const erro = await response.text();
      showModal(`Erro ao cadastrar aluno: ${erro}`, true);
      console.error("Erro ao cadastrar aluno:", erro);
      return;
    }

    const result = await response.json();
    showModal(result.mensagem, false); // Mostra a mensagem de sucesso
    document.getElementById("cadastro-aluno").reset(); // Limpa o formulário
  } catch (error) {
    showModal("Erro na conexão com o servidor!", true);
    console.error("Erro na requisição:", error);
  }
}

// Função para exibir o modal
function showModal(message, isError = false) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");

  modalMessage.innerText = message;
  modalMessage.style.color = isError ? "red" : "green"; // Define cor da mensagem

  modal.style.display = "block";
}

// Fecha o modal ao clicar no botão "Fechar"
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
  });
});

// Função para editar um usuário
function editarUsuario(id) {
  // Redirecionar para a página de edição com o ID do usuário
  window.location.href = `editar.html?id=${id}`;
}

// Função para remover um usuário
function removerUsuario(id) {
  if (confirm("Tem certeza de que deseja remover este usuário?")) {
    // Aqui você pode adicionar lógica para remover o usuário do banco de dados via API ou back-end
    alert(`Usuário com ID ${id} removido!`);

    // Após a remoção, recarregue a página ou remova o usuário da lista visualmente
    // window.location.reload();  // Caso queira recarregar a página
  }
}
