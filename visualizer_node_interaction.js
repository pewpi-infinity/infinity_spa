/* -------------------------------------------------------
   CAT X — NODE CLICK + MODULE LOADER ENGINE
   Infinity OS SPA v1.0
------------------------------------------------------- */

if (!window.Visualizer) window.Visualizer = {};

window.Visualizer.NodeInteraction = {

    engine: null,

    init(engine) {
        this.engine = engine;
        const canvas = engine.canvas;

        canvas.addEventListener("click", (e) => {
            this.handleClick(e);
        });
    },

    /* -------------------------------------------------------
       Convert click coords → canvas coords
    ------------------------------------------------------- */
    getCanvasPos(e) {
        const rect = this.engine.canvas.getBoundingClientRect();

        // Screen → canvas → world transform
        let x = (e.clientX - rect.left - this.engine.width / 2) /
                this.engine.camera.zoom + this.engine.camera.x;

        let y = (e.clientY - rect.top - this.engine.height / 2) /
                this.engine.camera.zoom + this.engine.camera.y;

        return { x, y };
    },

    /* -------------------------------------------------------
       CLICK HANDLER: detect which node was hit
    ------------------------------------------------------- */
    handleClick(e) {
        const pos = this.getCanvasPos(e);

        for (let node of this.engine.nodes) {
            const dx = pos.x - node.x;
            const dy = pos.y - node.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist <= node.size + 10) {
                this.activateNode(node);
                return;
            }
        }
    },

    /* -------------------------------------------------------
       NODE ACTIVATION:
       - Zoom camera
       - Pulse animation
       - Trigger SPA loader
       - Tell Rogers
    ------------------------------------------------------- */
    activateNode(node) {
        const eng = this.engine;

        // Focus node
        eng.setFocusedNode(node.id);

        // Pulse
        eng.triggerPulse();

        // Rogers gets event
        RogersSync.nodeFocused(node.id);
        RogersBrain.sayInline(`Opening ${node.id}…`);

        // Smooth camera zoom
        this.animateCamera(node);

        // Load SPA panel
        document.dispatchEvent(
            new CustomEvent("app_loaded", { detail: node.id })
        );

        // Ask follow-up
        RogersBrain.askUser(`What would you like to do inside ${node.id}?`);
    },

    /* -------------------------------------------------------
       CAMERA ANIMATION TO NODE
    ------------------------------------------------------- */
    animateCamera(node) {
        const eng = this.engine;

        let frames = 60;
        let startX = eng.camera.x;
        let startY = eng.camera.y;
        let startZoom = eng.camera.zoom;

        let endX = node.x;
        let endY = node.y;
        let endZoom = 1.25;

        function animate() {
            if (frames <= 0) return;

            eng.camera.x += (endX - eng.camera.x) * 0.08;
            eng.camera.y += (endY - eng.camera.y) * 0.08;
            eng.camera.zoom += (endZoom - eng.camera.zoom) * 0.08;

            frames--;
            requestAnimationFrame(animate);
        }

        animate();
    }
};

/* -------------------------------------------------------
   AUTO-INIT ON LOAD
------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    if (window.Visualizer.engine) {
        Visualizer.NodeInteraction.init(Visualizer.engine);
    }
});

/* -------------------------------------------------------
   CAT X COMPLETE — Node Interaction Enabled
------------------------------------------------------- */
