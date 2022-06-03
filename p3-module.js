/*
    CIT 281 Project 3 
    Name: Melinda Chan
*/

module.exports = {
    coinCount,
};

function validDenomination(coin) {
    return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1 ? true : false; // if coin value is not found in the array it returns -1
}

// console.log(validDenomination(5));
// console.log(validDenomination(3));

function valueFromCoinObject(obj) {
    const { denom = 0, count = 0 } = obj;
    /* 
        return validDenomination(denom) ? denom * count : 0;
    */
    return denom * count; // should have ternary operator with validDemoniation function to check denom
}

function valueFromArray(arr) {
    return arr.reduce((total, arr) => total + valueFromCoinObject(arr), 0);
}

function coinCount(...coinage) {
    return valueFromArray(coinage);
}

/*
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
*/
