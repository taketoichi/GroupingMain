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
//const canvas = document.getElementById('whiteboard');
//const ctx = canvas.getContext('2d');

//let drawing = false;

//function getPosition(e) {
//    const rect = canvas.getBoundingClientRect();
  //  if (e.touches) {
    //    // タッチイベントの場合
      //  return {
        //    x: e.touches[0].clientX - rect.left,
          //  y: e.touches[0].clientY - rect.top
//        };
//    } else {
//        // マウスイベントの場合
//        return {
//            x: e.clientX - rect.left,
//            y: e.clientY - rect.top
//        };
//    }
//}

//function startPosition(e) {
//    drawing = true;
//    const pos = getPosition(e);
//    ctx.moveTo(pos.x, pos.y);
//    ctx.beginPath();
//}

//function endPosition() {
//    drawing = false;
//}

//function draw(e) {
//    if (!drawing) return;
//    const pos = getPosition(e);
//    ctx.lineTo(pos.x, pos.y);
//    ctx.lineWidth = 3;
//    ctx.lineCap = 'round';
//    ctx.strokeStyle = 'black';
//    ctx.stroke();
//}

//canvas.addEventListener('mousedown', startPosition);
//canvas.addEventListener('mouseup', endPosition);
//canvas.addEventListener('mousemove', draw);
//canvas.addEventListener('touchstart', startPosition);
//canvas.addEventListener('touchend', endPosition);
//canvas.addEventListener('touchmove', draw);

//ポップアップウィンドウ
document.getElementById('saveBtn').addEventListener('click', function() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard.png';
    link.click();
});

function showPopup(id) {
  var popup = document.getElementById(id);
  popup.style.display = 'block';
}

function hidePopup(id) {
  var popup = document.getElementById(id);
  popup.style.display = 'none';
}

// ポップアップ外をクリックしたときのイベントリスナー
document.querySelectorAll('.popup-image').forEach(item => {
  item.addEventListener('click', function(event) {
    event.stopPropagation(); // イベントの伝播を防止
  });
});

window.addEventListener('click', function(event) {
  if (event.target.classList.contains('popup')) {
    hidePopup(event.target.id);
  }
});
