// =====================================================
// Infinity Portal 5.1 – Inline Question/Response Engine
// CAT D – Clickable ? → Inline Answer Field
// =====================================================

// This function transforms any line containing a question mark (?) 
// into an inline-answer-enabled line.
//
// Usage example inside modules later:
// addAIMessage("Which module do you want to open next?");

function addAIMessage(text) {
  const panel = document.getElementById("spaPanel");

  // Container for the AI line
  const line = document.createElement("div");
  line.style.padding = "8px 0";
  line.style.color = "white";
  line.style.fontSize = "16px";
  line.style.position = "relative";

  // Extract question text
  const msg = document.createElement("span");
  msg.textContent = text + " ";

  // Create the clickable ? button
  const qBtn = document.createElement("span");
  qBtn.textContent = "❓";
  qBtn.style.cursor = "pointer";
  qBtn.style.marginLeft = "6px";
  qBtn.style.padding = "2px 6px";
  qBtn.style.border = "1px solid #1e90ff";
  qBtn.style.borderRadius = "4px";
  
  // Inline input (hidden at first)
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Type reply…";
  input.style.display = "none";
  input.style.marginLeft = "10px";
  input.style.padding = "4px 6px";
  input.style.borderRadius = "4px";
  input.style.border = "1px solid #444";
  input.style.background = "#111";
  input.style.color = "white";

  // Show input when user clicks the ?
  qBtn.addEventListener("click", () => {
    input.style.display = "inline-block";
    input.focus();
  });

  // Handle Enter → send response to Rogers (placeholder for now)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const response = input.value.trim();
      if (response.length > 0) {
        console.log("User response:", response);

        // Placeholder: send to Rogers Brain
        addAIMessage("✔ Received: " + response);

        // Close input
        input.style.display = "none";
        input.value = "";
      }
    }
  });

  // Build the line
  line.appendChild(msg);
  line.appendChild(qBtn);
  line.appendChild(input);

  // Add to SPA panel
  panel.appendChild(line);
  panel.scrollTop = panel.scrollHeight; // auto scroll
}


// CAT D COMPLETE – READY FOR CAT E
