(function () {
  const valueInput = document.getElementById('temp-value');
  const fromSelect = document.getElementById('temp-from');
  const toSelect = document.getElementById('temp-to');
  const btn = document.getElementById('temp-btn');
  const errorBox = document.getElementById('temp-error');
  const resultBox = document.getElementById('temp-result');

  if (!btn) return; // panel no presente

  // Nombres y símbolos separados para construir mensajes y resultados legibles.
  const NOMBRES = { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' };
  const SIMBOLOS = { C: '°C', F: '°F', K: 'K' };

  function camposCompletos() {
    const valorOk = valueInput.value.trim() !== '' && !Number.isNaN(Number(valueInput.value));
    return valorOk && fromSelect.value !== '' && toSelect.value !== '';
  }

  function actualizarEstadoBoton() {
    setError('');
    // El botón solo se habilita cuando los tres campos tienen un valor válido.
    btn.disabled = !camposCompletos();
  }

  function setError(msg) {
    errorBox.textContent = msg || '';
  }

  // Las conversiones pasan por Celsius como unidad intermedia.
  function aCelsius(valor, unidad) {
    switch (unidad) {
      case 'C': return valor;
      case 'F': return (valor - 32) * (5 / 9);
      case 'K': return valor - 273.15;
      default: return Number.NaN;
    }
  }

  function desdeCelsius(celsius, unidad) {
    switch (unidad) {
      case 'C': return celsius;
      case 'F': return (celsius * 9 / 5) + 32;
      case 'K': return celsius + 273.15;
      default: return Number.NaN;
    }
  }

  function convertir() {
    setError('');

    const valor = Number(valueInput.value);
    const origen = fromSelect.value;
    const destino = toSelect.value;

    if (!camposCompletos()) {
      setError('Completa los tres campos para convertir.');
      return;
    }

    // Paso intermedio común para simplificar las conversiones entre unidades.
    const celsius = aCelsius(valor, origen);

    // Validación física básica: no se admiten temperaturas por debajo
    // del cero absoluto (-273.15 °C / -459.67 °F / 0 K)
    if (celsius < -273.15) {
      setError('Esa temperatura está por debajo del cero absoluto.');
      resultBox.innerHTML = '';
      return;
    }

    const resultado = desdeCelsius(celsius, destino);
    const resultadoRedondeado = Math.round(resultado * 100) / 100;

    resultBox.innerHTML = `
      <div class="readout-card">
        <p class="headline">${resultadoRedondeado} ${SIMBOLOS[destino]}</p>
        <p class="caption">${valor} ${SIMBOLOS[origen]} (${NOMBRES[origen]}) → ${NOMBRES[destino]}</p>
      </div>
    `;
  }

  [valueInput, fromSelect, toSelect].forEach(el => {
    el.addEventListener('input', actualizarEstadoBoton);
    el.addEventListener('change', actualizarEstadoBoton);
  });

  btn.addEventListener('click', convertir);

  actualizarEstadoBoton();
})();
