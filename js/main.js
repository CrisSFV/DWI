document.addEventListener('DOMContentLoaded', () => {
  const switches = document.querySelectorAll('.switch');
  const panels = document.querySelectorAll('.panel');

  switches.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;

      // Activa solo el switch pulsado y muestra su panel asociado.
      switches.forEach(b => b.classList.toggle('active', b === btn));
      panels.forEach(p => p.classList.toggle('active', p.id === targetId));

      // Mueve el foco al título del panel para mejorar la navegación con teclado.
      const heading = document.querySelector(`#${targetId} h2`);
      if (heading) heading.setAttribute('tabindex', '-1');
      if (heading) heading.focus({ preventScroll: true });
    });
  });
});
