const items = document.querySelectorAll('.float'); // Select all floating elements

// Initialize positions and speeds
items.forEach(el => {
    el.style.left = Math.random() * (window.innerWidth - el.offsetWidth) + 'px';
    el.style.top = Math.random() * (window.innerHeight - el.offsetHeight) + 'px';
});
// Random speeds for each item
const speeds = Array.from(items).map(() => ({
    x: (Math.random() - 0.5) * 1,
    y: (Math.random() - 0.5) * 1
}));
// Animation loop
function update() {
    items.forEach((el, i) => {
        let left = parseFloat(el.style.left);
        let top = parseFloat(el.style.top);
// Update positions
        left += speeds[i].x;
        top += speeds[i].y;
// Bounce off walls
        if (left <= 0 || left >= window.innerWidth - el.offsetWidth) {
            speeds[i].x *= -1;
        }
        if (top <= 0 || top >= window.innerHeight - el.offsetHeight) {
            speeds[i].y *= -1;
        }
// Apply new positions
        el.style.left = left + 'px';
        el.style.top = top + 'px';
    });
// Request next frame
    requestAnimationFrame(update);
}
// Start animation
update();