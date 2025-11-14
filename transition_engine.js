// ===============================================================
// Infinity Portal 5.1 – Transition Engine
// CAT G – Dim Background + Panel Zoom-In Animation
// ===============================================================

console.log("Transition Engine Loaded (CAT G)");

/*
  This component adds:
  ✔ Canvas dim overlay
  ✔ SPA panel zoom-in animation
  ✔ Smooth undim on panel close
*/

const dimmer = document.createElement("div");
dimmer.id = "infinityDimmer";
dimmer.style.position = "fixed";
dimmer.style.top = "0";
dimmer.style.left = "0";
dimmer.style.width = "100vw";
dimmer.style.height = "100vh";
dimmer.style.background = "rgba(0,0,0,0)";
dimmer.style.transition = "background 0.35s ease-out";
dimmer.style.pointerEvents = "none";
dimmer.style.zIndex = "25";  // below SPA panel but above canvas

document.body.appendChild(dimmer);


// -------------------------------------------------------
// Trigger Dim + Panel Zoom
// Called after vector animation completes
// -------------------------------------------------------
function InfinityOpenPanel() {
  const panel = document.getElementById("spaPanel");

  // Dim background
  dimmer.style.background = "rgba(0,0,0,0.55)";

  // Prepare panel for zoom
  panel.style.transform = "scale(0.3)";
  panel.style.opacity = "0";
  panel.style.display = "block";

  setTimeout(() => {
    // Zoom to full
    panel.style.transition = "transform 0.35s ease, opacity 0.4s ease";
    panel.style.transform = "scale(1)";
    panel.style.opacity = "1";
  }, 20);
}


// -------------------------------------------------------
// Undim + Hide panel (called when clicking canvas)
// -------------------------------------------------------
function InfinityClosePanel() {
  const panel = document.getElementById("spaPanel");

  // Zoom-out effect
  panel.style.transform = "scale(0.5)";
  panel.style.opacity = "0";

  // Undim background
  dimmer.style.background = "rgba(0,0,0,0)";

  setTimeout(() => {
    panel.style.display = "none";
  }, 250);
}


// -------------------------------------------------------
// Hook panel close to canvas click
// -------------------------------------------------------
const viz = document.getElementById("visualizerCanvas");
viz.addEventListener("click", () => {
  InfinityClosePanel();
});


// -------------------------------------------------------
// Hook into VectorEngine to open panel AFTER swoosh
// -------------------------------------------------------
document.addEventListener("InfinityVectorComplete", (e) => {
  InfinityOpenPanel();
});


// CAT G COMPLETE – READY FOR CAT H
