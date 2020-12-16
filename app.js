const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

let filling = false;
let painting = false;
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

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
}

function handleRange(event) {
  const range = event.target.value;
  context.lineWidth = range;
}

function handleMode() {
  if (filling == false) {
    filling = true;
    mode.innerText = "PAINT";
  } else {
    filling = false;
    mode.innerText = "FILL";
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseEnter);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", falsePainting);
  canvas.addEventListener("mouseleave", falsePainting);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColor)
);

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", handleMode);
}
