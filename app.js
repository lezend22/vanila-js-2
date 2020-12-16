const canvas = document.getElementById("jsCanvas");
let painting = false;
const context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
context.lineWidth = 2.5;
context.strokeStyle = "#2c2c2c";

/*context.moveTo(x1, y1);
context.lineTo(x2, y2);
context.stroke();
context.closePath();*/

function startPainting() {
  painting = true;
}

function falsePainting() {
  painting = false;
}

function onMouseEnter(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //finds where to start
    context.beginPath();
    context.moveTo(x, y);
  } else {
    //when mouseclicks
    context.lineTo(x, y);
    context.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseEnter);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", falsePainting);
  canvas.addEventListener("mouseleave", falsePainting);
}
