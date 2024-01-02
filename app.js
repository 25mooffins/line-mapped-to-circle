/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var coefficient = 201;
var pointsOnCircle = 150;

var circleX = canvas.width/2;
var circleY = canvas.height/2.5;
var circleRadius = canvas.width/7;
var automateIncrements = 0.0012;

const slider = document.getElementById("slider");
const equation = document.getElementById("equation");
const button = document.getElementById("button");

button.style.left = "0px";
button.style.top = canvas.height/1.06 + "px";
equation.style.left = "0px";
equation.style.top = canvas.height/1.35 + "px";
slider.style.left = "0px";
slider.style.top = canvas.height/1.135 + "px";


class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

drawCircles();
drawText();
slider.oninput = function() {
    clearCanvas();
    coefficient = Number(this.value);
    console.log(coefficient);
    drawCircles();
    drawText();
}

function pointCalculations(position){
    var theta = position * 360/pointsOnCircle;
    theta *= Math.PI/180;
    var x = circleRadius * Math.cos(theta) + circleX;
    var y = circleRadius * Math.sin(theta) + circleY;
    return new point(x, y);
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircles(){
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "white";
    ctx.stroke();

    for(let i = 1; i < pointsOnCircle+1; i++){
        var point1 = pointCalculations(i);
        var point2 = pointCalculations(i*coefficient);
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        
        ctx.lineTo(point2.x, point2.y);
        ctx.stroke();
    }
}
function drawText(){
    document.getElementById("equation").innerHTML = "y = " + coefficient.toFixed(3) + " * x";
}

var automateOn = false;
function automate(){
    automateOn = !automateOn;
    function code(){
        if(automateOn){
            setTimeout(function(){
                if(coefficient <= -1){automateIncrements = 0.0012}
                else if(coefficient >= 7){automateIncrements = -0.0012}
                coefficient+=automateIncrements;
                clearCanvas();
                console.log(coefficient);
                drawCircles();
                drawText();
                console.log("HI");
                code();
            }, 5)
            
        }
    }
    code();
}