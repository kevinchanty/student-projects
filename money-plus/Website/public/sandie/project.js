// const boxColor = 150;
// const strokeColor = 50;
const unitLength = 30;
const unitHeight = 30;
let columns; /* To be determined by window width*/
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let stableBoard;
let lonely = 2;
let population = 3;
let production = 3;
let isRunning = true;
let isKeyboardMode = true;


// Frame Rate - Slider
document.querySelector('.frameRate')
    .addEventListener('change', function (event) {
        frameRate(parseInt(event.currentTarget.value))
    })

// Die of OverPopulation - Slider
let overpopulation = document.querySelector('.overpopulation');
overpopulation.addEventListener('change', function (event) {
    population = parseInt(event.currentTarget.value)
})

// Loneliness - Slider
let loneliness = document.querySelector('.loneliness');
loneliness.addEventListener('change', function (event) {
    lonely = parseInt(event.currentTarget.value)
})

// Reproduction - Slider
let reproduction = document.querySelector('.reproduction');
reproduction.addEventListener('change', function (event) {
    production = parseInt(event.currentTarget.value)
})


function setup() {
    const canvas = createCanvas(windowWidth * 0.8, windowHeight * 0.7);
    canvas.parent(document.querySelector('#canvas'));

    columns = Math.floor(width / unitLength);
    rows = Math.floor(height / unitLength);

    currentBoard = [];
    nextBoard = [];
    stableBoard = [];

    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];
        stableBoard[i] = [];
    }
    init();
}


function windowResized() {
    let newCanvasWidth;
    let newCanvasHeight;
    let newColumns;
    let newRows;
    let canvasWidth = width;
    let canvasHeight = height;

    newCanvasWidth = Math.floor((windowWidth * 0.8) / unitLength) * unitLength
    newCanvasHeight = Math.floor((windowHeight * 0.7) / unitLength) * unitHeight
    resizeCanvas(newCanvasWidth, newCanvasHeight);
    newColumns = Math.floor((newCanvasWidth - canvasWidth) / unitLength)
    newRows = Math.floor((newCanvasHeight - canvasHeight) / unitLength)
    for (let i = columns; i < (columns + newColumns); i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];
        stableBoard[i] = [];
    }
    columns += newColumns;
    rows += newRows;
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == null) {
                currentBoard[i][j] = 0;
                nextBoard[i][j] = 0;
            }
        }
    }
    newColumns = 0;
    newRows = 0;
}

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = random() > 0.8 ? 1 : 0;
            nextBoard[i][j] = 0;
        }
    }
}

function draw() {
    background(248, 240, 230);
    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                stableBoard[i][j]++;
                if (stableBoard[i][j] > 30) {
                    fill('#543357')
                } else {
                    fill('#976968');
                }
            } else {
                fill('#bdcab2');
            }
            stroke('#689697');
            rect(i * unitLength, j * unitLength, unitLength, unitLength, 10);
        }
    }
}

function generate() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }
            if (currentBoard[x][y] == 1 && neighbors < lonely) {// Die of Loneliness
                // fill('yellow');
                nextBoard[x][y] = 0;
                stableBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > population) {// Die of Overpopulation
                // fill('red');
                nextBoard[x][y] = 0;
                stableBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == production) {// New life due to Reproduction
                // fill('orange');
                nextBoard[x][y] = 1;
                stableBoard[x][y] = 1;
            } else {// Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }
    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function mouseDragged() {
    // If the mouse coordinate is outside the board
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill('#547cab');
    stroke('#AD8352');
    rect(x * unitLength, y * unitLength, unitLength, unitLength, 10);
}

let xValue = 0;
let yValue = 0;

let keyboardMode = document.querySelector('#keyboard-mode')
keyboardMode.addEventListener('click', function (event) {
    isKeyboardMode = !isKeyboardMode;
    if (isKeyboardMode) {
        noLoop();
        event.currentTarget.innerHTML = 'Keyboard Mode : ON'
    } else {
        loop();
        event.currentTarget.innerHTML = 'Keyboard Mode : OFF'
    }

    event.currentTarget.blur();
})

window.addEventListener('keydown', function (event) {
    noLoop();
    if (isKeyboardMode === true) {
        if (event.keyCode === 38) {//event.key === "ArrowUp"
            yValue -= 1;
            if (yValue < 0) {
                yValue = rows - 1
            }
            fill('#b39291');
            stroke('#755251');
            rect(xValue * unitLength, yValue * unitLength, unitLength, unitLength, 10);

        } else if (event.keyCode === 40) { //down
            yValue += 1;
            if (yValue > rows) {
                yValue = 0;
            }
            fill('#b39291');
            stroke('#755251');
            rect(xValue * unitLength, yValue * unitLength, unitLength, unitLength, 10);

        } else if (event.keyCode === 37) { //left
            xValue -= 1;
            if (xValue < 0) {
                xValue = columns - 1;
            }
            fill('#b39291');
            stroke('#755251');
            rect(xValue * unitLength, yValue * unitLength, unitLength, unitLength, 10);

        } else if (event.keyCode === 39) { //right
            xValue += 1;
            if (xValue > columns) {
                xValue = 0;
            }
            fill('#b39291');
            stroke('#755251');
            rect(xValue * unitLength, yValue * unitLength, unitLength, unitLength, 10);

        } else if (event.keyCode === 13) { //enter
            currentBoard[xValue][yValue] = 1;
            fill('#1c6296');
            rect(xValue * unitLength, yValue * unitLength, unitLength, unitLength, 10);
            noLoop();

        } else if (event.keyCode === 32) { //space
            loop();

        } else {
            fill('#bdcab2');
        }
        console.log(event.key, event.keyCode, xValue, yValue)
    }
})


function mousePressed() {
    if (mouseX <= width && mouseY <= height) {
        noLoop();// When mouse is pressed
        mouseDragged();
    }
}

function mouseReleased() {
    draw();
    if (isRunning) {
        loop();// When mouse is released
    }
}

// 重新開始
document.querySelector('#reset-game')
    .addEventListener('click', function () {
        init();
    });

// clear button + function
document.querySelector('#empty')
    .addEventListener('click', function () {
        blankInit();
    });

// Grid隨畫面放大縮小
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//     setup();
// }

// Clear - Reset game
function blankInit() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
            // stableBoard[i][j] = 0;
        }
    }
}

// start / stop game switch
let stopGameSwitch = document.querySelector('#stop-game')
stopGameSwitch.addEventListener('click', function (event) {
    if (isRunning) {
        event.currentTarget.innerHTML = 'Start Game';
        noLoop();
    } else {
        event.currentTarget.innerHTML = 'Stop Game';
        loop();
    }
    isRunning = !isRunning;
})

// let pattern = `O..
// .OO
// ..O`.split("\n")
// for (let i = 0; i < pattern.length; i++) {
//     for (let j = 0; j < pattern[i].length; j++) {
//         if (pattern[i] == 'O') {
//             currentBoard[j][i] = 1
//         } else {
//             currentBoard[j][i] = 0
//         }
//     }
// }