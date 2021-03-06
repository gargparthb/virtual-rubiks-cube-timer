// asks the database if the user is registered, otherwise register credentials
async function loginUser() {
    // get user input
    const name = inputs[0].value();
    const password = inputs[1].value();

    // validation
    if (name == '' || password == '') {
        errorAlert.style('display', 'block');
    } else {
        // makes GET request
        const request = await fetch(`/api/${name}/${password}`)
            .then((request) => request.json())
            .catch((err) => console.error(err));

        // process API result
        if (request.users.length === 0) {
            // add to datavase
            registerUser(name, password);
        } else {
            // draw the user view
            currentUser = request.users[0];
            populateStats(currentUser);
        }
        switchAccView();
    }
}

// POSTs new user info to db
async function registerUser(name, password) {
    // request information
    const body = {
        username: name,
        password: password,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    // makes request
    const request = await fetch('/api', options);
    const response = await request.json().catch((err) => console.error(err));

    // updates current user and draws nice view
    currentUser = response.added;
    populateStats(currentUser);

    return response;
}

// appends time to user data entry
async function updateUser(time, order) {
    const body = {
        time: time,
        order: order,
        // finds user by the ID auto generated by neDB
        id: currentUser._id,
    };

    // request parameters
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    // makes request
    const promise = await fetch('/api', options);
    const response = await promise.json();
    const affected = await response.affected;

    // updates environment variables
    currentUser = affected;
    populateStats(currentUser);
    return affected;
}

// registers when user clicks delete account btn
async function deleteUser() {
    // request parameters
    const body = {
        id: currentUser._id,
    };

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    // make resquest
    await fetch('/api', options);

    // changes the DOM and system user
    switchLoginView();
    currentUser = null;
}

// changes the view to the login
function logout() {
    currentUser = null;
    switchLoginView();
}

// calculates stats and sends them to the DOM
function populateStats(account) {
    let user = Object.assign({}, account);

    _2best.html(best(user.x2times));
    _2bestAo5.html(bestAoX(user.x2times, 5));
    _2bestAo12.html(bestAoX(user.x2times, 12));
    _2mean.html(mean(user.x2times));

    _3best.html(best(user.x3times));
    _3bestAo5.html(bestAoX(user.x3times, 5));
    _3bestAo12.html(bestAoX(user.x3times, 12));
    _3mean.html(mean(user.x3times));

    _4best.html(best(user.x4times));
    _4bestAo5.html(bestAoX(user.x4times, 5));
    _4bestAo12.html(bestAoX(user.x4times, 12));
    _4mean.html(mean(user.x4times));

    _5best.html(best(user.x5times));
    _5bestAo5.html(bestAoX(user.x5times, 5));
    _5bestAo12.html(bestAoX(user.x5times, 12));
    _5mean.html(mean(user.x5times));
}