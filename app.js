const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const jsColor1 = document.getElementById("jsColor1");

const INITIAL_COLOR = "#2c2c2c";
const INITIAL_CANVAS_SIZE = 500;

canvas.width = INITIAL_CANVAS_SIZE;
canvas.height = INITIAL_CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, INITIAL_CANVAS_SIZE, INITIAL_CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;

let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  jsColor1.style.backgroundColor = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function modeChange(event) {
  if (filling == false) {
    filling = true;
    mode.innerText = "paint";
    ctx.fillStyle = ctx.strokeStyle;
  } else {
    filling = false;
    mode.innerText = "fill";
  }
}

function handleCanvasClick(evetn) {
  if (filling) {
    ctx.fillRect(0, 0, INITIAL_CANVAS_SIZE, INITIAL_CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function saveImage(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[❤️]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", modeChange);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveImage);
}
