// ======================================================================
// Infinity Portal 5.1 – Rogers Brain Pulse Engine
// CAT K – Visual Thinking Pulse + Node Glow Feedback
// ======================================================================

console.log("Rogers Pulse Engine Loaded (CAT K)");

/*
   This engine makes Rogers visible in the Canvas Layer
   when he is thinking or processing a response.

   ✔ Brain node glows & pulses
   ✔ Expanding ripple effect
   ✔ Stops automatically when Rogers responds
   ✔ Any module can call RogersBeginThinking() / RogersEndThinking()
*/

// State
let RogersThinking = false;
let RogersPulseRadius = 0;


// --------------------------------------------------------------
// Helper: Find the brain node inside the canvas engine
// --------------------------------------------------------------
function getBrainNode() {
  return nodes.find(n => n.id === "brain");
}


// --------------------------------------------------------------
// Start Rogers thinking
// --------------------------------------------------------------
function RogersBeginThinking() {
  RogersThinking = true;
  RogersPulseRadius = 0;
}

// --------------------------------------------------------------
// Stop Rogers thinking
// --------------------------------------------------------------
function RogersEndThinking() {
  RogersThinking = false;
}


// --------------------------------------------------------------
// Patch into Canvas Render Loop (pulse overlay)
// --------------------------------------------------------------
const oldRenderK = render;

render = function() {
  oldRenderK(); // draw nodes normally

  if (RogersThinking) {
    const brain = getBrainNode();
    if (!brain) return;

    // Draw pulse
    ctx.beginPath();
    ctx.arc(brain.x, brain.y, RogersPulseRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(30,144,255," + (1 - RogersPulseRadius / 200) + ")";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#1e90ff";
    ctx.shadowBlur = 20;
    ctx.stroke();

    RogersPulseRadius += 2;

    if (RogersPulseRadius > 200) {
      RogersPulseRadius = 0;
    }
  }

  requestAnimationFrame(render);
};


// --------------------------------------------------------------
// Automatically trigger thinking when Rogers asks something
// --------------------------------------------------------------
const oldRogersAsk = RogersAsk;
RogersAsk = function(question, callback) {
  RogersBeginThinking();    // START thinking animation

  oldRogersAsk(question, (answer) => {
    RogersEndThinking();    // STOP thinking animation
    callback(answer);       // return response to previous logic
  });
};


// CAT K COMPLETE – READY FOR CAT L
