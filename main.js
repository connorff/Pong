window.onload = function () {
    setInterval(draw, 17);
}

let canvas = document.getElementById("canvas")

canvas.width = window.innerWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete
let canvasW = canvas.width;
let canvasH = canvas.height;
let ctx = canvas.getContext("2d")
    
//set size of paddle (height, width)
let paddleSize = [canvasH / 3, canvasW / 20]

//sets position of the ball
let ball = [canvasW / 2, canvasH / 2];

//sets the position of the paddles (x, y)
let paddle1 = [canvasW / 50, canvasH / 2 - (paddleSize[0] / 2)];
let paddle2 = [canvasW * (48/50), canvasH / 2 - (paddleSize[0] / 2)];

//sets the trajectory of the ball
let traj = Math.floor(Math.random() * 3);

switch (traj){
    case 0:
        traj = [-10, -10];
        break;
    case 1:
        traj = [-10, 10];
        break;
    case 2:
        traj = [10, -10];
        break;
    case 3:
        traj = [10, 10];
        break;
}

//manages keyboard events

document.onkeydown = function (e) {
    switch(e.keyCode) {
        //when up arrow is pressed
        case 38:
            paddle2[1] -= 30;
            break;
        
        //when down arrow is pressed
        case 40:
            paddle2[1] += 30;
            break;
            
        //when w is pressed
        case 87:
            paddle1[1] -= 30;
            break;
            
        //when s is pressed
        case 83:
            paddle1[1] += 30;
            break;
    }
}

function draw() {
    //fills screen black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasW, canvasH);
    
    //creates ball
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball[0],ball[1], 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    
    //creates paddles
    ctx.fillRect(paddle1[0], paddle1[1], 20, paddleSize[0], paddleSize[1])
    ctx.fillRect(paddle2[0], paddle2[1], 20, paddleSize[0], paddleSize[1])
    
    //change values as needed
    ball[0] += traj[0];
    ball[1] += traj[1];
    
    //checks if ball is hitting paddles 1 or 2
    //checks if it is above the bottom and then below the top
    let ballOnPaddle2Y = (ball[1] >= paddle2[1]) && (ball[1] <= paddle2[1] + paddleSize[0]);
    
    if (ball[0] + 40 >= paddle2[0] && ballOnPaddle2Y || ball[0] - 40 <= paddle1[0] + 40){
        traj[0] = -traj[0];
    }
    else {
        if (ball[0] > paddle2[0]){
            score[1]++;
        }
    }
    if (ball[1] + 40 >= canvasH || ball[1] - 40 <= 0){
        traj[1] = -traj[1];
    }
}