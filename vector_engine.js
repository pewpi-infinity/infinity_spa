// ===============================================================
// Infinity Portal 5.1 – Vector Transition Engine
// CAT F – Cinematic Swoosh Beam When Clicking Nodes
// ===============================================================

console.log("Vector Engine Loaded (CAT F)");

/*
  This engine listens for node clicks (from canvas_engine)
  and draws a swoosh vector traveling from the node to the SPA panel.
  After the animation finishes, the SPA panel opens.
*/

// Canvas & context (shared)
const canvasF = document.getElementById("visualizerCanvas");
const ctxF = canvasF.getContext("2d");

// This will be updated by canvas_engine.js (shared event)
let lastClickedNode = null;

// Intercept node clicks by listening to a custom event
document.addEventListener("InfinityNodeClicked", (e) => {
  lastClickedNode = e.detail;
  startVectorAnimation(lastClickedNode);
});

// ----------------------------------------------------
// Vector Animation State
// ----------------------------------------------------
let vectorAnim = {
  active: false,
  x: 0,
  y: 0,
  tx: window.innerWidth / 2, // target = center of panel
  ty: window.innerHeight * 0.15,
  progress: 0
};

// ----------------------------------------------------
// Start Animation
// ----------------------------------------------------
function startVectorAnimation(node) {
  vectorAnim.active = true;
  vectorAnim.x = node.x;
  vectorAnim.y = node.y;
  vectorAnim.tx = window.innerWidth / 2;
  vectorAnim.ty = window.innerHeight * 0.10;  // panel top region
  vectorAnim.progress = 0;

  animateVector();
}

// ----------------------------------------------------
// Draw Vector Beam
// ----------------------------------------------------
function drawVector() {
  const p = vectorAnim.progress;

  // Interpolate between start and target
  const x = vectorAnim.x + (vectorAnim.tx - vectorAnim.x) * p;
  const y = vectorAnim.y + (vectorAnim.ty - vectorAnim.y) * p;

  // Draw beam
  ctxF.beginPath();
  ctxF.moveTo(vectorAnim.x, vectorAnim.y);
  ctxF.lineTo(x, y);
  ctxF.strokeStyle = "rgba(30,144,255," + (1 - p) + ")";
  ctxF.lineWidth = 4 + (1 - p) * 4;
  ctxF.shadowColor = "#1e90ff";
  ctxF.shadowBlur = 16;
  ctxF.stroke();
}

// ----------------------------------------------------
// Vector Animation Loop
// ----------------------------------------------------
function animateVector() {
  if (!vectorAnim.active) return;

  ctxF.clearRect(0, 0, canvasF.width, canvasF.height);

  drawVector();

  vectorAnim.progress += 0.04; // speed

  // Done?
  if (vectorAnim.progress >= 1) {
    vectorAnim.active = false;

    // Trigger opening the SPA panel after swoosh
    if (lastClickedNode) {
      // Simulated panel load
      const panel = document.getElementById("spaPanel");
      panel.innerHTML = "<h2>Loading " + lastClickedNode.label + "...</h2>";
      panel.style.display = "block";
    }

    return;
  }

  requestAnimationFrame(animateVector);
}


// CAT F COMPLETE – READY FOR CAT G
