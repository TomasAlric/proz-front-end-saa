// Defina a variável com o IP do servidor
const API_BASE_URL = "http://127.0.0.1:5000"; // Altere aqui para mudar o IP

// Função para listar os alunos
function listarAlunos() {
  fetch(`${API_BASE_URL}/alunos`)
    .then((response) => response.json())
    .then((data) => {
      const alunosList = document.getElementById("alunos-lista");
      alunosList.innerHTML = ""; // Limpa a tabela antes de preencher
      data.forEach((aluno) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${aluno.id}</td>
          <td><input type="text" id="nome-${aluno.id}" value="${aluno.nome}" disabled></td>
          <td><input type="email" id="email-${aluno.id}" value="${aluno.email}" disabled></td>
          <td><input type="text" id="telefone-${aluno.id}" value="${aluno.telefone}" disabled></td>
          <td><input type="text" id="cpf-${aluno.id}" value="${aluno.cpf}" disabled></td>
          <td><input type="text" id="data_nascimento-${aluno.id}" value="${aluno.data_nascimento}" disabled></td>
          <td><input type="text" id="curso-${aluno.id}" value="${aluno.curso}" disabled></td>
          <td>
            <button id="editar-${aluno.id}" onclick="habilitarEdicao(${aluno.id})">Editar</button>
            <button id="salvar-${aluno.id}" onclick="salvarEdicao(${aluno.id})" style="display: none;">Salvar</button>
            <button onclick="removerUsuario(${aluno.id})">Remover</button>
          </td>
        `;
        alunosList.appendChild(row);
      });
    })
    .catch((error) => console.error("Erro ao carregar alunos:", error));
}

// Função para habilitar a edição de um aluno
function habilitarEdicao(id) {
  document.getElementById(`nome-${id}`).disabled = false;
  document.getElementById(`email-${id}`).disabled = false;
  document.getElementById(`telefone-${id}`).disabled = false;
  document.getElementById(`cpf-${id}`).disabled = false;
  document.getElementById(`data_nascimento-${id}`).disabled = false;
  document.getElementById(`curso-${id}`).disabled = false;

  document.getElementById(`editar-${id}`).style.display = "none";
  document.getElementById(`salvar-${id}`).style.display = "inline-block";
}

// Função para salvar a edição de um aluno
function salvarEdicao(id) {
  const alunoAtualizado = {
    nome: document.getElementById(`nome-${id}`).value,
    email: document.getElementById(`email-${id}`).value,
    telefone: document.getElementById(`telefone-${id}`).value,
    cpf: document.getElementById(`cpf-${id}`).value,
    data_nascimento: document.getElementById(`data_nascimento-${id}`).value,
    curso: document.getElementById(`curso-${id}`).value,
  };

  fetch(`${API_BASE_URL}/alunos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(alunoAtualizado),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.mensagem);
      listarAlunos(); // Atualiza a tabela
    })
    .catch((error) => console.error("Erro ao editar aluno:", error));
}

// Função para remover um aluno
function removerUsuario(id) {
  fetch(`${API_BASE_URL}/alunos/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      alert(data.mensagem);
      listarAlunos(); // Recarrega a lista de alunos
    })
    .catch((error) => console.error("Erro ao remover aluno:", error));
}

// Carrega a lista de alunos quando a página for carregada
window.onload = listarAlunos;
