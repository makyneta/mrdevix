/* =============================================
   MR DEVIX — Particles
   particles.js
   Made by Makyneta Unipessoal, Lda.
   ============================================= */

(function () {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    const COLORS = ['#a78bfa', '#f472b6', '#fbbf24', '#818cf8', '#e879f9'];
    const COUNT  = 55;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createParticle() {
        return {
            x:       randomBetween(0, canvas.width),
            y:       randomBetween(0, canvas.height),
            r:       randomBetween(0.6, 2.2),
            vx:      randomBetween(-0.15, 0.15),
            vy:      randomBetween(-0.25, -0.08),
            alpha:   randomBetween(0.2, 0.7),
            color:   COLORS[Math.floor(Math.random() * COLORS.length)],
            flicker: randomBetween(0.002, 0.006),
            phase:   randomBetween(0, Math.PI * 2),
        };
    }

    function init() {
        particles = [];
        for (let i = 0; i < COUNT; i++) particles.push(createParticle());
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x    += p.vx;
            p.y    += p.vy;
            p.phase += p.flicker;

            const alphaNow = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alphaNow;
            ctx.fill();
            ctx.globalAlpha = 1;

            /* recicla partícula ao sair pelo topo */
            if (p.y < -10) {
                p.y = canvas.height + 10;
                p.x = randomBetween(0, canvas.width);
            }
            if (p.x < -10 || p.x > canvas.width + 10) {
                p.x = randomBetween(0, canvas.width);
            }
        });

        animFrame = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animFrame);
        resize();
        init();
        draw();
    });
})();
