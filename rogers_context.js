/* -------------------------------------------------------
   CAT S — CONTEXT + PURPOSE ENGINE
   Infinity OS SPA v1.0
------------------------------------------------------- */

if (!window.RogersBrain) window.RogersBrain = {};

window.RogersContext = {
    history: [],
    maxHistory: 20,

    // Log OS events for context
    log(event, payload) {
        this.history.push({ event, payload, time: Date.now() });
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    },

    // Pull last event of a type
    last(eventName) {
        for (let i = this.history.length - 1; i >= 0; i--) {
            if (this.history[i].event === eventName) {
                return this.history[i];
            }
        }
        return null;
    },

    // Detect "good path" vs "B path"
    moralDirection() {
        const distractions = ["crypto", "hype", "scam", "bs", "nonsense"];
        const creations = ["build", "create", "focus", "work", "design", "growth"];

        const lastReply = this.last("user_reply");
        if (!lastReply) return "neutral";

        const text = lastReply.payload.toLowerCase();

        for (let d of distractions) {
            if (text.includes(d)) return "bad_path";
        }
        for (let c of creations) {
            if (text.includes(c)) return "good_path";
        }

        return "neutral";
    }
};


/* -------------------------------------------------------
   INTERPRETATION UPGRADE (CONTEXT + PURPOSE)
------------------------------------------------------- */

window.RogersBrain.contextualize = function(question, reply) {

    // Store reply in context history
    RogersContext.log("user_reply", reply);

    const direction = RogersContext.moralDirection();
    const sensory = RogersSync.sensoryMode;
    const node = RogersSync.currentNode;
    const app = RogersSync.currentApp;

    let output = "";

    /* -------------------------------------------------------
       PURPOSE FILTER: steer away from "B path"
    ------------------------------------------------------- */
    if (direction === "bad_path") {
        output += "I'm detecting distraction energy. Let’s pull things back on track.\n";
        output += "Moving you toward constructive focus.";
        RogersSync.nodeFocused("quantum");
        return output;
    }

    /* -------------------------------------------------------
       GOOD PATH: reinforce productive movement
    ------------------------------------------------------- */
    if (direction === "good_path") {
        output += "Solid direction. I'm amplifying your focus zone.\n";
        if (node) output += `Centering on the ${node} node.`;
        RogersSync.pulseEvent(2);
        return output;
    }

    /* -------------------------------------------------------
       SENSORY MODE GUIDANCE
    ------------------------------------------------------- */
    if (sensory === "wave") {
        output += "Wave mode active — high creativity.\n";
        output += "Let’s explore possibilities.";
        return output;
    }

    if (sensory === "particle") {
        output += "Particle mode is sharp and analytical.\n";
        output += "Precision thinking engaged.";
        return output;
    }

    /* -------------------------------------------------------
       DEFAULT: neutral guidance
    ------------------------------------------------------- */
    output += "Understood. Continuing forward.";
    return output;
};


/* -------------------------------------------------------
   MAIN ROUTE — Integrate with R (interpretive layer)
------------------------------------------------------- */
const oldInterpret = RogersBrain.receiveUserReply;

window.RogersBrain.receiveUserReply = function(question, reply) {
    // Step 1: baseline interpretation (keyword)
    const base = RogersBrain.interpret(question, reply);

    // Step 2: contextual + moral + purpose reasoning
    const ctx = RogersBrain.contextualize(question, reply);

    // Combine
    RogersBrain.pulseThought(base + "\n" + ctx);
};


/* -------------------------------------------------------
   CAT S COMPLETE — Context-Aware AI Activated
------------------------------------------------------- */
