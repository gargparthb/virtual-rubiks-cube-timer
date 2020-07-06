// returns the smallest value in array
function best(array) {
    if (array.length == 0) {
        return 'N/A';
    } else {
        let smallest = array[0];
        for (item of array) {
            if (item < smallest) {
                smallest = item;
            }
        }
        return Math.round(smallest * 10) / 10;
    }
}

// finds the best cubing average of x
function bestAoX(array, x) {
    let averages = [];
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i + x - 1] != undefined) {
            averages.push(aoX(array.slice(i, i + x), x));
        } else {
            averages.push(null);
        }
    }

    return best(averages.filter((value) => value != null));
}

// aox helper
function aoX(array, x) {
    let target = array.slice(0);
    target.sort((a, b) => a < b);
    target.shift();
    target.pop();
    return (target.reduce((acc, cv) => acc + cv) / (x - 2)).toFixed(1);
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
