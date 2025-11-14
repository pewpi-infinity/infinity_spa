/* -------------------------------------------------------
   CAT P — ROGERS EVENT RESPONSE ENGINE
   Infinity OS SPA v1.0
------------------------------------------------------- */

window.RogersEvents = {

    // Core dispatcher
    handle(eventName, payload = {}) {
        switch (eventName) {

            case "app_open":
                this.onAppOpen(payload.appId);
                break;

            case "node_focus":
                this.onNodeFocus(payload.nodeId);
                break;

            case "pulse":
                this.onPulse(payload.strength);
                break;

            case "autopilot":
                this.onAutopilotToggle(payload.state);
                break;

            case "sensory":
                this.onSensoryChange(payload.mode);
                break;

            default:
                console.log("RogersEvents: unknown event:", eventName, payload);
        }
    },

    /* -------------------------------------------------------
       EVENT RESPONSES
    ------------------------------------------------------- */

    onAppOpen(appId) {
        RogersBrain.sayInline(`Switched to ${appId}.`);
        RogersBrain.pulseThought(`Now analyzing the ${appId} module...`);
    },

    onNodeFocus(nodeId) {
        RogersBrain.sayInline(`Node: ${nodeId}`);
        RogersBrain.pulseThought(`You’re hovering near the ${nodeId} cluster.`);
    },

    onPulse(strength) {
        let msg = strength > 1 ? "Strong vector pulse detected." : "Vector activity detected.";
        RogersBrain.sayInline(msg);
    },

    onAutopilotToggle(state) {
        if (state) {
            RogersBrain.pulseThought("Autopilot enabled. I'll guide movement.");
        } else {
            RogersBrain.pulseThought("Autopilot disabled. Manual control restored.");
        }
    },

    onSensoryChange(mode) {
        RogersBrain.pulseThought(`Switched sensory mode to "${mode}".`);
    }
};

/* -------------------------------------------------------
   Connect RogersEvents to Sync -> Brain channel
------------------------------------------------------- */

window.RogersBrain.notify = function(eventName, payload) {
    RogersEvents.handle(eventName, payload);
};

/* -------------------------------------------------------
   CAT P COMPLETE — Rogers now responds to OS events
------------------------------------------------------- */
