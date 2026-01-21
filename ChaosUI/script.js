let caos = 0;
let ultimoMovimiento = Date.now();
let ultimoClick = Date.now();
let amenazaCierre = false;

const body = document.body;
const core = document.getElementById("chaos-core");

const button = document.getElementById("chaosBtn");
const title = document.getElementById("title");
const message = document.getElementById("message");
const bar = document.getElementById("bar");

const fakeBtns = document.querySelectorAll(".fakeBtn");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

document.addEventListener("mousemove", () => {
  ultimoMovimiento = Date.now();
});

button.addEventListener("mouseenter", () => {
  if (caos > 1) caos += 0.5;
});

fakeBtns.forEach(b => {
  b.addEventListener("mouseenter", () => {
    caos += 0.2;
  });
});


fakeBtns.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    caos += 0.2;
  });

  btn.addEventListener("click", () => {
    caos += 3;
    message.textContent = "Elegiste mal.";
    sonido();
  });
});


function loop() {

  aplicarCaos();
  requestAnimationFrame(loop);
}


function aplicarCaos() {

  moverElemento(button, caos);

  fakeBtns.forEach((btn, i) => {
    moverElemento(btn, caos + i * 0.7);
  });

  body.style.backgroundColor = randomColor();
  body.style.color = randomColor();

  title.style.fontSize = `${2 + caos * 0.2}rem`;
  message.textContent = juicio(caos);

if (caos > 2) body.classList.add("shake");
if (caos > 4) body.classList.add("glitch");
if (caos > 6) core.classList.add("core-chaos");
if (caos > 8) button.classList.add("explode");
if (caos > 12) button.classList.add("existential");


  efectosExtra();
}

function efectosExtra() {
  bar.style.width = `${Math.min(caos * 12, 100)}%`;

  body.classList.toggle("breathe", caos > 5);
  body.classList.toggle("vignette", caos > 6);
  button.classList.toggle("existential", caos > 7);

  if (caos > 6 && !amenazaCierre) {
    amenazaCierre = true;
    message.textContent = "Error crítico. Cerrando pestaña…";
    setTimeout(() => {
      message.textContent = "Es broma. Pero podríamos.";
    }, 1500);
  }

  clonarBoton();
}


function moverElemento(el, intensidad = 1) {
  const t = Date.now() / 80;
  const ruido = Math.sin(t + Math.random());

  const x = ruido * 120 * intensidad;
  const y = Math.cos(t * 0.9) * 90 * intensidad;
  const r = ruido * 120;

  el.style.transform = `
    translate(${x}px, ${y}px)
    rotate(${r}deg)
    scale(${1 + Math.abs(ruido) * 0.4})
  `;
}

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
  return frases[Math.min(Math.floor(n), frases.length - 1)];
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
  if (Math.floor(caos) === 5 || Math.floor(caos) === 8) {
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
