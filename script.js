// Making the canvas variable by getting the element by ID as well as original color
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";

// Basic variables for drawing functions
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Start Drawing function that makes isDrawing true and gets the last X and Y values
function startDrawing(event) {
    isDrawing = true;
    lastX = event.clientX;
    lastY = event.clientY;
}

// When currently drawing, get the path from last X and Y and draw a line to the new X and Y
function draw(event) {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.clientX, event.clientY);
        ctx.stroke();
        lastX = event.clientX;
        lastY = event.clientY;        
    }
}

// Make isDrawing false if the user is no longer drawing
function stopDrawing() {
    isDrawing = false;
}

function reset() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.strokeStyle = "black";
}

function changeRed() {
    ctx.strokeStyle = "red";
}


// Can use addEventListener to see when the mouse is up, down, or moving and call the event funciton if neccessary
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);