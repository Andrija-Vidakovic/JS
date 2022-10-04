/**
 * 
 *  Iteratori i Generatori
 * 
 */


"use strict";

// iterator, factory metod
function interval(start, stop) {

    // implementacija iterator protokola
    // 1. objekat mora da ima next() metod
    // 2. next() vraca bjekat {value,done}
    //let next = function () {
    function next() {
        if (start < stop) {
            return { value: start++, done: false };
        }
        return { done: true };
    }

    // iterator implementira Symbol.iterator 
    // funkciju koja vraca objekat sa next() metodom
    let iter = {
        [Symbol.iterator]: function () {
            return { next };
        }
    };

    // vrati iterator
    return iter;
};


let int1 = interval(1, 10);
for (let i of int1) {
    console.log(i);
}

// iterator, konstruktorska funkcija
function Interval(from, to) {

    let current;

    this.next = function () {
        if (current < to) {
            return { value: current++, done: false };
        }
        return { value: current, done: true };
    };

    this[Symbol.iterator] = function () {
        current = from; // ovde se radi inicijalizacija
        return this;
    }
}

//> primena
console.log('=========================');
let int = new Interval(1, 5);
for (let i of int) {
    console.log(i);
}

// Generatori kao iteratori
// 
function* range(from, to, step = 1) {
    while (from < to) {
        yield from;
        from += step;
    }
    return;
}

console.log('=========================');
// generator je iterabilan
for (let i of range(1, 10, 4)) {
    console.log(i);
}

// konstrukcija iterabilnog objekta upotrebom generatora
function factoryIterableObj(from, to) {
    return {
        from,
        to,
        [Symbol.iterator]: function* () {
            let current = this.from;
            while (current < this.to) {
                yield current;
                current++;
            }
            return;
        },
    }
};

// konstruktorska funkcija sa generatorom kao
// iteratorom
function IterableObj(from, to) {

    this.from = from;
    this.to = to;

    this[Symbol.iterator] = function* () {
        let current = this.from;
        while (current < this.to) {
            yield current;
            current++;
        }
        return;
    };
};

console.log('=========================');
let obj = new IterableObj(1, 5);
console.log(obj);
for (let i of obj) {
    console.log(i);
}

console.log('=========================');
let obj1 = factoryIterableObj(1, 5);
console.log(obj1);
for (let i of obj) {
    console.log(i);
}



