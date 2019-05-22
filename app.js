const jsCanvas = document.getElementById('js-paint');
const ctx = jsCanvas.getContext('2d');
let painting = false;

jsCanvas.style.width = '700px';
jsCanvas.style.height = '700px';
ctx.strokeStyle = '#2c2c2c';

const stopPainting = () => {
    painting = false;
}

const startPainting = () => {
    painting = true;
}

const onMouseMove = (event) => {
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

jsCanvas.addEventListener('mousemove', onMouseMove);
jsCanvas.addEventListener('mousedown', startPainting);
jsCanvas.addEventListener('mouseup', stopPainting);
jsCanvas.addEventListener('mouseleave', stopPainting);