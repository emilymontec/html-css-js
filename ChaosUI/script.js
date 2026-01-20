let caos = 0;

const button = document.getElementById("chaosBtn");
const body = document.body;
const title = document.getElementById("title");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  caos++;
  aplicarCaos(caos);
});

function aplicarCaos(nivel) {
  // Movimiento aleatorio del botón
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  button.style.transform = `translate(${x}px, ${y}px) rotate(${nivel * 5}deg)`;

  // Texto cada vez más grande
  title.style.fontSize = `${2 + nivel * 0.2}rem`;

  // Colores progresivamente horribles
  body.style.backgroundColor = randomColor();
  body.style.color = randomColor();

  // Mensajes pasivo-agresivos
  if (nivel === 1) message.textContent = "Hmm… eso no fue buena idea.";
  if (nivel === 3) message.textContent = "¿Otra vez?";
  if (nivel === 5) message.textContent = "Para. En serio.";
  if (nivel >= 8) message.textContent = "Esto ya es tu culpa.";
}

function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 70%)`;
}
