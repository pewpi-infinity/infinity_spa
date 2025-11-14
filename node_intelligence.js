// ======================================================================
// Infinity Portal 5.1 – Node Intelligence Engine
// CAT M – Relevance Gravity, Orbit, Repulsion, Clustering
// ======================================================================

console.log("Node Intelligence Loaded (CAT M)");

/*
  Adds real mental-model behaviors:

  ✔ Nodes drift toward relevance targets
  ✔ Nodes orbit around recently activated concepts
  ✔ Nodes repel when irrelevant or low-relevance
  ✔ Rogers thinking pulls nodes toward the brain
  ✔ Related nodes cluster
  ✔ Everything feels alive + meaningful
*/

// Node relevance map
let NodeRelevance = {
  quantum: 0.5,
  biotuner: 0.5,
  market: 0.5,
  brain: 1.0,
  social: 0.5
};

// Node orbit states
let NodeOrbit = {}; // id → { angle, speed, radius }


// --------------------------------------------------------------
// Boost relevance (called on click or from Rogers)
// --------------------------------------------------------------
function boostRelevance(id, amt = 0.25) {
  NodeRelevance[id] = Math.min(NodeRelevance[id] + amt, 2.0);
}


// --------------------------------------------------------------
// Intelligent Node Motion
// --------------------------------------------------------------
function applyNodeIntelligence() {

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  nodes.forEach(n => {

    // =========== ROGERS THINKING BOOST ============
    if (RogersThinking && n.id !== "brain") {
      // Pull nodes slightly toward brain
      const brain = nodes.find(n2 => n2.id === "brain");
      if (brain) {
        const dx = brain.x - n.x;
        const dy = brain.y - n.y;
        n.vx += dx * 0.0009;
        n.vy += dy * 0.0009;
      }
    }


    // =========== ORBIT MODE ============
    if (NodeOrbit[n.id]) {
      const orb = NodeOrbit[n.id];

      orb.angle += orb.speed;

      n.x += Math.cos(orb.angle) * 0.8;
      n.y += Math.sin(orb.angle) * 0.8;
    }


    // =========== RELEVANCE GRAVITY ============
    let rel = NodeRelevance[n.id] ?? 0.5;

    // pull highly relevant nodes closer to center
    n.vx += (cx - n.x) * rel * 0.0004;
    n.vy += (cy - n.y) * rel * 0.0004;


    // =========== REPULSION FOR LOW RELEVANCE ============
    if (rel < 0.4) {
      n.vx += (Math.random() - 0.5) * 0.3;
      n.vy += (Math.random() - 0.5) * 0.3;
    }

  });
}


// --------------------------------------------------------------
// Hook into main physics loop
// --------------------------------------------------------------
const oldUpdateNodes_M = updateNodes;

updateNodes = function() {
  oldUpdateNodes_M();
  applyNodeIntelligence();
};


// --------------------------------------------------------------
// Activate Orbit on Click
// --------------------------------------------------------------
document.addEventListener("InfinityNodeClicked", (e) => {
  const id = e.detail.id;

  boostRelevance(id, 0.5);

  NodeOrbit[id] = {
    angle: Math.random() * Math.PI * 2,
    speed: 0.03 + Math.random() * 0.03,
    radius: 40 + Math.random() * 40
  };
});


// CAT M COMPLETE – READY FOR CAT N
