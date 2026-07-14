// ==========================================
// PARTICLE ENGINE (Dust / Stars)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to fill the background
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles = [];
    // Adjust number of particles based on screen size (increased density)
    const numParticles = Math.floor(window.innerWidth / 30); 
    
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 1.5, // Slightly larger
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * -0.5 - 0.2,
            opacity: Math.random() * 0.6 + 0.3 // More opaque
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Wrap around top -> bottom
            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }
            // Wrap around horizontal edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
        }
        requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
});
