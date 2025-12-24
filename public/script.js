// Making the canvas variable by getting the element by ID as well as original color
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";

// Basic variables for drawing functions
let isDrawing = false;
let lastX = 0;
let lastY = 0;

let history = [];
let historyIndex = -1;


function saveState() {
    // Get image data (the whole canvas)
    let imageData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.height)

    // Add it to the history array of images
    history.push(imageData);
    historyIndex++;
}

// Undos the last thing the use did
function undo() {
    if (historyIndex > 0) {
        history.pop()
        historyIndex--;
        ctx.putImageData(history[historyIndex], 0, 0);
    }

    else {
        reset();
    }
}

// Start Drawing function that makes isDrawing true and gets the last X and Y values
function startDrawing(event) {
    isDrawing = true;
    lastX = event.clientX;
    lastY = event.clientY - 60;
}

// When currently drawing, get the path from last X and Y and draw a line to the new X and Y
function draw(event) {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.clientX, event.clientY - 60);
        ctx.stroke();
        lastX = event.clientX;
        lastY = event.clientY - 60;        
    }
}

// Make isDrawing false if the user is no longer drawing
function stopDrawing() {
    isDrawing = false;
    saveState();
}

// Clear the rectangle and set the history array back to []
function reset() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.strokeStyle = "black";
    history = []
    historyIndex = -1;
}

// Changes color based on selected value
function changeColor() {
    var color = document.getElementById("color").value;
    ctx.strokeStyle = color;
}

// When you want to switch from light mode to dark mode
function changeMode() {
    document.body.classList.toggle("dark-mode");

    if (document.getElementById("mode").value == "Dark Mode") {
        document.getElementById("mode").value = "Light Mode";
        // Only changes the color if it is either black or white depending on the current mode
        if (document.getElementById("color").value == "black") {
            document.getElementById("color").value = "white";
        }
    }   

    // Same logic here
    else {
        document.getElementById("mode").value = "Dark Mode";
        if (document.getElementById("color").value == "white") {
            document.getElementById("color").value = "black";
        }
    }

    changePixels();
}

function changePixels() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    if (document.getElementById("mode").value == "Light Mode") {
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0) {
                data[i] = 255; 
                data[i + 1] = 255; 
                data[i + 2] = 255; 
            }
        }
    }

    if (document.getElementById("mode").value == "Dark Mode") {
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 255) {
                data[i] = 0; 
                data[i + 1] = 0; 
                data[i + 2] = 0; 
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function saveCanvas() {
    let image = canvas.toDataURL("image/png");
    let link = document.createElement("a");  
    link.href = image;
    let filename = prompt("Enter a filename:", 'Untitled-Image');
    if (!filename) return;
    link.download = filename + ".png";           
    link.click();                           
}


// Can use addEventListener to see when the mouse is up, down, or moving and call the event funciton if neccessary
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousedown', changeColor);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);