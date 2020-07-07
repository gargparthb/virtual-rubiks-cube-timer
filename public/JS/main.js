// WEBGL Rubik's Cube created by Parth Garg during the Great Quarantine of 2020
// make with p5.js

function setup() {
    canvas = createCanvas(windowWidth / 2, (windowHeight * 18) / 20, WEBGL);
    // allows styling
    canvas.parent('canvas-wrapper');

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

    // the login fields
    inputs = selectAll('input', '#login-form');

    // allows to type in inputs without moving cube
    inputs.forEach((element) => {
        element.elt.onfocus = () => (focused = true);
        element.elt.onblur = () => (focused = false);
    });

    // the possible alert in case of invalid login inputs
    errorAlert = select('#error');

    // gets the stats UI's
    selectStatSpans();

    // makes cube array
    createCube(order);

    // gives the move buttons callbacks
    assignButtons();

    // gives a dummy setup move
    currentMove = new Move();

    document.oncontextmenu = function () {
        return false;
    }
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
        // pulling out move
        let autoMove = autoSequence[0];
        incremenMoveAngle(true, autoMove);

        if (autoMove.doneAnimating()) {
            // switching through the auto sequence and saving move for history
            autoMove.resetAngle().execute().updateHistory();
            autoSequence.shift();
        }

        // draws each qb of array with the auto rotation
        autoMove.drawCube(cube);

        // draw a user move
    } else {
        // does the above for the user moves
        if (currentMove.animating) {
            incremenMoveAngle(spdMode, currentMove);
        }

        // checks if the move is done animating
        if (currentMove.doneAnimating()) {
            currentMove.end();
        }

        // draws the qbs
        currentMove.drawCube(cube);
    }
}