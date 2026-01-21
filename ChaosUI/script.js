const body = document.body;
let amenazaCierre = false;
let ultimoMovimiento = Date.now();
let ultimoClick = Date.now();
const core = document.getElementById("chaos-core");
let caosVivo = 0;


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const button = document.getElementById("chaosBtn");
const title = document.getElementById("title");
const message = document.getElementById("message");
const bar = document.getElementById("bar");

const arena = document.querySelector(".arena");
const fakeBtns = document.querySelectorAll(".fakeBtn");

let caos = Number(localStorage.getItem("caos")) || 0;

document.addEventListener("mousemove", () => {
  ultimoMovimiento = Date.now();
});

button.addEventListener("mouseenter", () => {
  if (caos >= 2) caos++;
});

button.addEventListener("click", () => {
  caos++;
  ultimoClick = Date.now();
  localStorage.setItem("caos", caos);
  sonido();
  aplicarCaos();
});

function loop() {
  const ahora = Date.now();

  // caos autónomo
  caosVivo = Math.sin(Date.now() / 300) * caos;

  if (ahora - ultimoMovimiento > 3000) {
    caos += 0.05;
  }

  if (ahora - ultimoClick > 6000 && caos > 0) {
    caos -= 0.02;
  }

  aplicarCaos();
  requestAnimationFrame(loop);
}

function aplicarCaos() {
    function moverElemento(el, intensidad = 1) {
  const ruido = Math.sin(Date.now() / 100 + Math.random());
  const x = ruido * 120 * intensidad;
  const y = Math.cos(Date.now() / 120 + Math.random()) * 80 * intensidad;
  const r = ruido * 90;

  el.style.transform = `
    translate(${x}px, ${y}px)
    rotate(${r}deg)
    scale(${1 + Math.abs(ruido) * 0.3})
  `;
}

    
    core.classList.toggle("core-chaos", caos >= 3);

moverElemento(button, caos);

fakeBtns.forEach((btn, i) => {
  moverElemento(btn, caos + i * 0.5);
});



  body.style.backgroundColor = randomColor();
  body.style.color = randomColor();

  title.style.fontSize = `${2 + caos * 0.2}rem`;

  body.classList.toggle("shake", caos >= 4);
  body.classList.toggle("glitch", caos >= 6);

  message.textContent = juicio(caos);

  core.classList.toggle("core-chaos", caos >= 6);

}

function efectosExtra() {
  bar.style.width = `${Math.min(caos * 12, 100)}%`;

  body.classList.toggle("breathe", caos >= 5);
  body.classList.toggle("vignette", caos >= 6);
  button.classList.toggle("explode", caos >= 7);
  button.classList.toggle("existential", caos >= 7);

  if (caos === 6 && !amenazaCierre) {
    amenazaCierre = true;
    message.textContent = "Error crítico. Cerrando pestaña…";
    setTimeout(() => {
      message.textContent = "Es broma. Pero podríamos.";
    }, 1500);
  }

  if (caos === 10) {
    body.innerHTML = "<h1>Fin.</h1><p>Ahora puedes descansar.</p>";
    setTimeout(() => location.reload(), 2000);
  }

  clonarBoton();
}

function moverBoton() {
  button.style.transform =
    `translate(${Math.sin(caos) * 120}px, ${Math.cos(caos) * 120}px)
     rotate(${caos * 8}deg)`;
}

fakeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
  caos += 1.5;
  ultimoClick = Date.now();
  localStorage.setItem("caos", caos);

  for (let i = 0; i < 5; i++) {
    setTimeout(aplicarCaos, i * 60);
  }

  sonido();
});
});

fakeBtns.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    caos += 0.3;
  });

  btn.addEventListener("click", () => {
    caos += 2;
    message.textContent = "Elegiste mal.";
  });
});


function juicio(n) {
  const frases = [
    "Respira. No hagas nada.",
    "Vas bien… demasiado bien.",
    "¿Por qué sigues aquí?",
    "Esto no es un juego.",
    "Las reglas cambian.",
    "No hay forma correcta.",
    "El botón no importa.",
    "Tú tampoco.",
    "Gracias por participar."
  ];
  return frases[Math.min(n, frases.length - 1)];
}

function sonido() {
  const osc = audioCtx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 200 + caos * 30;
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 65%)`;
}

function clonarBoton() {
  if (caos === 5 || caos === 8) {
    const c = button.cloneNode(true);
    c.textContent = "Este no";
    c.onclick = () => {
      caos += 2;
      aplicarCaos();
    };
    body.appendChild(c);
  }
}

aplicarCaos();
loop();
