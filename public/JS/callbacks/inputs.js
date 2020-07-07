// changes spd mode on check
function toggleMode() {
    spdMode = this.checked();
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