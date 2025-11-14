// ==================================================================
// Infinity Portal 5.1 – Unified AI Prompt Engine
// CAT I – Inline Questions + Clickable ❓ + Reply Routing
// ==================================================================

console.log("AI Prompt Engine Loaded (CAT I)");

/*
   This engine gives Infinity OS the ability to:

   ✔ Print AI messages inside the SPA panel
   ✔ Automatically attach a clickable ❓ button
   ✔ Open an inline reply field
   ✔ Capture and route the user's response
   ✔ Send that response back to any module (Quantum, Market, Brain)

   This is the universal "AI ↔ User Dialogue" system.
*/

// Reference to SPA panel
const panelI = document.getElementById("spaPanel");

// Global callback for handling responses
let InfinityAIResponseHandler = null;


// --------------------------------------------------------------
// Add AI Message to Panel (with ❓ and input box)
// --------------------------------------------------------------
function AI_Ask(question, callback) {
  // Set callback for this message
  InfinityAIResponseHandler = callback;

  // Wrapper line
  const line = document.createElement("div");
  line.style.padding = "10px 0";
  line.style.color = "white";
  line.style.fontSize = "17px";

  // Message text
  const msg = document.createElement("span");
  msg.textContent = question + " ";

  // Clickable ❓
  const qButton = document.createElement("span");
  qButton.textContent = "❓";
  qButton.style.cursor = "pointer";
  qButton.style.marginLeft = "8px";
  qButton.style.border = "1px solid #1e90ff";
  qButton.style.padding = "3px 6px";
  qButton.style.borderRadius = "5px";

  // Inline reply input (hidden)
  const reply = document.createElement("input");
  reply.type = "text";
  reply.placeholder = "Type answer…";
  reply.style.display = "none";
  reply.style.marginLeft = "10px";
  reply.style.padding = "5px";
  reply.style.borderRadius = "5px";
  reply.style.border = "1px solid #444";
  reply.style.background = "#111";
  reply.style.color = "white";
  reply.style.width = "50%";

  // When ❓ clicked → open input
  qButton.addEventListener("click", () => {
    reply.style.display = "inline-block";
    reply.focus();
  });

  // Enter → send response
  reply.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const userReply = reply.value.trim();

      if (userReply.length === 0) return;

      // Lock & hide input
      reply.style.display = "none";

      // Print confirmation
      AI_Say("✔ You said: " + userReply);

      // Send reply to handler (if exists)
      if (InfinityAIResponseHandler) {
        InfinityAIResponseHandler(userReply);
      }
    }
  });

  // Build line
  line.appendChild(msg);
  line.appendChild(qButton);
  line.appendChild(reply);

  // Add to panel
  panelI.appendChild(line);
  panelI.scrollTop = panelI.scrollHeight;
}


// --------------------------------------------------------------
// AI Says (Simple output message)
// --------------------------------------------------------------
function AI_Say(text) {
  const line = document.createElement("div");
  line.style.padding = "8px 0";
  line.style.color = "white";
  line.style.fontSize = "16px";
  line.textContent = text;

  panelI.appendChild(line);
  panelI.scrollTop = panelI.scrollHeight;
}


// --------------------------------------------------------------
// Example: Test Messages (Used later in modules)
// --------------------------------------------------------------
function AI_TestConversation() {
  AI_Say("Welcome to the Infinity AI Dialog Engine.");

  AI_Ask("Which module do you want to explore next?", (answer) => {
    AI_Say("Great choice. Loading: " + answer);
  });
}


// CAT I COMPLETE – READY FOR CAT J
