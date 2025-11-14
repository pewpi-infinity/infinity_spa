/* -------------------------------------------------------
   CAT V — QUANTUM VISUALIZER ENGINE
   Infinity OS SPA v1.0
------------------------------------------------------- */

window.Visualizer = window.Visualizer || {};

window.Visualizer.engine = {

    /* -------------------------------------------------------
       ENGINE STATE
    ------------------------------------------------------- */
    canvas: null,
    ctx: null,
    nodes: [],
    vectors: [],
    camera: { x: 0, y: 0, zoom: 1 },
    focusedNode: null,
    pulseStrength: 0,
    sensoryMode: "wave",
    autopilot: false,
    fieldTint: "neutral",
    style: "grid",    // default style for toggle
    width: 0,
    height: 0,

    /* -------------------------------------------------------
       INITIALIZE ENGINE
    ------------------------------------------------------- */
    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.resize();

        // Handle window resizing
        window.addEventListener("resize", () => this.resize());

        // Build initial node layout
        this.createNodes();

        // Start render loop
        requestAnimationFrame(() => this.render());
    },

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    },

    /* -------------------------------------------------------
       CREATE INITIAL NODES
    ------------------------------------------------------- */
    createNodes() {
        const names = [
            "quantum", "biotuner", "portal",
            "market", "hydrogen", "socializer",
            "music"
        ];

        let angle = 0;
        const radius = 200;

        this.nodes = names.map(name => {
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            angle += (Math.PI * 2) / names.length;

            return {
                id: name,
                x,
                y,
                size: 18,
                glow: 0
            };
        });
    },

    /* -------------------------------------------------------
       SET FOCUSED NODE
    ------------------------------------------------------- */
    setFocusedNode(id) {
        this.focusedNode = id;

        for (let node of this.nodes) {
            node.glow = node.id === id ? 1 : 0;
        }
    },

    /* -------------------------------------------------------
       SENSORY VISUAL STYLE
    ------------------------------------------------------- */
    updateVisualStyle(mode) {
        this.sensoryMode = mode;
    },

    /* -------------------------------------------------------
       APPLY FIELD TINTS (GOOD VS BAD PATH)
    ------------------------------------------------------- */
    applyFieldTint() {
        // Tint applied inside render loop
    },

    /* -------------------------------------------------------
       AUTOPILOT MOVEMENT
    ------------------------------------------------------- */
    autopilotMove() {
        if (!this.autopilot || !this.focusedNode) return;

        const node = this.nodes.find(n => n.id === this.focusedNode);
        if (!node) return;

        // Move camera slowly toward the node
        this.camera.x += (node.x - this.camera.x) * 0.02;
        this.camera.y += (node.y - this.camera.y) * 0.02;
    },

    /* -------------------------------------------------------
       PULSE EFFECT
    ------------------------------------------------------- */
    triggerPulse() {
        this.pulseStrength = 1;
    },

    decayPulse() {
        this.pulseStrength *= 0.92;
    },

    /* -------------------------------------------------------
       RENDER LOOP
    ------------------------------------------------------- */
    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        ctx.save();
        ctx.translate(this.width / 2, this.height / 2);
        ctx.scale(this.camera.zoom, this.camera.zoom);
        ctx.translate(-this.camera.x, -this.camera.y);

        // Apply tint
        if (this.fieldTint === "red") ctx.fillStyle = "rgba(255, 0, 0, 0.05)";
        else if (this.fieldTint === "blue") ctx.fillStyle = "rgba(0, 120, 255, 0.05)";
        else ctx.fillStyle = "rgba(255, 255, 255, 0.03)";

        ctx.fillRect(-2000, -2000, 4000, 4000);

        // Draw vectors
        this.drawVectors();

        // Draw nodes
        this.drawNodes();

        ctx.restore();

        // Engine behaviors
        this.autopilotMove();
        this.decayPulse();

        requestAnimationFrame(() => this.render());
    },

    /* -------------------------------------------------------
       DRAW NODES
    ------------------------------------------------------- */
    drawNodes() {
        const ctx = this.ctx;

        for (let node of this.nodes) {
            const glow = node.glow ? 15 * this.pulseStrength + 5 : 0;

            // Glow ring
            if (glow > 0) {
                ctx.beginPath();
                ctx.arc(
                    node.x,
                    node.y,
                    node.size + glow,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = "rgba(0, 150, 255, 0.25)";
                ctx.fill();
            }

            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = "#1e90ff";
            ctx.fill();

            // Label
            ctx.fillStyle = "white";
            ctx.font = "14px sans-serif";
            ctx.fillText(node.id, node.x - node.size, node.y - node.size - 5);
        }
    },

    /* -------------------------------------------------------
       DRAW VECTORS BETWEEN NODES
    ------------------------------------------------------- */
    drawVectors() {
        const ctx = this.ctx;

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,255,255,0.18)";

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const a = this.nodes[i];
                const b = this.nodes[j];

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }
};


/* -------------------------------------------------------
   CAT V COMPLETE — Full Visualizer Engine Installed
------------------------------------------------------- */
