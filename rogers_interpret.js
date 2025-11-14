/* -------------------------------------------------------
   CAT R — ROGERS INTERPRETIVE ENGINE
   Infinity OS SPA v1.0
------------------------------------------------------- */

if (!window.RogersBrain) window.RogersBrain = {};

window.RogersBrain.interpret = function(question, reply) {

    const text = reply.toLowerCase();

    /* -------------------------------------------------------
        1. SENSORY MODE DECODING
    ------------------------------------------------------- */
    if (text.includes("wave")) {
        RogersSync.setSensoryMode("wave");
        return "Switching to wave-mode perception.";
    }

    if (text.includes("particle")) {
        RogersSync.setSensoryMode("particle");
        return "Particle mode activated.";
    }

    if (text.includes("dark")) {
        RogersSync.setSensoryMode("dark");
        return "Dark mode enabled.";
    }

    if (text.includes("light")) {
        RogersSync.setSensoryMode("light");
        return "Light mode on.";
    }

    /* -------------------------------------------------------
        2. AUTOPILOT
    ------------------------------------------------------- */
    if (text.includes("auto")) {
        RogersSync.setAutopilot(true);
        return "Autopilot activated.";
    }

    if (text.includes("manual")) {
        RogersSync.setAutopilot(false);
        return "Manual mode restored.";
    }

    /* -------------------------------------------------------
        3. NODE FOCUSING / RELEVANCE
    ------------------------------------------------------- */
    const knownNodes = ["biotuner", "market", "quantum", "hydrogen", "portal", "music", "socializer"];

    for (let n of knownNodes) {
        if (text.includes(n)) {
            RogersSync.nodeFocused(n);
            return `Focusing on the ${n} node.`;
        }
    }

    /* -------------------------------------------------------
        4. GENERAL ACKNOWLEDGEMENT
    ------------------------------------------------------- */
    return "Understood.";
};


/* -------------------------------------------------------
   ROUTE USER REPLY INTO INTERPRETATION
------------------------------------------------------- */
window.RogersBrain.receiveUserReply = function(question, reply) {
    const out = RogersBrain.interpret(question, reply);
    RogersBrain.pulseThought(out);
};


/* -------------------------------------------------------
   CAT R COMPLETE — Interpretation Enabled
------------------------------------------------------- */
