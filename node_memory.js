// ======================================================================
// Infinity Portal 5.1 – Node Memory Engine
// CAT N – Relevance Persistence, Memory, Auto-Save
// ======================================================================

console.log("Node Memory Loaded (CAT N)");

/*
   This module gives Infinity OS:
   ✔ Permanent node relevance memory
   ✔ Remembers which modules you use
   ✔ Restores relevance + orbit states on boot
   ✔ Autosaves in the background every 5 seconds
   ✔ Saves whenever relevance changes

   The OS now evolves with Kris over time.
*/

// Storage key
const MEMORY_KEY = "InfinityNodeRelevance_v1";

// -------------------------------------------------------------
// Load from local storage
// -------------------------------------------------------------
function loadNodeMemory() {
  const saved = localStorage.getItem(MEMORY_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    Object.keys(data).forEach(id => {
      NodeRelevance[id] = data[id];
    });

    console.log("Node memory restored:", NodeRelevance);
  } catch (err) {
    console.error("Node memory corrupted:", err);
  }
}

// -------------------------------------------------------------
// Save to local storage
// -------------------------------------------------------------
function saveNodeMemory() {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(NodeRelevance));
  console.log("Node memory saved:", NodeRelevance);
}

// -------------------------------------------------------------
// Auto-save every 5 seconds
// -------------------------------------------------------------
setInterval(saveNodeMemory, 5000);

// -------------------------------------------------------------
// Save immediately when relevance changes
// -------------------------------------------------------------
const oldBoostRelevance_N = boostRelevance;
boostRelevance = function(id, amt = 0.25) {
  oldBoostRelevance_N(id, amt);
  saveNodeMemory();
};

// Load memory on startup
loadNodeMemory();


// CAT N COMPLETE – SYSTEM MEMORY ENABLED
