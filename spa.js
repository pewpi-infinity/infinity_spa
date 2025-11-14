 // ===============================
 // Infinity Portal 5.1 – SPA Core
 // ===============================

console.log("SPA Loaded (CAT B)");

// DOM refs
const appDrawerButton = document.getElementById("appDrawerButton");
const appDrawerPanel = document.getElementById("appDrawerPanel");
const spaPanel       = document.getElementById("spaPanel");
const visualizer     = document.getElementById("visualizerCanvas");

// Track drawer status
let drawerOpen = false;

// -------------------------------
// Toggle App Drawer
// -------------------------------
appDrawerButton.addEventListener("click", () => {
  drawerOpen = !drawerOpen;
  appDrawerPanel.style.display = drawerOpen ? "flex" : "none";
});

// Close drawer if clicking outside
document.addEventListener("click", (e) => {
  const clickedDrawer = appDrawerPanel.contains(e.target);
  const clickedButton = appDrawerButton.contains(e.target);

  if (!clickedDrawer && !clickedButton) {
    drawerOpen = false;
    appDrawerPanel.style.display = "none";
  }
});

// -------------------------------
// App Registry (placeholders)
// -------------------------------
const InfinityApps = {
  quantum: {
    label: "Quantum Visualizer",
    load: () => showPanel("<h2>🌌 Quantum Visualizer</h2><p>CAT C will build this module.</p>")
  },
  biotuner: {
    label: "Biotuner",
    load: () => showPanel("<h2>🎛️ Biotuner</h2><p>Placeholder panel until linked.</p>")
  },
  market: {
    label: "Marketplace",
    load: () => showPanel("<h2>🛒 Marketplace</h2><p>Module loads here.</p>")
  },
  social: {
    label: "Socializer",
    load: () => showPanel("<h2>💬 Socializer</h2><p>Coming soon.</p>")
  },
  auctions: {
    label: "Auction Arena",
    load: () => showPanel("<h2>🏛️ Auction Arena</h2><p>Module entry point.</p>")
  },
  brain: {
    label: "Rogers Brain",
    load: () => showPanel("<h2>🧠 Rogers Brain</h2><p>This will become the real brain console.</p>")
  }
};

// -------------------------------
// App Button Clicks
// -------------------------------
document.querySelectorAll(".appButton").forEach(btn => {
  btn.addEventListener("click", () => {
    const app = btn.getAttribute("data-app");

    drawerOpen = false;
    appDrawerPanel.style.display = "none";

    if (InfinityApps[app]) {
      InfinityApps[app].load();
    } else {
      showPanel(`<h2>Error</h2><p>App "${app}" not found.</p>`);
    }
  });
});

// -------------------------------
// Panel Display Logic
// -------------------------------
function showPanel(html) {
  spaPanel.innerHTML = html;
  spaPanel.style.display = "block";
}

// Close panel when tapping background
visualizer.addEventListener("click", () => {
  spaPanel.style.display = "none";
});
