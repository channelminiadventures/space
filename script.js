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
    // Super dense particle system
    const numParticles = Math.floor(window.innerWidth / 12); 
    
    for (let i = 0; i < numParticles; i++) {
        // 60% dust, 40% glowing spores
        const type = Math.random() > 0.4 ? 'dust' : 'spore';
        const isCyan = Math.random() > 0.4; // 60% chance for cyan spores
        
        particles.push({
            type: type,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: type === 'spore' ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5,
            speedX: type === 'spore' ? (Math.random() - 0.5) * 0.6 : (Math.random() - 0.5) * 0.2,
            speedY: type === 'spore' ? (Math.random() * -0.8 - 0.2) : (Math.random() * -0.3 - 0.1), // Both drift upwards mostly
            baseOpacity: type === 'spore' ? Math.random() * 0.6 + 0.3 : Math.random() * 0.4 + 0.1,
            opacity: 0,
            pulseSpeed: Math.random() * 0.03 + 0.01,
            angle: Math.random() * Math.PI * 2,
            color: type === 'spore' ? (isCyan ? '0, 229, 255' : '255, 255, 255') : '255, 255, 255'
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            
            // Twinkling effect
            p.angle += p.pulseSpeed;
            p.opacity = p.baseOpacity + Math.sin(p.angle) * 0.2;
            if (p.opacity < 0) p.opacity = 0;
            
            // Glow effect for spores
            if (p.type === 'spore') {
                ctx.shadowBlur = 15;
                ctx.shadowColor = `rgba(${p.color}, ${p.opacity})`;
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Wavy organic movement for spores
            if (p.type === 'spore') {
                p.x += p.speedX + Math.sin(p.angle) * 0.5;
            } else {
                p.x += p.speedX;
            }
            p.y += p.speedY;
            
            // Wrap around edges seamlessly
            if (p.y < -10) {
                p.y = canvas.height + 10;
                p.x = Math.random() * canvas.width;
            }
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
        }
        requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
});
