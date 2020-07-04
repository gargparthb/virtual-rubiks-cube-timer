async function logUser(username, pin) {
    const newUserData = {
        username: username,
        pin: pin,
        x2times: [],
        x3times: [],
        x4times: [],
        x5times: []
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData)
    }

    fetch('/api', options)
        .catch(err => console.error(err));
    return newUserData;
}

async function deleteUser() {

}

async function updateUser() {

}

async function submitCreds() {
    const name = inputs[0].value();
    const pin = inputs[1].value();

    if (inputs[0].value() == "" || inputs[1].value() == "") {
        errorAlert.style('display', 'block');
    } else {
        const response = await fetch(`/api/${name}/${pin}`);
        const result = await response.json();

        if (result.users.length == 0) {
            logUser(name, pin);
            account.currentUser = {
                username: name,
                pin: pin,
                x2times: [],
                x3times: [],
                x4times: [],
                x5times: []
            };
        } else {
            account.currentUser = result.users[0];
        }

        account.loggedIn = true;
        account.accBtnLabel = 'Statistics';
        loginBtn.html(account.accBtnLabel);
        populateStats();
        switchAccView();
    }
}

function populateStats() {
    _2best.html(best(account.currentUser.x2times));
    _2bestAo5.html(bestAoX(account.currentUser.x2times, 5));
    _2bestAo12.html(bestAoX(account.currentUser.x2times, 12));
    _2mean.html(mean(account.currentUser.x2times));

    _3best.html(best(account.currentUser.x3times));
    _3bestAo5.html(bestAoX(account.currentUser.x3times, 5));
    _3bestAo12.html(bestAoX(account.currentUser.x3times, 12));
    _3mean.html(mean(account.currentUser.x3times));

    _4best.html(best(account.currentUser.x4times));
    _4bestAo5.html(bestAoX(account.currentUser.x4times, 5));
    _4bestAo12.html(bestAoX(account.currentUser.x4times, 12));
    _4mean.html(mean(account.currentUser.x4times));

    _5best.html(best(account.currentUser.x5times));
    _5bestAo5.html(bestAoX(account.currentUser.x5times, 5));
    _5bestAo12.html(bestAoX(account.currentUser.x5times, 12));
    _5mean.html(mean(account.currentUser.x5times));
}

function switchAccView() {
    loginContainer.style('display', 'none');
    statContainer.style('display', 'flex');
}