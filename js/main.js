document.addEventListener('DOMContentLoaded', () => {
  const switches = document.querySelectorAll('.switch');
  const panels = document.querySelectorAll('.panel');

  switches.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;

      switches.forEach(b => b.classList.toggle('active', b === btn));
      panels.forEach(p => p.classList.toggle('active', p.id === targetId));

      const heading = document.querySelector(`#${targetId} h2`);
      if (heading) heading.setAttribute('tabindex', '-1');
      if (heading) heading.focus({ preventScroll: true });
    });
  });
});
