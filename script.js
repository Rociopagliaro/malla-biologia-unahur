function agregarEventosMateria(materia) {
  materia.addEventListener('click', () => {
    materia.classList.toggle('completed');
    guardarEstado();
  });

  materia.addEventListener('dblclick', () => {
    const nota = prompt('Ingresá la nota obtenida para esta materia:');
    if (nota !== null) {
      const notaSpan = materia.querySelector('.nota');
      if (notaSpan) {
        notaSpan.textContent = 'Nota: ' + nota;
      } else {
        const nuevaNota = document.createElement('div');
        nuevaNota.classList.add('nota');
        nuevaNota.textContent = 'Nota: ' + nota;
        materia.appendChild(nuevaNota);
      }
      guardarEstado();
    }
  });
}

function guardarEstado() {
  const estados = [];
  document.querySelectorAll('.materia').forEach(materia => {
    estados.push({
      completada: materia.classList.contains('completed'),
      nota: materia.querySelector('.nota')?.textContent || ''
    });
  });
  localStorage.setItem('estadoMaterias', JSON.stringify(estados));
}

function cargarEstado() {
  const estados = JSON.parse(localStorage.getItem('estadoMaterias') || '[]');
  document.querySelectorAll('.materia').forEach((materia, i) => {
    agregarEventosMateria(materia);
    const estado = estados[i];
    if (estado) {
      if (estado.completada) materia.classList.add('completed');
      if (estado.nota) {
        const notaDiv = document.createElement('div');
        notaDiv.classList.add('nota');
        notaDiv.textContent = estado.nota;
        materia.appendChild(notaDiv);
      }
    }
  });
}

window.addEventListener('load', cargarEstado);

