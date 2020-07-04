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


        account.loggedIn = true;
        account.accBtnLabel = 'Statistics';
        loginBtn.html(account.accBtnLabel);
        populateStats();

        if (result.users.length == 0) {
            account.currentUser = logUser(name, pin);
        } else {
            account.currentUser = result.users[0];
        }
    }
}

function populateStats() {}

function best(array) {
    return array.reduce(function (accumulator, currentValue) {
        if (accumulator < currentValue) {
            return accumulator;
        } else {
            return currentValue;
        }
    })
}

function bestAoX(array, x) {
    let averages = [];
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i + x - 1] != undefined) {
            averages.push(aoX(array.slice(i, i + x), x));
        }
    }
    return best(averages);
}

function aoX(array, x) {
    let target = array;
    target.sort((a, b) => a < b);
    target.shift();
    target.pop();
    return target.reduce((acc, cv) => acc + cv) / (x - 2);
}

function mean(arr) {
    return arr.reduce(reducer) / arr.length;

    function reducer(a, b) {
        return a + b;
    }
}