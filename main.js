onload = () =>{
    document.body.classList.remove("container");
};

(function () {
  const msgEl   = document.getElementById('mensaje');
  const textEl  = document.getElementById('mensaje-texto');

  // Frases para hacerlo interactivo al hacer clic
  const frases = [
    "¡Buen inicio de semana! 🌱 Pequeños pasos, grandes resultados.",
    "Hazlo simple, hazlo ahora. ✨",
    "La constancia vence al talento cuando el talento no se esfuerza. 💪",
    "Cada lunes es un nuevo comienzo. 🚀",
    "Lo perfecto es enemigo de lo hecho. ✅"
  ];

  // Lee el mayor delay --d de los elementos que crecen (".grow-ans")
  function parseTime(str){
    if(!str) return 0;
    const m = String(str).trim().match(/^([0-9]*\.?[0-9]+)(ms|s)$/);
    if(!m) return 0;
    const val = parseFloat(m[1]);
    return m[2] === 's' ? val * 1000 : val;
  }
  function getMaxDelay(){
    const nodes = Array.from(document.querySelectorAll('.grow-ans'));
    if(!nodes.length) return 3000; // fallback
    let max = 0;
    nodes.forEach(n => {
      const cs = getComputedStyle(n);
      // intenta usar --d (custom property), si no existe intenta inline
      const d = cs.getPropertyValue('--d') || n.style.getPropertyValue('--d');
      max = Math.max(max, parseTime(d));
    });
    return max;
  }

  function typeWriter(el, text, speed = 22){
    el.textContent = '';
    let i = 0;
    const id = setInterval(() => {
      el.textContent += text[i++] || '';
      if (i > text.length) clearInterval(id);
    }, speed);
  }

  function showMessage(text){
    textEl.dataset.text = text;
    msgEl.classList.add('show');
    typeWriter(textEl, text);
  }

  // Espera hasta que (estimadamente) terminen las animaciones de las flores
  window.addEventListener('load', () => {
    const extra = 1500;                 // margen por duración de cada animación
    const wait  = getMaxDelay() + extra;
    setTimeout(() => showMessage(textEl.dataset.text || frases[0]), wait);
  });

  // Interactivo: cambiar frase al hacer clic
  msgEl.title = "Haz clic para cambiar la frase";
  msgEl.addEventListener('click', () => {
    const current = textEl.textContent;
    // elige una frase distinta de la actual
    const pool = frases.filter(f => f !== current);
    const nueva = pool[Math.floor(Math.random() * pool.length)] || frases[0];
    typeWriter(textEl, nueva);
  });

  // OPCIONAL (más preciso): si sabes cuál es el último elemento que anima,
  // escucha su 'animationend' y muestra el mensaje exactamente al terminar.
  // Ejemplo (ajusta el selector a tu último elemento animado real):
  /*
  const ultimo = document.querySelector('.long-g--7 .leaf--3'); 
  if (ultimo) {
    ultimo.addEventListener('animationend', () => showMessage(frases[0]), { once: true });
  }
  */
})();
