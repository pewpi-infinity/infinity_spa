// =====================================================================
// Infinity Portal 5.1 – Autobahn Engine
// CAT L – Node-to-Node Pulse Links (Dynamic Connections)
// =====================================================================

console.log("Autobahn Engine Loaded (CAT L)");

/*
   The Autobahn system automatically:

   ✔ Connects nodes with vector lines
   ✔ Adds pulsing energy between related nodes
   ✔ Strengthens lines when nodes are active
   ✔ Reacts to hover, clicks, and Rogers thinking
   ✔ Makes the Infinity OS behave like a real mind-map
*/

// -------------------------------------------------------
// BASE CONNECTIONS (we expand later)
// -------------------------------------------------------
let AutobahnLinks = [
  { a: "quantum",  b: "brain",     strength: 0.6 },
  { a: "brain",    b: "biotuner",  strength: 0.5 },
  { a: "market",   b: "brain",     strength: 0.4 },
  { a: "social",   b: "brain",     strength: 0.4 },
  { a: "quantum",  b: "social",    strength: 0.3 }
];

let AutobahnPulse = 0;


// -------------------------------------------------------
// Helper: find node by ID
// -------------------------------------------------------
function getNodeById(id) {
  return nodes.find(n => n.id === id);
}


// -------------------------------------------------------
// Draw Autobahn Lines
// -------------------------------------------------------
function drawAutobahn() {
  AutobahnPulse += 0.02;

  AutobahnLinks.forEach(link => {
    const A = getNodeById(link.a);
    const B = getNodeById(link.b);

    if (!A || !B) return;

    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const midX = (A.x + B.x) / 2;
    const midY = (A.y + B.y) / 2;

    const pulse = (Math.sin(AutobahnPulse * 4) + 1) / 2;

    // Strengthened when hovered or clicked
    let localStrength = link.strength;

    // If Rogers is thinking → all brain connections strengthen
    if (RogersThinking && (link.a === "brain" || link.b === "brain")) {
      localStrength += 0.3;
    }

    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);

    ctx.lineWidth = Math.max(1, 6 * localStrength);
    ctx.strokeStyle = `rgba(30,144,255, ${0.2 + pulse * localStrength})`;

    ctx.shadowColor = "#1e90ff";
    ctx.shadowBlur = 20 * localStrength;

    ctx.stroke();
  });
}


// -------------------------------------------------------
// Patch render loop into canvas engine
// -------------------------------------------------------
const oldRender_L = render;

render = function() {
  oldRender_L();      // Draw nodes normally
  drawAutobahn();     // Draw the Autobahn network
};


// -------------------------------------------------------
// Strengthen Autobahn on Node Click
// -------------------------------------------------------
document.addEventListener("InfinityNodeClicked", (e) => {
  const id = e.detail.id;

  AutobahnLinks.forEach(link => {
    if (link.a === id || link.b === id) {
      link.strength = Math.min(link.strength + 0.2, 1.0);
    }
  });
});


// CAT L COMPLETE – READY FOR CAT M
