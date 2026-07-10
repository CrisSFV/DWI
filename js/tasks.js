
(function () {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  const emptyMsg = document.getElementById('task-empty');
  const errorBox = document.getElementById('task-error');

  if (!form) return; // panel no presente

  /** @type {{id:number, descripcion:string, completada:boolean}[]} */
  let tareas = [];
  let nextId = 1;

  function setError(msg) {
    errorBox.textContent = msg || '';
  }

  function addTask(descripcion) {
    tareas.push({ id: nextId++, descripcion, completada: false });
    renderTasks();
  }

  function toggleTask(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) tarea.completada = !tarea.completada;
    renderTasks();
  }

  function deleteTask(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderTasks();
  }

  function crearItem(tarea) {
    const li = document.createElement('li');
    li.className = 'task-item' + (tarea.completada ? ' completed' : '');
    li.dataset.id = String(tarea.id);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = tarea.completada;
    checkbox.setAttribute('aria-label', `Marcar "${tarea.descripcion}" como completada`);
    checkbox.addEventListener('change', () => toggleTask(tarea.id));

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = tarea.descripcion;

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'task-delete';
    delBtn.innerHTML = '✕';
    delBtn.setAttribute('aria-label', `Eliminar "${tarea.descripcion}"`);
    delBtn.addEventListener('click', () => deleteTask(tarea.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    return li;
  }

  function renderTasks() {
    list.innerHTML = '';

    const pendientes = tareas.filter(t => !t.completada);
    const completadas = tareas.filter(t => t.completada);
    const ordenadas = pendientes.concat(completadas);

    ordenadas.forEach(t => list.appendChild(crearItem(t)));

    emptyMsg.classList.toggle('hidden', tareas.length > 0);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();

    if (!texto) {
      setError('Escribe una descripción antes de agregar la tarea.');
      return;
    }

    setError('');
    addTask(texto);
    input.value = '';
    input.focus();
  });

  renderTasks();
})();
