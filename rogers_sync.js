/* -------------------------------------------------------
   CAT O — ROGERS REAL-TIME SYNC ENGINE
   Infinity OS SPA v1.0
------------------------------------------------------- */

window.RogersSync = {
    currentApp: "none",
    currentNode: "none",
    autopilot: false,
    sensoryMode: "wave",
    lastPulse: 0,

    // Called when user opens an app
    appOpened(appId) {
        this.currentApp = appId;
        RogersBrain.notify("app_open", { appId });
    },

    // Called when a node is interacted with
    nodeFocused(nodeId) {
        this.currentNode = nodeId;
        RogersBrain.notify("node_focus", { nodeId });
    },

    // Autopilot toggle
    setAutopilot(state) {
        this.autopilot = state;
        RogersBrain.notify("autopilot", { state });
    },

    // Sensory mode toggle (wave / particle / dark / light)
    setSensoryMode(mode) {
        this.sensoryMode = mode;
        RogersBrain.notify("sensory", { mode });
    },

    // When vectors pulse or fire paths
    pulseEvent(strength = 1) {
        this.lastPulse = Date.now();
        RogersBrain.notify("pulse", { strength });
    }
};

/* -------------------------------------------------------
   Bind Rogers Sync to the app loader
------------------------------------------------------- */
document.addEventListener("app_loaded", (e) => {
    RogersSync.appOpened(e.detail);
});

/* -------------------------------------------------------
   Bind Rogers Sync to node focus events
------------------------------------------------------- */
document.addEventListener("node_focus", (e) => {
    RogersSync.nodeFocused(e.detail);
});

/* -------------------------------------------------------
   CAT O COMPLETE — Rogers Sync Layer Enabled
------------------------------------------------------- */
