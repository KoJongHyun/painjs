const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('color');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const INITIAL_WIDTH = 700;
const INITIAL_HEIGHT = 700;

let painting = false;
let filling = false;
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, INITIAL_WIDTH, INITIAL_HEIGHT);
ctx.stokeStyle = '#2c2c2c;'
ctx.lineWidth = 2.5;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function handleColorClick(event) {
  const getColor = event.target.style.background;
  ctx.strokeStyle = getColor;
  ctx.fillStyle = getColor;
}

function handleLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeChange(event) {
  if (!filling) {
    event.target.innerText = 'paint';
    filling = true;
  } else {
    event.target.innerText = 'filling';
    filling = false;
  }
}

function handleFillClick() {
  if (filling) {
    ctx.fillRect(0, 0, INITIAL_WIDTH, INITIAL_HEIGHT);
  }
}

function handleSaveClick() {
  const link = document.createElement('a');
  const image = canvas.toDataURL('image/png');
  link.href = image;
  link.download = 'paintJS';
  link.click();
}

function handleMouseMove(event) {
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

if (canvas) {
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleFillClick);
}

if (colors) {
  Array.from(colors).forEach(colors => {
    colors.addEventListener('click', handleColorClick)
  });
}

if (range) {
  range.addEventListener('change', handleLineWidth);
}

if (mode) {
  mode.addEventListener('click', handleModeChange);
}

if (save) {
  save.addEventListener('click', handleSaveClick);
}