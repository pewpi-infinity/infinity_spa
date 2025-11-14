/* -------------------------------------------------------
   CAT Z — INFINITY SPA BOOTLOADER
   Final Integration Layer
------------------------------------------------------- */

window.InfinitySPA = {

    async boot() {
        // 1. Create canvas
        this.injectCanvas();

        // 2. Initialize visualizer engine
        Visualizer.engine.init("visualizerCanvas");

        // 3. Attach controls (drag/zoom)
        Visualizer.Controls.init(Visualizer.engine);

        // 4. Attach node interaction
        Visualizer.NodeInteraction.init(Visualizer.engine);

        // 5. Initialize SPA panel loader
        SPA.init();

        // 6. Initialize Rogers UI
        this.injectRogersUI();

        // 7. Boot banner
        this.bootMessage();

        RogersBrain.pulseThought("Infinity SPA Online.");
    },

    /* -------------------------------------------------------
       Inject the main canvas
    ------------------------------------------------------- */
    injectCanvas() {
        const c = document.createElement("canvas");
        c.id = "visualizerCanvas";
        c.style.position = "fixed";
        c.style.top = "0";
        c.style.left = "0";
        c.style.width = "100%";
        c.style.height = "100%";
        c.style.zIndex = "1";
        document.body.appendChild(c);
    },

    /* -------------------------------------------------------
       Rogers Floating UI Bubble
    ------------------------------------------------------- */
    injectRogersUI() {
        const feed = document.createElement("div");
        feed.id = "rogersFeed";
        feed.style.position = "fixed";
        feed.style.bottom = "20px";
        feed.style.left = "20px";
        feed.style.width = "300px";
        feed.style.maxHeight = "45%";
        feed.style.overflowY = "auto";
        feed.style.background = "rgba(0,0,0,0.5)";
        feed.style.border = "1px solid rgba(255,255,255,0.15)";
        feed.style.borderRadius = "8px";
        feed.style.padding = "10px";
        feed.style.zIndex = "9999";
        feed.style.color = "white";
        feed.style.fontSize = "14px";
        feed.style.backdropFilter = "blur(4px)";
        feed.style.boxShadow = "0 0 12px rgba(0,150,255,0.45)";
        
        document.body.appendChild(feed);

        // Rogers initial greeting
        RogersBrain.sayInline("Rogers online.");
        RogersBrain.pulseThought("Visualizer initialized.");
    },

    /* -------------------------------------------------------
       Boot message overlay
    ------------------------------------------------------- */
    bootMessage() {
        const msg = document.createElement("div");
        msg.id = "bootMsg";
        msg.innerText = "∞ INFINITY OS — INITIALIZING ∞";
        msg.style.position = "fixed";
        msg.style.top = "35%";
        msg.style.width = "100%";
        msg.style.textAlign = "center";
        msg.style.fontSize = "32px";
        msg.style.fontWeight = "bold";
        msg.style.zIndex = "9000";
        msg.style.color = "#1e90ff";
        msg.style.textShadow = "0 0 20px #1e90ff";

        document.body.appendChild(msg);

        setTimeout(() => {
            msg.style.transition = "opacity 1.2s ease";
            msg.style.opacity = "0";
        }, 1500);

        setTimeout(() => {
            msg.remove();
        }, 2800);
    }
};


/* -------------------------------------------------------
   AUTO-BOOT ON PAGE LOAD
------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    InfinitySPA.boot();
});

/* -------------------------------------------------------
   CAT Z COMPLETE — Infinity OS is now ALIVE
------------------------------------------------------- */
