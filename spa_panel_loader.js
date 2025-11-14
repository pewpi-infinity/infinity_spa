/* -------------------------------------------------------
   CAT Y — SPA PANEL LOADER ENGINE
   Infinity OS SPA v1.0
------------------------------------------------------- */

window.SPA = {
    panel: null,
    active: false,

    init() {
        // Build UI panel
        this.panel = document.createElement("div");
        this.panel.id = "spaPanel";
        this.panel.style.position = "fixed";
        this.panel.style.top = "0";
        this.panel.style.left = "0";
        this.panel.style.width = "100%";
        this.panel.style.height = "100%";
        this.panel.style.background = "rgba(0,0,0,0.75)";
        this.panel.style.display = "none";
        this.panel.style.color = "white";
        this.panel.style.zIndex = "8000";
        this.panel.style.padding = "20px";
        this.panel.style.overflowY = "auto";
        this.panel.style.backdropFilter = "blur(6px)";
        this.panel.style.transition = "opacity 0.35s ease";

        document.body.appendChild(this.panel);

        // Listen to app loads
        document.addEventListener("app_loaded", (e) => {
            this.open(e.detail);
        });
    },

    /* -------------------------------------------------------
       OPEN A PANEL FOR A MODULE
    ------------------------------------------------------- */
    open(moduleId) {
        this.active = true;

        // Load module HTML
        const html = this.getModuleContent(moduleId);

        // Insert content
        this.panel.innerHTML = `
            <div class="spaHeader">
                <button id="spaCloseBtn" style="
                    float:right;
                    background:#1e90ff;
                    border:none;
                    padding:8px 14px;
                    border-radius:8px;
                    color:white;
                    font-size:14px;
                    cursor:pointer;
                ">Close</button>
                <h2 style="margin-top:0">${moduleId.toUpperCase()} MODULE</h2>
            </div>
            <div class="spaContent">${html}</div>
        `;

        // Show with animation
        this.panel.style.display = "block";
        requestAnimationFrame(() => {
            this.panel.style.opacity = "1";
        });

        // Close handler
        document.getElementById("spaCloseBtn").onclick = () => {
            this.close();
        };

        // Notify Rogers
        RogersBrain.pulseThought(`You are now inside the ${moduleId} module.`);
    },

    /* -------------------------------------------------------
       CLOSE PANEL → ZOOM BACK OUT
    ------------------------------------------------------- */
    close() {
        this.panel.style.opacity = "0";
        setTimeout(() => {
            this.panel.style.display = "none";
            this.active = false;
            RogersBrain.sayInline("Exited module.");
        }, 350);
    },

    /* -------------------------------------------------------
       DYNAMIC MODULE CONTENT (PLACEHOLDERS)
       These will be replaced later with real UIs.
    ------------------------------------------------------- */
    getModuleContent(id) {
        switch (id) {

            case "quantum":
                return `<p>The Quantum module will visualize logic pulses, vectors, and idea flow.</p>`;

            case "biotuner":
                return `<p>Biotuner module: sound tools, frequencies, harmonics, and energy tuning.</p>`;

            case "portal":
                return `<p>The Portal module is your Infinity OS core navigation chamber.</p>`;

            case "market":
                return `<p>Marketplace module: item detection, valuation, crosslisting, and Infinity coin logic.</p>`;

            case "hydrogen":
                return `<p>Hydrogen module: time-shells, portal energy, and electron-position models.</p>`;

            case "music":
                return `<p>Music module: synthesis, transcriber tools, and audio capture.</p>`;

            case "socializer":
                return `<p>Socializer module: image posts, AI rewriting, and social flow UI.</p>`;

            default:
                return `<p>Module not found yet. (Placeholder)</p>`;
        }
    }
};


/* -------------------------------------------------------
   AUTO-INIT SPA PANEL
------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => SPA.init());

/* -------------------------------------------------------
   CAT Y COMPLETE — SPA Panel Loader Installed
------------------------------------------------------- */
