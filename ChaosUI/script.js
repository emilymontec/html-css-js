const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const bar = document.getElementById("bar");
let caos = Number(localStorage.getItem("caos")) || 0;
let calma = 0;
let ultimoClick = Date.now();

const button = document.getElementById("chaosBtn");
const body = document.body;
const title = document.getElementById("title");
const message = document.getElementById("message");

function loop() {
  const ahora = Date.now();

  // premio por NO hacer click
  if (ahora - ultimoClick > 5000 && caos > 0) {
    caos--;
    localStorage.setItem("caos", caos);
    aplicarCaos();
    button.classList.toggle("explode", caos >= 7);
    bar.style.width = `${Math.min(caos * 12, 100)}%`;
    body.classList.toggle("vignette", caos >= 6);
  }

  requestAnimationFrame(loop);
}

button.addEventListener("click", () => {
  caos++;
  ultimoClick = Date.now();
  localStorage.setItem("caos", caos);
  aplicarCaos();
  const osc = audioCtx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 200 + caos * 30;
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);

});

button.addEventListener("mouseenter", () => {
  if (caos >= 2) caos++;
});

function aplicarCaos() {
  moverBoton();

  body.style.backgroundColor = randomColor();
  body.style.color = randomColor();

  title.style.fontSize = `${2 + caos * 0.2}rem`;

  body.classList.toggle("shake", caos >= 4);
  body.classList.toggle("glitch", caos >= 6);

  juzgar(caos);
}

function moverBoton() {
  const x = Math.sin(caos) * 120;
  const y = Math.cos(caos) * 120;
  button.style.transform = `translate(${x}px, ${y}px) rotate(${caos * 8}deg)`;
}

function juzgar(nivel) {
  const textos = [
    "Respira. No hagas nada.",
    "Vas bien… demasiado bien.",
    "¿Por qué sigues aquí?",
    "Esto no es un juego.",
    "Para. Ganaste. (mentira)",
    "Te atrapó.",
    "El caos eres tú."
  ];

  message.textContent = textos[Math.min(nivel, textos.length - 1)];
}

function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 65%)`;
}

function clonarBoton() {
  if (caos === 5 || caos === 8) {
    const clone = button.cloneNode(true);
    clone.textContent = "Este no";
    clone.addEventListener("click", () => {
      caos += 2;
      aplicarCaos();
    });
    document.body.appendChild(clone);
  }
}


aplicarCaos();
clonarBoton();
loop();
