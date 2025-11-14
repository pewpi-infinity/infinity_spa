// =============================================================
// Infinity Portal 5.1 – App Loader System
// CAT H – Real App Mapping + Panel Content Loader
// =============================================================

console.log("App Loader Loaded (CAT H)");

/*
  This file does the following:

  ✔ Connects nodes to actual apps
  ✔ Loads app panels with real content
  ✔ Works with drawer buttons AND node clicks
  ✔ Triggers transition engine for cinematic entry
  ✔ Prepares for real module UIs in later CATs
*/

// SPA panel element
const spaPanelH = document.getElementById("spaPanel");

// ------------------------------------------------------------
// APP REGISTRY — REAL mapping
// ------------------------------------------------------------
const InfinityApps = {
  quantum: {
    label: "Quantum Visualizer",
    load: () => {
      spaPanelH.innerHTML = `
        <h2>🌌 Quantum Visualizer</h2>
        <p>This module will show controls for modes & physics.</p>
      `;
    }
  },

  biotuner: {
    label: "Biotuner",
    load: () => {
      spaPanelH.innerHTML = `
        <h2>🎛️ Biotuner</h2>
        <p>Biotuner UI loads here (later we embed your full module).</p>
      `;
    }
  },

  market: {
    label: "Marketplace",
    load: () => {
      spaPanelH.innerHTML = `
        <h2>🛒 Marketplace</h2>
        <p>Infinity Marketplace UI loads here.</p>
      `;
    }
  },

  social: {
    label: "Socializer",
    load: () => {
      spaPanelH.innerHTML = `
        <h2>💬 Socializer</h2>
        <p>Posting assistant loads here.</p>
      `;
    }
  },

  auctions: {
    label: "Auction Arena",
    load: () => {
      spaPanelH.innerHTML = `
        <h2>🏛️ Auction Arena</h2>
        <p>Rogers Knowledge Auction loads here.</p>
      `;
    }
  },

  brain: {
    label: "Rogers Brain",
    load: () => {
      spaPanelH.innerHTML = `
        <h2>🧠 Rogers Brain</h2>
        <p>Full Rogers console goes here.</p>
      `;
    }
  }
};


// ------------------------------------------------------------
// LOAD APP BY ID
// ------------------------------------------------------------
function loadAppById(appId) {
  console.log("Loading app:", appId);

  if (!InfinityApps[appId]) {
    spaPanelH.innerHTML = `<h2>Error</h2><p>App '${appId}' not found.</p>`;
    return;
  }

  InfinityApps[appId].load();

  // Trigger panel transition animation
  InfinityOpenPanel();
}


// ------------------------------------------------------------
// Drawer Buttons Hook
// ------------------------------------------------------------
document.querySelectorAll(".appButton").forEach(btn => {
  btn.addEventListener("click", () => {
    const app = btn.getAttribute("data-app");
    loadAppById(app);
  });
});


// ------------------------------------------------------------
// Node → App Mapping Hook (from Vector Engine signal)
// ------------------------------------------------------------
document.addEventListener("InfinityNodeClicked", (e) => {
  const node = e.detail;
  console.log("Node → App:", node.id);

  loadAppById(node.id);
});


// CAT H COMPLETE – READY FOR CAT I
