const GAME_BACKGROUND_COLOR = 'black';
const GAME_BORDER_COLOR = 'red';
const OBJECTS_COLOR = 'white';

let upArrow = 38, downArrow = 40;
let keystate;
let player = {
    x: null,
    y: null,
    width: 10,
    height:120,

    update: function () {
        if(keystate[upArrow]){
            this.y -= 7;
        }
        if(keystate[downArrow]){
            this.y += 7;
        }
    },
    draw: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
};
let ai = {
    x: null,
    y: null,
    width: 10,
    height:120,

    update: function () { },
    draw: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
};
let ball = {
    x: null,
    y: null,
    side: 10,
    speed: 5,
    update: function () {
        this.x += this.vel.x;
        this.y += this.vel.y;
    },
    draw: function() {
        ctx.fillRect(this.x, this.y, this.side, this.side);
    },
};

function startGame() {
    let gameCanvas = document.getElementById('gameCanvas');
    let ctx = gameCanvas.getContext('2d');
    ctx.fillStyle = GAME_BACKGROUND_COLOR;
    ctx.strokestyle = GAME_BORDER_COLOR;
    keystate = {};
    document.addEventListener('keydown', function(evt) {
        keystate[evt.keyCode] = true;
    });

    document.addEventListener('keyup', function(evt) {
        delete keystate[evt.keyCode]
    });
    init();
    var loop = function(){
        update();
        draw();
        window.requestAnimationFrame(loop,gameCanvas);
    };
    window.requestAnimationFrame(loop, gameCanvas);
}

function init() {
    player.x = player.width;
    player.y = (gameCanvas.height - player.height)/2;

    ai.x = gameCanvas.width - (player.width+ ai.width);
    ai.y = (gameCanvas.height - ai.height)/2;

    ball.x = (gameCanvas.width - ball.side)/2;
    ball.y = (gameCanvas.height - ball.side)/2;    

    ball.vel = {
        x: 0,
        y: ball.speed
    }
}

function update() {
    ball.update();
    player.update();
    ai.update();
}

function draw() {
    ctx.fillRect(0,0,gameCanvas.width,gameCanvas.height);
    ctx.save();
    ctx.fillStyle = '#fff';

    ball.draw();
    player.draw();
    ai.draw();

    let w = 4;
    let x = (gameCanvas.width - w)*0.5;
    let y = 0;
    let step = gameCanvas.height/15;
    while (y< gameCanvas.height) {
        ctx.fillRect(x,y+step*0.25,w,stop*0.5);
    }
    ctx.restore();
}

startGame();