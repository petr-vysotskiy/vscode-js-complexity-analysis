"use strict";

function all(array, cb) {
    return array.reduce((prevVal, currVal) => prevVal && cb(currVal), true);
}

function none(array, cb) {
    return !all(array, cb);
}

function sum(array) {
    return array.reduce((prevVal, currVal) => prevVal + currVal, 0);
}

// Like in lodash
function get(object, path, defaultValue) {
    path = path.split(".");

    let index = 0;
    let length = path.length;

    while (object != null && index < length) {
        object = object[path[index++]];
    }

    return (index && index == length && object !== undefined) ? object : defaultValue;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

module.exports = {
    all,
    none,
    sum,
    roundToTwo,
    get: get
};