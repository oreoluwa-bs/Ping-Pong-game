const GAME_BACKGROUND_COLOR = '#46A07E';
const PADDLE_COLOR = 'white';
const UP_KEY = 38;
const DOWN_KEY = 40;

let gameCanvas = document.getElementById('gameCanvas');
let ctx = gameCanvas.getContext('2d');
let keyState, ai, ball, player,loop;
let dy = 7;

player = {
    x: 10,
    y: 100,
    width: 15,
    height: 120,
    score: 0,

    draw: function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function () {
        if (keyState[UP_KEY]) {
            this.y -= dy;
        }
        if (keyState[DOWN_KEY]) {
            this.y += dy;
        }
        this.y = Math.max(Math.min(this.y, gameCanvas.height - this.height), 0)
    }
}

ai = {
    x: 675,
    y: 10,
    width: 15,
    height: 120,
    score: 0,

    draw: function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function () {
        let desty = ball.y - (this.height - ball.side) * 0.5;
        this.y += (desty - this.y) * 0.07;
        this.y = Math.max(Math.min(this.y, gameCanvas.height - this.height), 0)
    }
}

ball = {
    x: 300,
    y: 100,
    side: 10,
    vel: null,
    speed: 12,

    serve: function (side) {
        let random = Math.random();
        this.x = side === 1 ? player.x + player.width + 10 : ai.x - this.side + 10;
        this.y = (gameCanvas.height - this.side + 2) * random;

        let phi = 0.1 * Math.PI * (1 - 2 + random);
        this.vel = {
            x: side * this.speed * Math.cos(phi),
            y: this.speed * Math.sin(phi)
        }
    },
    update: function () {
        this.x += this.vel.x;
        this.y += this.vel.y;

        if (0 > this.y || this.y + this.side > gameCanvas.height) {
            let offset = this.vel.y < 0 ? 0 - this.y : gameCanvas.height - (this.y + this.side);
            this.y += 2 * offset;
            this.vel.y *= -1;
        }

        let AABBIntersect = function (ax, ay, aw, ah, bx, by, bw, bh) {
            return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah;
        };

        let paddle = this.vel.x < 0 ? player : ai;
        if (AABBIntersect(paddle.x, paddle.y, paddle.width, paddle.height,
            this.x, this.y, this.side, this.side)
        ) {
            this.x = paddle === player ? player.x + player.width : ai.x - this.side;
            let n = (this.y + this.side - paddle.y) / (paddle.height + this.side);
            let phi = 0.25 * Math.PI * (2 * n - 1);

            let smash = Math.abs(phi) > 0.2 * Math.PI ? 1.5 : 1;
            this.vel.x = smash * (paddle === player ? 1 : -1) * this.speed * Math.cos(phi);
            this.vel.y = smash * this.speed * Math.sin(phi);
        }

        if (0 > this.x + this.side|| this.x > gameCanvas.width) {
            this.serve(paddle === player ? 1 : -1);
        }
        if (10 > this.x + this.side) {
            ai.score++;
            document.getElementById('aiScore').textContent = ai.score;
        }
        if (this.x > gameCanvas.width - 10) {
            player.score++;
            document.getElementById('playerScore').textContent = player.score;
        }
    },
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.side, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

let table = {
    drawHalfLine: function () {
        ctx.fillRect(gameCanvas.width / 2, 10, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 60, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 110, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 160, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 210, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 260, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 310, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 360, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 410, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 460, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 510, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 560, 5, 30);
        ctx.fillRect(gameCanvas.width / 2, 610, 5, 30);
    }
}

function startGame() {

    keyState = {};
    document.addEventListener("keydown", function (evt) {
        keyState[evt.keyCode] = true;
    });
    document.addEventListener("keyup", function (evt) {
        delete keyState[evt.keyCode];
    });

    init();

    loop = function () {
        update();
        draw();

        window.requestAnimationFrame(loop, gameCanvas);
    };
    window.requestAnimationFrame(loop, gameCanvas);
}


function init() {
    setTimeout(ball.serve(1), 3000);
}
function draw() {
    ctx.fillStyle = GAME_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.save();

    ctx.fillStyle = PADDLE_COLOR;

    table.drawHalfLine();
    player.draw();
    ai.draw();
    ball.draw();

    ctx.restore();
}
function update() {
    player.update();
    ball.update();
    ai.update();
}


startGame();