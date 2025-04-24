document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-tarefas");
  const input = document.getElementById("nova-tarefa");
  const toggleTema = document.getElementById("toggle-tema");

  carregarTarefas();
  aplicarTema();

  toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark") ? "dark" : "light");
  });

  window.adicionarTarefa = function () {
    const texto = input.value.trim();
    if (texto === "") return;

    const tarefa = {
      texto,
      concluida: false
    };

    const tarefas = pegarTarefas();
    tarefas.push(tarefa);
    salvarTarefas(tarefas);
    input.value = "";
    renderizarTarefas(tarefas);
  };

  function carregarTarefas() {
    const tarefas = pegarTarefas();
    renderizarTarefas(tarefas);
  }

  function pegarTarefas() {
    return JSON.parse(localStorage.getItem("tarefas") || "[]");
  }

  function salvarTarefas(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  function renderizarTarefas(tarefas) {
    lista.innerHTML = "";
    tarefas.forEach((tarefa, index) => {
      const li = document.createElement("li");
      li.textContent = tarefa.texto;
      if (tarefa.concluida) li.classList.add("concluida");

      li.addEventListener("click", () => {
        tarefas[index].concluida = !tarefas[index].concluida;
        salvarTarefas(tarefas);
        renderizarTarefas(tarefas);
      });

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "✖";
      btnRemover.onclick = (e) => {
        e.stopPropagation();
        tarefas.splice(index, 1);
        salvarTarefas(tarefas);
        renderizarTarefas(tarefas);
      };

      li.appendChild(btnRemover);
      lista.appendChild(li);
    });
  }

  function aplicarTema() {
    const tema = localStorage.getItem("tema");
    if (tema === "dark") {
      document.body.classList.add("dark");
    }
  }
});
