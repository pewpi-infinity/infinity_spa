// ===================================================================
// Infinity Portal 5.1 – Rogers Brain Engine
// CAT J – Real Dialogue + AI Question System Integration
// ===================================================================

console.log("Rogers Brain Loaded (CAT J)");

/*
   Rogers Brain Module:
   ✔ Can ask questions via AI_Ask()
   ✔ Can respond to user answers
   ✔ Can give guidance and route to modules
   ✔ Can act as Infinity OS "narrator" or assistant
   ✔ Can escalate to deeper logic later (ML, API, etc)
*/

// SPA panel reference
const panelJ = document.getElementById("spaPanel");

// --------------------------------------------------------------
// Rogers: Say Something
// --------------------------------------------------------------
function RogersSay(text) {
  AI_Say("🤖 Rogers: " + text);
}

// --------------------------------------------------------------
// Rogers: Ask a Question (with ❓ button)
// --------------------------------------------------------------
function RogersAsk(question, callback) {
  AI_Ask("🤖 Rogers asks: " + question, callback);
}

// --------------------------------------------------------------
// Rogers Startup Script
// --------------------------------------------------------------
function Rogers_BootSequence() {
  RogersSay("System online. Hi Kris. I'm here and listening.");

  RogersAsk(
    "What do you want to do first inside Infinity OS?",
    (answer) => {

      // Normalize
      const a = answer.toLowerCase();

      if (a.includes("biotuner")) {
        RogersSay("Loading Biotuner module...");
        loadAppById("biotuner");
      }

      else if (a.includes("market")) {
        RogersSay("Opening Infinity Marketplace...");
        loadAppById("market");
      }

      else if (a.includes("quantum")) {
        RogersSay("Activating Quantum Visualizer...");
        loadAppById("quantum");
      }

      else if (a.includes("brain") || a.includes("roger")) {
        RogersSay("I'm already here with you.");
      }

      else {
        RogersSay("I'm not sure what that means yet, but I'll learn.");
      }
    }
  );
}


// --------------------------------------------------------------
// When user opens the Rogers app panel — Boot Rogers
// --------------------------------------------------------------
document.addEventListener("InfinityNodeClicked", (e) => {
  if (e.detail.id === "brain") {
    // Delay slightly so panel loads first
    setTimeout(Rogers_BootSequence, 250);
  }
});

document.querySelectorAll(".appButton").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.getAttribute("data-app") === "brain") {
      setTimeout(Rogers_BootSequence, 250);
    }
  });
});


// CAT J COMPLETE – READY FOR CAT K
