const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INIT_COLOR = "#2c2c2c";

let filling = false;
let painting = false;
canvas.width = 600;
canvas.height = 600;
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.lineWidth = 2.5;
context.strokeStyle = INIT_COLOR;
context.fillStyle = INIT_COLOR; //init color when starts it

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
  context.fillStyle = color;
}

function handleRange(event) {
  //input event so value keeps changing
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

function handleCanvas() {
  if (filling) {
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleRightClick(event) {
  event.preventDefault(); //func directs to event so used event as argument
}

function handleSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a"); //a tag created
  link.href = image; //href set
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseEnter);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", falsePainting);
  canvas.addEventListener("mouseleave", falsePainting);
  canvas.addEventListener("click", handleCanvas);
  canvas.addEventListener("contextmenu", handleRightClick);
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

if (save) {
  save.addEventListener("click", handleSave);
}
