// slider callback
function newCube() {
    // prevents cross algorithms
    autoAnimating = false;
    createCube(this.value());

    if (timerMode) {
        currentTimer.clear();
    }

    // updates label
    orderLabel.html(this.value() + 'x' + this.value());
}

// makes a cube array given the order
function createCube(n) {
    // clears cube and history
    cube = [];
    history = [];

    // initializes new order
    order = n;

    // creates invisible layer
    if (n % 2 == 0) {
        layers = n + 1;
    } else {
        layers = n;
    }

    // shifts the range
    rangeStart = 1 - ceil(layers / 2);
    rangeEnd = layers - ceil(layers / 2);

    // creates the cube array
    let idx = 0;
    for (var x = rangeStart; x <= rangeEnd; x++) {
        for (var y = rangeStart; y <= rangeEnd; y++) {
            for (var z = rangeStart; z <= rangeEnd; z++) {
                cube.push(new Cubie(x, y, z, colorDict, idx, false));
                idx++;
            }
        }
    }

    // rescales the move ranges
    initializeMoveDict();
}

// updates moving variable with user's, as long as no other move is occuring
function playMove(move) {
    if (!autoAnimating && !currentMove.animating) {
        Object.assign(currentMove, move);

        // starts timer on move in inspection
        if (timerMode && !move.isRotation()) {
            currentTimer.endInspection();
        }
    }
}

// ends the auto-sequence and adds back the dummy moves
function finishAutoSequence() {
    // animating flag
    autoAnimating = false;
    // orginal dummy moves
    autoSequence.push(new Move(true, 'x', [1], 1, 0), new Move(true, 'y', [1], 1, 0));
}

// checks to see if cube is solved
function solved() {
    let visible = visibleQbs(cube)
    let reference = visible[0].colors;
    let cMap = [];

    cMap.push(uniformLayerColor(visible, 'y', rangeStart, 0, reference),
        uniformLayerColor(visible, 'y', rangeEnd, 1, reference),
        uniformLayerColor(visible, 'z', rangeEnd, 2, reference),
        uniformLayerColor(visible, 'z', rangeStart, 3, reference),
        uniformLayerColor(visible, 'x', rangeStart, 4, reference),
        uniformLayerColor(visible, 'x', rangeEnd, 5, reference));

    return cMap.every(i => i);
}

// isolates and matches a layer's color to reference
function uniformLayerColor(qbs, axis, layer, side, reference) {
    let target = qbs
        // collects layer cubies
        .filter(qb => qb[axis] == layer)
        // gets the side colors
        .map(qb => qb.colors[side])
        // compares all the side colors
        .every(c => equalColors(c, reference[side]))
    return target;
}

// negates the invisible layer on even order cubes
function visibleQbs(array) {
    let target = [];

    for (qb of array) {
        if (!qb.inInvisibleLayer()) {
            target.push(qb);
        }
    }

    return target;
}

// increments the moving layer's angle
function incremenMoveAngle(speed, move) {
    if (speed) {
        move.angle += 0.3;
    } else {
        move.angle += 0.1;
    }
}

function assignButtons() {
    // giving html buttons functionality by assigning moves
    R = select('#r').mouseClicked(() => playMove(rMove));
    Ri = select('#ri').mouseClicked(() => playMove(riMove));
    Rw = select('#rw').mouseClicked(() => playMove(rMove.makeWide()));
    Rwi = select('#rwi').mouseClicked(() => playMove(riMove.makeWide()));
    L = select('#l').mouseClicked(() => playMove(lMove));
    Li = select('#li').mouseClicked(() => playMove(liMove));
    Lw = select('#lw').mouseClicked(() => playMove(lMove.makeWide()));
    Lwi = select('#lwi').mouseClicked(() => playMove(liMove.makeWide()));
    X = select('#x').mouseClicked(() => playMove(xMove));
    Xi = select('#xi').mouseClicked(() => playMove(xiMove));
    U = select('#u').mouseClicked(() => playMove(uMove));
    Ui = select('#ui').mouseClicked(() => playMove(uiMove));
    Uw = select('#uw').mouseClicked(() => playMove(uMove.makeWide()));
    Uwi = select('#uwi').mouseClicked(() => playMove(uiMove.makeWide()));
    D = select('#d').mouseClicked(() => playMove(dMove));
    Di = select('#di').mouseClicked(() => playMove(diMove));
    Dw = select('#dw').mouseClicked(() => playMove(dMove.makeWide()));
    Dwi = select('#dwi').mouseClicked(() => playMove(diMove.makeWide()));
    Y = select('#y').mouseClicked(() => playMove(yMove));
    Yi = select('#yi').mouseClicked(() => playMove(yiMove));
    F = select('#f').mouseClicked(() => playMove(fMove));
    Fi = select('#fi').mouseClicked(() => playMove(fiMove));
    Fw = select('#fw').mouseClicked(() => playMove(fMove.makeWide()));
    Fwi = select('#fwi').mouseClicked(() => playMove(fiMove.makeWide()));
    B = select('#b').mouseClicked(() => playMove(bMove));
    Bi = select('#bi').mouseClicked(() => playMove(biMove));
    Bw = select('#bw').mouseClicked(() => playMove(bMove.makeWide()));
    Bwi = select('#bwi').mouseClicked(() => playMove(biMove.makeWide()));
    Z = select('#z').mouseClicked(() => playMove(zMove));
    Zi = select('#zi').mouseClicked(() => playMove(ziMove));
    scrambler = select('#scrambler').mouseClicked(startScramble);
    solver = select('#solver').mouseClicked(startSolution);
}

function selectStatSpans() {
    _2best = select('.2best');
    _2bestAo5 = select('.2bestAo5');
    _2bestAo12 = select('.2bestAo12');
    _2mean = select('.2mean');
    _3best = select('.3best');
    _3bestAo5 = select('.3bestAo5');
    _3bestAo12 = select('.3bestAo12');
    _3mean = select('.3mean')
    _4best = select('.4best');
    _4bestAo5 = select('.4bestAo5');
    _4bestAo12 = select('.4bestAo12');
    _4mean = select('.4mean');
    _5best = select('.5best');
    _5bestAo5 = select('.5bestAo5');
    _5bestAo12 = select('.5bestAo12');
    _5mean = select('.5mean');
}

function switchAccView() {
    loginContainer.style('display', 'none');
    statContainer.style('display', 'flex');
    loginBtn.html('Statistics');
    inputs.forEach(element => {
        element.value('')
    });
}

function switchLoginView() {
    loginContainer.style('display', 'block');
    statContainer.style('display', 'none');
    loginBtn.html('Login');
}