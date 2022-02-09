const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const eraser = document.getElementById("eraser");

const INITIAL_COLOR = "rgb(19, 16, 16)";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 초기 캔버스 색 지정, 캔버스에서는 위에서부터 아래로 적용됨(위에 영향이 가지 않음)

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 1.0;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;
let erasing = false; // 지우개 설정

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function colorChanging(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  erasing = false;
  ctx.globalCompositeOperation = "source-over";
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function changingMode() {
  if (filling === false) {
    //true이므로 조건 실행, fill 모드
    filling = true;
    mode.innerText = "Paint";
  } else {
    filling = false;
    mode.innerText = "Fill";
  }
}

function fillingCanvas() {
  if (filling & !erasing) {
    // erasing === false일 때 적용
    // 둘 다 true이므로 조건 실행
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function savingImage() {
  const URL = canvas.toDataURL("image / png");
  const link = document.createElement("a");
  link.download = "My image";
  link.href = URL;
  link.click();
}

function eraserClick() {
  // 지우개 적용
  if (erasing === false) {
    erasing = true;
    ctx.globalCompositeOperation = "destination-out";
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("click", fillingCanvas);
}

if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", colorChanging)
  );
}

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", changingMode);
}

if (save) {
  save.addEventListener("click", savingImage);
}

if (eraser) {
  eraser.addEventListener("click", eraserClick);
}
