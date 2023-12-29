document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in-top");
        observer.unobserve(entry.target); // Stop observing after the animation
      }
    });
  }, { threshold: 0.5 }); // Adjust this value based on when you want the animation to start

  document.querySelectorAll('img').forEach(img => {
    img.classList.add('fade-out'); // Initially set images to be invisible
    observer.observe(img);
  });
});

//キャンバスエリア
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let drawing = false;

function startPosition(e) {
    drawing = true;
    draw(e); // Begin the drawing path
}

function endPosition() {
    drawing = false;
    ctx.beginPath(); // Begin a new path to avoid connecting lines
}

function draw(e) {
    if (!drawing) return; // Only draw when the mouse is pressed
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('saveBtn').addEventListener('click', function() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'whiteboard.png'; // Set the file name for the download
  link.click();
});
