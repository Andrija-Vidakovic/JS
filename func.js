function zero()     { return (arguments.length === 0) ? 0 : arguments[0](0) }
function one()      { return (arguments.length === 0) ? 1 : arguments[0](1) }
function two()      { return (arguments.length === 0) ? 2 : arguments[0](2) }
function three()    { return (arguments.length === 0) ? 3 : arguments[0](3) }
function four()     { return (arguments.length === 0) ? 4 : arguments[0](4) }
function five()     { return (arguments.length === 0) ? 5 : arguments[0](5) }
function six()      { return (arguments.length === 0) ? 6 : arguments[0](6) }
function seven()    { return (arguments.length === 0) ? 7 : arguments[0](7) }
function eight()    { return (arguments.length === 0) ? 8 : arguments[0](8) }
function nine()     { return (arguments.length === 0) ? 9 : arguments[0](9) }

function plus() {
    let r = arguments[0];
    return function (l) {
        return l + r;
    }
}
function minus() { 
    let r = arguments[0];
    return function (l) {
        return l - r;
    }
}
function times() { 
    let r = arguments[0];
    return function (l) {
        return l * r;
    }
}
function dividedBy() { 
    let r = arguments[0];
    return function (l) {
        return Math.floor(l / r);
    }
}

/*
seven(times(five())); // must return 35
four(plus(nine())); // must return 13
eight(minus(three())); // must return 5
six(dividedBy(two())); // must return 3

*/

