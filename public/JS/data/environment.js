// defines all the program/environment variables

// initializes the array and colors
let cube = [];
let colorDict;

// the overall 3D camera
let cam;

// setting dimensions
let order = 3;
let rangeStart, rangeEnd;

// getting HTML elements
let R, Ri, L, Li, U, Ui, D, Di, F, Fi, B, Bi, X, Xi, Y, Yi, Z, Zi;
let Rw, Rwi, Lw, Lwi, Uw, Uwi, _Dw, Dwi, Fw, Fwi, Bw, Bwi;
let scrambler, solver, camReset;
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
let userMoves = []; // where the user inputs their moves
let history = [];
let autoSequence;
let autoAnimating = false;

// account GUI
let currentUser = null;

// login DOM elements
let statContainer, loginContainer;
let loginBtn, submitBtn, deleteBtn, logoutBtn;
let errorAlert;
let _2best, _2bestAo5, _2bestAo12, _2mean;
let _3best, _3bestAo5, _3bestAo12, _3mean;
let _4best, _4bestAo5, _4bestAo12, _4mean;
let _5best, _5bestAo5, _5bestAo12, _5mean;

// the login inputs
let inputs;
let focused = false;