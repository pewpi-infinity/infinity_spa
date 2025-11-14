/* -------------------------------------------------------
   CAT U — QUANTUM VISUALIZER INTEGRATION LAYER
   Infinity OS SPA v1.0
------------------------------------------------------- */

if (!window.Visualizer) window.Visualizer = {};

// Central control object for canvas reactions
window.Visualizer.React = {

    /* -------------------------------------------------------
       PULSE EFFECT
       Called when RogersSync.pulseEvent() runs
    ------------------------------------------------------- */
    pulse(strength = 1) {
        if (!Visualizer.engine) return;

        Visualizer.engine.pulseStrength = strength;
        Visualizer.engine.triggerPulse();

        console.log("Visualizer: pulse", strength);
    },

    /* -------------------------------------------------------
       FOCUS NODE GLOW
       Called when RogersSync.nodeFocused() runs
    ------------------------------------------------------- */
    focusNode(nodeId) {
        if (!Visualizer.engine) return;

        Visualizer.engine.setFocusedNode(nodeId);
        console.log("Visualizer: focus", nodeId);
    },

    /* -------------------------------------------------------
       SENSORY MODE VISUAL EFFECTS
    ------------------------------------------------------- */
    sensory(mode) {
        if (!Visualizer.engine) return;

        Visualizer.engine.sensoryMode = mode;
        Visualizer.engine.updateVisualStyle(mode);

        console.log("Visualizer: sensory", mode);
    },

    /* -------------------------------------------------------
       AUTOPILOT CAMERA GUIDANCE
    ------------------------------------------------------- */
    autopilot(state) {
        if (!Visualizer.engine) return;

        Visualizer.engine.autopilot = state;
        console.log("Visualizer: autopilot", state);
    },

    /* -------------------------------------------------------
       MORAL ZONE COLORING
    ------------------------------------------------------- */
    moral(direction) {
        if (!Visualizer.engine) return;

        if (direction === "bad_path") {
            Visualizer.engine.fieldTint = "red";
        } else if (direction === "good_path") {
            Visualizer.engine.fieldTint = "blue";
        } else {
            Visualizer.engine.fieldTint = "neutral";
        }

        Visualizer.engine.applyFieldTint();
        console.log("Visualizer: moral zone", direction);
    }
};


/* -------------------------------------------------------
   CONNECT ROGERS → VISUALIZER
------------------------------------------------------- */

// Inject pulses into visualizer
const oldPulse = RogersSync.pulseEvent;
RogersSync.pulseEvent = function(strength) {
    Visualizer.React.pulse(strength);
    oldPulse.call(RogersSync, strength);
};

// Node focusing
const oldNodeFocus = RogersSync.nodeFocused;
RogersSync.nodeFocused = function(nodeId) {
    Visualizer.React.focusNode(nodeId);
    oldNodeFocus.call(RogersSync, nodeId);
};

// Sensory mode
const oldSensory = RogersSync.setSensoryMode;
RogersSync.setSensoryMode = function(mode) {
    Visualizer.React.sensory(mode);
    oldSensory.call(RogersSync, mode);
};

// Autopilot
const oldAuto = RogersSync.setAutopilot;
RogersSync.setAutopilot = function(state) {
    Visualizer.React.autopilot(state);
    oldAuto.call(RogersSync, state);
};

// Moral direction
const oldReceiveReply = RogersBrain.receiveUserReply;
RogersBrain.receiveUserReply = function(question, reply) {
    oldReceiveReply(question, reply);

    const direction = RogersContext.moralDirection();
    Visualizer.React.moral(direction);
};


/* -------------------------------------------------------
   CAT U COMPLETE
   Visualizer now reacts to all Rogers activity
------------------------------------------------------- */
