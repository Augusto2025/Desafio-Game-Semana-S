let nivelSelecionado = null;

function jogar(nivel) {
  nivelSelecionado = nivel;

  document.getElementById("modal").style.display = "flex";
}

function confirmar() {
  localStorage.setItem("dificuldade", nivelSelecionado);

  window.location.href = "{% url 'desafio' %}?nivel=" + nivelSelecionado;
}

function cancelar() {
  document.getElementById("modal").style.display = "none";
}
