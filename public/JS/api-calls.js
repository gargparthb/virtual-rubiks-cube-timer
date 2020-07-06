async function loginUser() {
    const name = inputs[0].value();
    const password = inputs[1].value();

    if (name == '' || password == '') {
        errorAlert.style('display', 'block');
    } else {
        const request = await fetch(`/api/${name}/${password}`)
            .then((request) => request.json())
            .catch((err) => console.error(err));

        if (request.users.length === 0) {
            registerUser(name, password);
        } else {
            currentUser = request.users[0];
            populateStats(currentUser);
        }
        switchAccView();
    }
}

async function registerUser(name, password) {
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

    const request = await fetch('/api', options);
    const response = await request.json().catch((err) => console.error(err));

    currentUser = response.added;
    populateStats(currentUser);

    return response;
}

async function updateUser(time, order) {
    const body = {
        time: time,
        order: order,
        id: currentUser._id,
    };
    console.log(JSON.stringify(body));

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };

    const promise = await fetch('/api', options);
    const response = await promise.json();
    const affected = await response.affected;

    currentUser = affected;
    populateStats(currentUser);
    return affected;
}

async function deleteUser() {
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

    await fetch('/api', options);

    switchLoginView();
    currentUser = null;
}

function logout() {
    currentUser = null;
    switchLoginView();
}

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
