// WEBGL Rubik's Cube created by Parth Garg during the Great Quarantine of 2020
// make with p5.js

function setup() {
    canvas = createCanvas(windowWidth / 2, (windowHeight * 18) / 20, WEBGL);
    // allows styling
    canvas.parent('canvas-wrapper');

    // uses a nice camera rather than default
    camera = createEasyCam();

    // initilizing drawing variables
    calculateLen();
    calculateStickerOffset();

    // initial color order
    initializeColorDict();

    // gets and sets the slider functions
    initializeSlider()

    // checkboxes
    spdModeChkBox = select('#spd-chkbox').changed(toggleMode);
    timerChkBox = select('#timer-chkbox').changed(toggleTimer);

    // timer label
    timerLabel = select('#timer-label');

    // login backend front end UI
    statContainer = select('.stats-container');
    loginContainer = select('.login-container');

    // CRUD buttons
    crudButtons();

    // gets and add functionality to form elements
    initializeLoginForm();

    // gets the stats UI's
    selectStatSpans();

    // makes cube array
    createCube(order);

    // gives the move buttons callbacks
    assignButtons();

    document.oncontextmenu = (() => false);
}

// reponsive web design
function windowResized() {
    resizeCanvas(windowWidth / 2, windowHeight * 0.9);
    // rescales cube
    calculateLen();
    calculateStickerOffset();
}

// processes key input
function keyTyped() {
    keyMove(key);
}

// SHIFT function isn't in KeyTyped
function keyPressed() {
    checkTimerStart(keyCode);
}

// main draw loop
function draw() {

    // nice salmon background color
    background(250, 128, 114);

    // gives better view depending on spd mode variable
    setView();

    // checks if an auto sequence is finished
    if (autoSequence.length == 0) {
        finishAutoSequence();
    }

    // draws an auto move
    if (autoAnimating) {
        // draws the first move in the auto sequence array
        drawMoveSequence(autoSequence, true);
    } else if (userMoves[0] != undefined) {
        // draws the first move in the user move array
        drawMoveSequence(userMoves, spdMode);
    } else {
        // draws the cube with a dummy move
        new Move(false, 'x', [0], 1, 0).drawCube(cube);
    }
}