const GAME_BACKGROUND_COLOR = '#46A07E';
const PADDLE_COLOR = 'white';
const up_key = 38;
const down_key = 40;

let gameCanvas = document.getElementById('gameCanvas');
let ctx = gameCanvas.getContext('2d');
let keyState, ai, ball, player;
let dy = 10;

player = {
    x: null,
    y: null,
    width: 10,
    height: 120,

    draw: function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function (){
        
        if (keyState[up_key]) {
            this.y -= 7;
        }
        if (keyState[down_key]) {
            this.y += 7;
        }
    }
}

ai = {
    x: null,
    y: null,
    width: 10,
    height: 120,

    draw: function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    update: function (){}
}

ball = {
    x: 300,
    y: 100,
    side: 7.5,
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.side, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    },
    update: function (){}
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
    document.addEventListener('keydown', function(evt) {
        keyState[evt.keyCode] = true;
    });

    document.addEventListener('keyup', function(evt) {
        delete keyState[evt.keyCode];
    });

    init();
    
    let loop = function(){
        update();
        draw();

        window.requestAnimationFrame(loop, gameCanvas);
    };
    window.requestAnimationFrame(loop, gameCanvas);
}


function init() {
    ctx.fillStyle = GAME_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}
function draw() {
  
    
    ctx.save();
    ctx.fillStyle = PADDLE_COLOR;

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