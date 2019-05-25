const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('color');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const INITIAL_SIZE = 700;
const INITIAL_COLOR = '#2c2c2c';
let painting = false;
let filling = false;

ctx.lineWidth = 2.5;
ctx.width = INITIAL_SIZE;
ctx.height = INITIAL_SIZE;
ctx.strokeStyle = '#2c2c2c';
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, ctx.width, ctx.height);

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
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

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleChangeRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (!filling) {
    filling = true;
    mode.innerText = 'Paint';
  } else {
    filling = false;
    mode.innerText = 'Fill';
  }
}

function handleFillClick() {
  if (filling) {
    ctx.fillRect(0, 0, ctx.width, ctx.height);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');

  link.href = image;
  link.download = 'painted';
  link.click();
}

function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleFillClick);
  canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('change', handleChangeRange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (save) {
  save.addEventListener('click', handleSaveClick);
}