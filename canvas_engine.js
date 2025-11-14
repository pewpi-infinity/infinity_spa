// ===========================================================
// Infinity Portal 5.1 – Quantum Canvas Engine
// CAT E – Node Physics + Drift + Hover Pulse
// ===========================================================

console.log("Canvas Engine Loaded (CAT E)");

// Canvas + context
const canvas = document.getElementById("visualizerCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ----------------------------------------------------
// Node Objects WITH VELOCITY
// ----------------------------------------------------
let nodes = [
  { id: "quantum",  x: 300, y: 300, r: 16, vx: 0, vy: 0, label: "Quantum" },
  { id: "biotuner", x: 600, y: 220, r: 16, vx: 0, vy: 0, label: "Biotuner" },
  { id: "market",   x: 420, y: 480, r: 16, vx: 0, vy: 0, label: "Market" },
  { id: "brain",    x: 180, y: 450, r: 16, vx: 0, vy: 0, label: "Brain" },
  { id: "social",   x: 720, y: 420, r: 16, vx: 0, vy: 0, label: "Social" }
];

// ----------------------------------------------------
// Mouse Tracking For Hover Physics
// ----------------------------------------------------
let mouse = { x: 0, y: 0 };
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// ----------------------------------------------------
// Physics Engine
// ----------------------------------------------------
function updateNodes() {
  nodes.forEach(n => {

    // Random drift (slight)
    n.vx += (Math.random() - 0.5) * 0.05;
    n.vy += (Math.random() - 0.5) * 0.05;

    // Gravity well to center
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    n.vx += (cx - n.x) * 0.0005;
    n.vy += (cy - n.y) * 0.0005;

    // Hover avoidance
    const dx = n.x - mouse.x;
    const dy = n.y - mouse.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 140) {
      const force = (140 - dist) * 0.003;
      n.vx += (dx / dist) * force;
      n.vy += (dy / dist) * force;
    }

    // Apply speed
    n.x += n.vx;
    n.y += n.vy;

    // Friction
    n.vx *= 0.97;
    n.vy *= 0.97;
  });
}

// ----------------------------------------------------
// Node Drawing w/ Hover Pulse
// ----------------------------------------------------
function drawNode(n) {

  const dx = n.x - mouse.x;
  const dy = n.y - mouse.y;
  const dist = Math.sqrt(dx*dx + dy*dy);

  let radius = n.r;
  if (dist < 120) {
    radius += 4 * (1 - dist / 120);
  }

  // Node glow
  ctx.beginPath();
  ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#1e90ff";
  ctx.shadowColor = "#1e90ff";
  ctx.shadowBlur = 15;
  ctx.fill();

  // Label
  ctx.shadowBlur = 0;
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText(n.label, n.x - radius, n.y - radius - 10);
}

// ----------------------------------------------------
// Render Loop
// ----------------------------------------------------
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateNodes();
  nodes.forEach(drawNode);

  requestAnimationFrame(render);
}
render();


// CAT E COMPLETE – READY FOR CAT F
