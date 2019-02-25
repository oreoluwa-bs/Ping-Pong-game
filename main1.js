const GAME_BACKGROUND_COLOR = 'black';
const GAME_BORDER_COLOR = 'red';
const PADDLE_COLOR = 'white';
const up_key = 38;
const down_key = 40;


let dx = 0;
let dy = 10;
let scoreOne = 0;
let scoreTwo = 0;
let interval;

let gameCanvas = document.getElementById('gameCanvas');
let ctx = gameCanvas.getContext('2d');

ctx.fillStyle = GAME_BACKGROUND_COLOR;
ctx.strokestyle = GAME_BORDER_COLOR;

ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

let paddlePlayerOne = [
    { x: 10, y: 200 }
];

let paddlePlayerTwo = [
    { x: 680, y: 200 }
];

let ball = [{ x: 250, y: 250 }];


const hitLeftWall = ball[0].x == 20;
const hitRightWall = ball[0].x == gameCanvas.width - 20;

function drawPaddlePart(paddlePart) {
    ctx.fillStyle = PADDLE_COLOR;
    ctx.fillRect(paddlePart.x, paddlePart.y, 10, 120);
}

function drawPaddles() {
    paddlePlayerOne.forEach(drawPaddlePart);
    paddlePlayerTwo.forEach(drawPaddlePart);
}
function drawBallShape(ballShape) {
    ctx.beginPath();
    ctx.arc(ballShape.x, ballShape.y, 5, 2 * Math.PI, false);
    ctx.fillStyle = PADDLE_COLOR;
    ctx.fill();
}
function drawBall() {
    ball.forEach(drawBallShape);
}

function drawHalfLine() {
    ctx.fillStyle = PADDLE_COLOR;
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

eachMove();
drawBall();
drawPaddles();
drawHalfLine();
document.addEventListener('keydown', changeDirection);

function movePaddleOne(evt) {
    let topOne = { x: paddlePlayerOne[0].x, y: paddlePlayerOne[0].y + dy };

    if (evt.keyCode === up_key || evt.keyCode === down_key) {
        topOne = { x: paddlePlayerOne[0].x, y: paddlePlayerOne[0].y + dy };
    }

    paddlePlayerOne.unshift(topOne);
    paddlePlayerOne.pop();
}
function movePaddleTwo() {
    const topTwo = { x: paddlePlayerTwo[0].x + dx, y: paddlePlayerTwo[0].y + dy };
    paddlePlayerTwo.unshift(topTwo);

    paddlePlayerTwo.pop();
}
function moveBall() {
    const ballShape = { x: ball[0].x - 10, y: ball[0].y };
    ball.unshift(ballShape);
    ball.pop();
}

function eachMove() {
        setTimeout(function onTick() {
        clearCanvas();
        drawHalfLine();
        drawBall();
        moveBall();
        document.addEventListener('keydown', movePaddleOne);
        movePaddleTwo();
        drawPaddles();
        
        eachMove();
    }, 100);
}
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.strokestyle = 'red';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    if (keyPressed === down_key && goingUp) {
        dy = 10;
    }
    if (keyPressed === up_key && goingDown) {
        dy = -10;
    }
}


/*
function gameEnds() {
} 


 function ifWin() {
   
    if (hitLeftWall) {
        scoreOne++;
        console.log(`Score One: ${scoreOne}`);
        if (scoreOne >= 7) {
        }
    }
    if (hitRightWall) {
        scoreTwo++;
        console.log(`Score Two: ${scoreTwo}`);
        if (scoreTwo >= 7) {
        }
    }
function didGameEnd() {
    if((scoreOne > 8) || (scoreTwo > 8)){
        if(scoreOne == 7){
            console.log("player wins");
        }else if(scoreTwo == 7){
            console.log("computer wins");
        }
        return true;
    }
    return false;
}


}function changeBallDirection() {
    let ballDirection = { x: ball[0].x, y: ball[0].y + dy };
    if(hitLeftWall){
        ballDirection = {x: ballDirection[0].x+10, y:ballDirection[0]};
    }
    if(hitRightWall){
        ballDirection = {x: ballDirection[0].x-10, y:ballDirection[0]};
    }
}
setInterval(ifWin(),100); */

