/* -------------------------------------------------------
   CAT T — FOLLOW-UP QUESTION + FOCUS CHAIN ENGINE
   Infinity OS SPA v1.0
------------------------------------------------------- */

if (!window.RogersBrain) window.RogersBrain = {};

window.RogersFollowup = {

    // Core follow-up generator
    getNext(question, reply) {

        const text = reply.toLowerCase();

        /* -------------------------------------------------------
           1. FOLLOW-UP BASED ON CREATION / WORK PATH
        ------------------------------------------------------- */
        if (text.includes("build") || text.includes("create") || text.includes("work")) {
            return "What would you like to construct next inside the Infinity SPA?";
        }

        /* -------------------------------------------------------
           2. FOLLOW-UP BASED ON MODE CHANGES
        ------------------------------------------------------- */
        if (text.includes("wave")) {
            return "Wave mode unlocked. What direction do you want creativity to flow into?";
        }

        if (text.includes("particle")) {
            return "Particle mode active. What detail should we zoom into next?";
        }

        /* -------------------------------------------------------
           3. FOLLOW-UP BASED ON NODE FOCUS
        ------------------------------------------------------- */
        const nodes = ["biotuner","market","quantum","hydrogen","portal","music","socializer"];
        for (let n of nodes) {
            if (text.includes(n)) {
                return `What do you want to accomplish inside the ${n} module?`;
            }
        }

        /* -------------------------------------------------------
           4. FOLLOW-UP FOR AUTOPILOT
        ------------------------------------------------------- */
        if (text.includes("auto")) {
            return "Autopilot engaged. Do you want me to choose your next focus node?";
        }

        if (text.includes("manual")) {
            return "Manual mode. What direction do you want to move next?";
        }

        /* -------------------------------------------------------
           5. DEFAULT: CONTINUE THE PATH
        ------------------------------------------------------- */
        return "What direction should we move in now?";
    },


    /* -------------------------------------------------------
       FOCUS CHAIN GENERATOR — VISUALIZER NAVIGATION
    ------------------------------------------------------- */
    followFocus(reply) {
        const text = reply.toLowerCase();

        if (text.includes("build")) {
            RogersSync.nodeFocused("portal");
            RogersSync.pulseEvent(2);
        }

        if (text.includes("quantum")) {
            RogersSync.nodeFocused("quantum");
        }

        if (text.includes("hydrogen")) {
            RogersSync.nodeFocused("hydrogen");
        }

        if (text.includes("market")) {
            RogersSync.nodeFocused("market");
        }
    }
};


/* -------------------------------------------------------
   INTEGRATE FOLLOW-UP INTO MAIN BRAIN
------------------------------------------------------- */
const oldReceive = RogersBrain.receiveUserReply;

window.RogersBrain.receiveUserReply = function(question, reply) {
    
    // First run original R + S logic
    oldReceive(question, reply);

    // Trigger focus chain movement
    RogersFollowup.followFocus(reply);

    // Generate the next question
    const nextQ = RogersFollowup.getNext(question, reply);
    
    // Ask user directly
    RogersBrain.askUser(nextQ);
};


/* -------------------------------------------------------
   CAT T COMPLETE — Follow-up + Focus Chains Enabled
------------------------------------------------------- */
