// processes key input
function keyMove(key) {
    // doesn't process if user is typing inside the login box
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
                break;
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
                break;
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
                playMove(yiMove);
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

// SHIFT function isn't in KeyTyped
function checkTimerStart(keyCode) {
    if (keyCode == SHIFT &&
        timerMode &&
        !focused &&
        !autoAnimating) {
        // blocks changing the order and timer mode during a timed solve
        slider.elt.disabled = true;
        timerChkBox.elt.disabled = true;

        // solves the cube
        createCube(order);

        // scramables
        generateScramble();
        autoAnimating = true;

        // starts the timed solve
        currentTimer = new Timer();
        currentTimer.timeSolve();
    }
}