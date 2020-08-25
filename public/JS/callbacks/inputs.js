// changes spd mode on check and resets the camera to new view
function toggleMode() {
    spdMode = this.checked();
    cam.reset();
}

// toggles the timer
function toggleTimer() {
    timerMode = this.checked();

    if (timerMode) {
        currentTimer = new Timer();
    }

    currentTimer.drawTimer();
}

// slider setup
function initializeSlider() {
    // adding slider
    slider = createSlider(2, 5, 3, 1)
        .parent('slider-wrapper')
        .addClass('slider')
        .input(newCube);

    // the label of order
    orderLabel = createP(slider.value() + 'x' + slider.value()).parent(
        'order-label-wrapper'
    );
}