function randomAxis() {
    return random(['x', 'y', 'z']);
}

function randomDirection() {
    return random([-1, 1]);
}

function generateLayer() {
    return [random(removeZero(allNumsBetween(rangeStart, rangeEnd)))];
}

// generates random scramble
function generateScramble() {
    if (!autoAnimating) {
        scramble = [];
        // move count is scaled to the cube order
        for (let i = 0; i <= 17 * order - 20; i++) {
            scramble.push(
                new Move(
                    true,
                    randomAxis(),
                    generateLayer(),
                    randomDirection(),
                    0
                )
            );
        }

        autoSequence = cancel(scramble);
    }
}

// starts the auto sequence
function startScramble() {
    if (!timerMode) {
        generateScramble();
        autoAnimating = true;
    }
}

// reverses history and cancels moves
function generateSolution() {
    if (!autoAnimating && !solved(cube) && !timerMode) {
        let unCancelled = history
            .map((m) => new Move(true, m.axis, m.layers, m.dir * -1, 0))
            .reverse();

        autoSequence = cancel(unCancelled);
    }
}

// optimizes the generated algorithm
function cancel(moves) {
    // fold on to this array
    target = moves.splice(0, 1);

    // first loop checks for two consecutive inverse moves
    for (move of moves) {
        if (move.inverse(last(target))) {
            target.pop();
        } else {
            target.push(move);
        }
    }

    // the next loop checks for three consecutive equal moves and then reverse one and deletes two
    if (target.length > 2) {

        // another array to fold on to
        let final = target.splice(0, 2)

        for (move of target) {
            if (final[final.length - 2].equal(last(final)) &&
                last(final).equal(move)) {

                final.pop();
                last(final).dir *= -1;
            } else {
                final.push(move)
            }
        }

        return final;
    }

    return target;
}

// starts auto sequence
function startSolution() {
    if (!solved() && !timerMode) {
        generateSolution();
        autoAnimating = true;
    }
}

// ends the auto-sequence and adds back the dummy moves
function finishAutoSequence() {
    // animating flag
    autoAnimating = false;
    // orginal dummy moves
    autoSequence.push(
        new Move(true, 'x', [rangeEnd], 1, 0),
        new Move(true, 'y', [rangeEnd], 1, 0)
    );
}