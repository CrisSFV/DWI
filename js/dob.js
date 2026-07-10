(function () {
  const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daySelect = document.getElementById('dob-day');
  const monthSelect = document.getElementById('dob-month');
  const yearSelect = document.getElementById('dob-year');
  const form = document.getElementById('dob-form');
  const errorBox = document.getElementById('dob-error');
  const resultBox = document.getElementById('dob-result');

  if (!form) return; 

  const today = new Date();
  const CURRENT_YEAR = today.getFullYear();
  const MIN_YEAR = CURRENT_YEAR - 120;

  function daysInMonth(month, year) {
    // month: 1-12
    return new Date(year, month, 0).getDate();
  }

  function fillSelect(select, items) {
    select.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '—';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    items.forEach(({ value, label }) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      select.appendChild(opt);
    });
  }

  function buildMonthOptions() {
    fillSelect(monthSelect, MESES.map((nombre, i) => ({
      value: String(i + 1),
      label: nombre
    })));
  }

  function buildYearOptions() {
    const years = [];
    for (let y = CURRENT_YEAR; y >= MIN_YEAR; y--) {
      years.push({ value: String(y), label: String(y) });
    }
    fillSelect(yearSelect, years);
  }

  function buildDayOptions(keepValue) {
    const month = parseInt(monthSelect.value, 10);
    const year = parseInt(yearSelect.value, 10) || CURRENT_YEAR;
    const total = (month >= 1 && month <= 12) ? daysInMonth(month, year) : 31;

    const days = [];
    for (let d = 1; d <= total; d++) {
      days.push({ value: String(d), label: String(d).padStart(2, '0') });
    }
    fillSelect(daySelect, days);

    if (keepValue && parseInt(keepValue, 10) <= total) {
      daySelect.value = keepValue;
    }
  }

  function init() {
    buildMonthOptions();
    buildYearOptions();
    buildDayOptions();

    // Al cambiar mes o año, se reconstruyen los días disponibles
    // (evita fechas imposibles como 31 de febrero)
    monthSelect.addEventListener('change', () => buildDayOptions(daySelect.value));
    yearSelect.addEventListener('change', () => buildDayOptions(daySelect.value));
  }

  function setError(msg) {
    errorBox.textContent = msg || '';
  }

  function calcularEdad(nacimiento, hoy) {
    let years = hoy.getFullYear() - nacimiento.getFullYear();
    let months = hoy.getMonth() - nacimiento.getMonth();
    let days = hoy.getDate() - nacimiento.getDate();

    if (days < 0) {
      months -= 1;
      // días transcurridos del mes anterior (no se muestran, solo ajustan meses)
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    setError('');
    resultBox.innerHTML = '';

    const d = parseInt(daySelect.value, 10);
    const m = parseInt(monthSelect.value, 10);
    const y = parseInt(yearSelect.value, 10);

    if (!d || !m || !y) {
      setError('Selecciona día, mes y año antes de calcular.');
      return;
    }

    const nacimiento = new Date(y, m - 1, d);

    // Validación de coherencia: la fecha construida debe corresponder
    // exactamente a los valores elegidos (detecta desbordes de calendario)
    const esValida =
      nacimiento.getFullYear() === y &&
      nacimiento.getMonth() === m - 1 &&
      nacimiento.getDate() === d;

    if (!esValida) {
      setError('La fecha ingresada no es válida.');
      return;
    }

    if (nacimiento > today) {
      setError('La fecha de nacimiento no puede ser en el futuro.');
      return;
    }

    const { years, months } = calcularEdad(nacimiento, today);
    const fechaTexto = `${String(d).padStart(2, '0')} de ${MESES[m - 1]} de ${y}`;

    resultBox.innerHTML = `
      <div class="readout-card">
        <p class="headline">${years} años, ${months} meses</p>
        <p class="caption">Transcurridos desde el ${fechaTexto}</p>
      </div>
    `;
  });

  init();
})();
