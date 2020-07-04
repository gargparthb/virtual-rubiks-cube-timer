function best(array) {
    if (array.length == 0) {
        return 'N/A';
    } else {
        let target = array.reduce(function (accumulator, currentValue) {
            if (accumulator < currentValue) {
                return accumulator;
            } else {
                return currentValue;
            }
        })

        return target;
    }
}

function bestAoX(array, x) {
    let averages = [];
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i + x - 1] != undefined) {
            averages.push(aoX(array.slice(i, i + x), x));
        } else {
            averages.push(null);
        }
    }

    if (averages.includes(null)) {
        return 'N/A';
    } else {
        return best(averages);
    }
}

function aoX(array, x) {
    let target = array;
    target.sort((a, b) => a < b);
    target.shift();
    target.pop();
    return target.reduce((acc, cv) => acc + cv) / (x - 2);
}

function mean(arr) {
    if (arr.length == 0) {
        return 'N/A';
    } else {
        return (arr.reduce(reducer) / arr.length).toFixed(1);
    }

    function reducer(a, b) {
        return a + b;
    }
}