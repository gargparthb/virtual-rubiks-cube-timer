// WEBGL Rubik's Cube created by Parth Garg during the Great Quarantine of 2020
// make with p5.js   

// defines all the program/environment variables

// initializes the array and colors
let cube = [];
let colorDict;

// setting dimensions
let order = 3;
let rangeStart, rangeEnd;

// getting HTML elements
let R, Ri, L, Li, U, Ui, D, Di, F, Fi, B, Bi, X, Xi, Y, Yi, Z, Zi;
let Rw, Rwi, Lw, Lwi, Uw, Uwi, Dw, Dwi, Fw, Fwi, Bw, Bwi;
let scrambler, solver;
let canvas;
let slider, orderLabel, spdModeChkBox, timerChkBox, timerLabel;

// moves
let rMove, riMove, lMove, liMove;
let uMove, uiMove, dMove, diMove;
let fMove, fiMove, bMove, biMove;
let xMove, xiMove, yMove, yiMove, zMove, ziMove;

// environment variables
let len, stickerOffset;
let spdMode = false;
let timerMode = false;
let currentTimer; // initializes the timer object
let currentMove; // initializing move object

// account GUI
let account = {
  loggedIn: false,
  accBtnLabel: 'Login',
  currentUser: null
};

let statContainer, loginContainer;
let loginBtn, submitBtn;
let errorAlert;
let _2best, _2bestAo5, _2bestAo12, _2mean;
let _3best, _3bestAo5, _3bestAo12, _3mean;
let _4best, _4bestAo5, _4bestAo12, _4mean;
let _5best, _5bestAo5, _5bestAo12, _5mean;


let inputs;
let focused = false;

function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight * 18 / 20, WEBGL);
  // allows styling
  canvas.parent('canvas-wrapper');

  // initilizing drawing variables
  calculateLen();
  calculateStickerOffset();

  // initial color order
  initializeColorDict();

  // adding slider
  slider = createSlider(1, 5, 3, 1)
    .parent('slider-wrapper')
    .addClass('slider')
    .input(newCube);

  // the label of order
  orderLabel = createP(slider.value() + 'x' + slider.value())
    .parent('order-label-wrapper');

  // spd mode box
  spdModeChkBox = select('#spd-chkbox')
    .changed(toggleMode);

  // timer checkbox
  timerChkBox = select('#timer-chkbox')
    .changed(toggleTimer);

  // timer label
  timerLabel = select('#timer-label');

  statContainer = select('.stats-container');
  loginContainer = select('.login-container');

  loginBtn = select('#account');
  submitBtn = select('#submit-btn').mouseClicked(submitCreds);

  inputs = selectAll('input', '#login-form');

  inputs.forEach(element => {
    element.elt.onfocus = () => focused = true;
    element.elt.onblur = () => focused = false;
  });

  errorAlert = select('#error');

  selectStatSpans();

  // makes cube array
  createCube(order);

  assignButtons();

  // gives a dummy setup move
  currentMove = new Move();
}

// processes key input
function keyTyped() {
  if (!focused) {
    switch (key) {
      case 'i':
        playMove(rMove);
        break;
      case 'k':
        playMove(riMove);
        break;
      case 'u':
        playMove(rMove.makeWide());
        break;
      case 'm':
        playMove(riMove.makeWide());
        break;
      case 'd':
        playMove(lMove);
        break;
      case 'e':
        playMove(liMove);
        break;
      case 'v':
        playMove(lMove.makeWide());
        break;
      case 'r':
        playMove(liMove.makeWide());
        break;
      case 'j':
        playMove(uMove);
        break;
      case 'f':
        playMove(uiMove);
        break;
      case ',':
        playMove(uMove.makeWide());
        break;
      case 'c':
        playMove(uiMove.makeWide());
      case 's':
        playMove(dMove);
        break;
      case 'l':
        playMove(diMove);
        break;
      case 'z':
        playMove(dMove.makeWide());
        break;
      case '/':
        playMove(diMove.makeWide());
      case 'h':
        playMove(fMove);
        break;
      case 'g':
        playMove(fiMove);
        break;
      case '7':
        playMove(fMove.makeWide());
        break;
      case '4':
        playMove(fiMove.makeWide());
        break;
      case 'w':
        playMove(bMove);
        break;
      case 'o':
        playMove(biMove);
        break;
      case '2':
        playMove(bMove.makeWide());
        break;
      case '9':
        playMove(biMove.makeWide());
        break;
      case 't':
        playMove(xMove);
        break;
      case 'y':
        playMove(xMove);
        break;
      case 'b':
        playMove(xiMove);
        break;
      case 'n':
        playMove(xiMove);
        break;
      case ';':
        playMove(yMove);
        break;
      case 'a':
        playMove(yiMove)
        break;
      case 'p':
        playMove(zMove);
        break;
      case 'q':
        playMove(ziMove);
        break;
    }
  }
}

function keyPressed() {
  if (keyCode == SHIFT && timerMode) {
    createCube(order)
    generateScramble();
    autoAnimating = true;
    currentTimer = new Timer()
    currentTimer.timeSolve();
  }
}

// reponsive web design
function windowResized() {
  resizeCanvas(windowWidth / 2, windowHeight * .90);
  // rescales cube
  calculateLen();
  calculateStickerOffset();
}

// main draw loop
function draw() {
  background(250, 128, 114);

  // allows user pan
  orbitControl();

  // gives better view
  setView();

  // checks if an auto sequence is finished
  if (autoSequence.length == 0) {
    finishAutoSequence();
  }

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

  } else {
    // does the above for the user moves
    if (currentMove.animating) {
      incremenMoveAngle(spdMode, currentMove);
    }

    // checks if the move is done animating
    if (currentMove.doneAnimating()) {
      currentMove.end();
    }

    currentMove.drawCube(cube);
  }
}