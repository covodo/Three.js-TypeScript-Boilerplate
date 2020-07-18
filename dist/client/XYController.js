export default class XYController {
    constructor(canvas, onChangeCallback) {
        this.coords = { x: 0, y: 0 };
        this.value = { x: 0, y: 0 };
        this.buttonSize = { x: 0, y: 0 };
        canvas.style.display = "block";
        this.onChangeCallback = onChangeCallback;
        this.canvas = canvas;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.coords = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
        this.buttonSize = { x: this.canvas.width / 10, y: this.canvas.height / 10 };
        this.update();
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.coords.x = e.touches[0].screenX - this.canvas.offsetLeft;
            this.coords.y = e.touches[0].screenY - this.canvas.offsetTop;
        });
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.coords.x = this.canvas.width / 2;
            this.coords.y = this.canvas.height / 2;
        });
        this.canvas.addEventListener('mousemove', (e) => {
            if (e.which === 1) {
                this.coords.x = e.pageX - this.canvas.offsetLeft;
                this.coords.y = e.pageY - this.canvas.offsetTop;
            }
        });
        this.canvas.addEventListener('mouseup', (e) => {
            if (e.which === 1) {
                this.coords.x = this.canvas.clientWidth / 2;
                this.coords.y = this.canvas.clientHeight / 2;
            }
        });
        setInterval(() => {
            this.update();
        }, 20);
    }
    update() {
        this.value.x = ((this.canvas.clientWidth / 2) - this.coords.x) / this.canvas.clientWidth * 2;
        this.value.y = ((this.canvas.clientHeight / 2) - this.coords.y) / this.canvas.clientWidth * 2;
        this.onChangeCallback(this.value);
        const ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(this.coords.x - this.buttonSize.x / 2, this.coords.y - this.buttonSize.y / 2, this.buttonSize.x, this.buttonSize.y);
    }
}
