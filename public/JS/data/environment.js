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
    currentUser: null
};

let statContainer, loginContainer;
let loginBtn, submitBtn, deleteBtn;
let errorAlert;
let _2best, _2bestAo5, _2bestAo12, _2mean;
let _3best, _3bestAo5, _3bestAo12, _3mean;
let _4best, _4bestAo5, _4bestAo12, _4mean;
let _5best, _5bestAo5, _5bestAo12, _5mean;


let inputs;
let focused = false;