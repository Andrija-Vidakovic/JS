
let s = "aaaxbbbbyyhwawiwjjjwwm";
const MorseCode = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    " ": "_",
    hello: function () {
        console.log('hello')
    }
}

MorseCode.get = function (code) {
    let ret = Object.entries(MorseCode).find(
        item => item[1] == code
    );
    return (ret || [undefined])[0];
}

MorseCode.encode = function (msg) {
    let morse = '';
    for (item of msg.toUpperCase().split(''))
        morse += MorseCode[item] + ' ';
    return morse;
}

MorseCode.decode = function (morseCode) {
    let msg = '';
    morseCode = morseCode.trim().replace(/\s{3,}/g, '  ');
    for (item of morseCode.split(' '))
        msg += (item) ? MorseCode.get(item) : ' ';
    return msg;
}
// ovo je faca, al ne znam kako je prosao test rastavlja reci
MorseCode.decodeMorse = function (morseCode) {
    return morseCode
        .trim()
        .split(/  | /)
        .map((code) => MorseCode.get(code) || ' ')
        .join('');
}

MorseCode.hello();

console.log(MorseCode.encode('so s'));
console.log(MorseCode.decode('.... . -.--         .--- ..- -.. .'));
console.log(MorseCode.decodeMorse('.... . -.--         .--- ..- -.. .'));


//=============================================================
function printerError(s) {
    let rx = /[a-m]/ig;
    let er = s.replace(rx, '');
    return er.length + '/' + s.length;
}


function createPhoneNumber(numbers) {
    numbers.splice(0, 0, '(');
    numbers.splice(4, 0, ')');
    numbers.splice(5, 0, ' ');
    numbers.splice(9, 0, '-');
    return numbers.join('');
}

function createPhoneNumber1(numbers) {
    let format = "(xXx) xxx-xxxx";
    let rx = /[x]/i;
    for (let c of numbers)
        format = format.replace(rx, c);
    return format;
}

let str = 'fghg';
function getCount(str) {
    let ret = str.match(/[aoieu]/gi);
    return (ret || []).length;
}

function sortArray(array) {
    let tmp = array.filter(e => e % 2 != 0).sort((a, b) => a - b);
    return array.map(e => { return (e % 2 != 0) ? tmp.shift() : e });
}

function validBraces(braces) {
    let rgx = /(\(\))|(\{\})|(\[\])/g
    let old = '';
    while (braces != '') {
        old = braces.replace(rgx, '');
        if (old == braces) break;
        braces = old;
    }
    return braces == '';
}

// frajer resio rekurzijom
function validBraces1(braces) {
    let re = /\(\)|\{\}|\[\]/;
    return re.test(braces) ? validBraces1(braces.replace(re, '')) : '' === braces;
}

function twoSum(numbers, target) {
    for (let i = 0; i < numbers.length - 1; i++)
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] == target)
                return [i, j];
        }
}

function dirReduc(arr) {
    // ...
}


let weight = '10 22 15 45 46 82 134004 75 85 176 195 97 320970 326174 307438 460745 434843 226647 458932 177595 458798';
//let weight = " 1 2 3 4 5 6 7 8 9 10 ";
let result = '10 22 15 45 46 82 134004 75 85 176 195 97 320970 326174 307438 434843 460745 226647 458932 177595 458798';
function orderWeight(strng) {
    const reducer = (sum, item) => parseInt(sum) + parseInt(item);

    let str = strng
        .trim()
        .replace(/\s{2,}/g, ' ')
        .split(" ")
        .sort((a, b) => {
            let suma = a.split('').reduce(reducer, 0);
            let sumb = b.split('').reduce(reducer, 0);
            return suma == sumb ? (a > b ? 1 : -1) : suma - sumb;
        });

    return str.join(' ')
}

function digitalRoot(number) {
    let dig = number
        .toString()
        .split('')
        .reduce((sum, item) => sum + +item, 0);
    return dig > 9 ? digitalRoot(dig) : dig;
}
// faca je ovako resio
function digital_root(n) {
    return (n - 1) % 9 + 1;
}

let it = 'AAAA BBBCCDAABBB';
let it1 = ['1', '1', '1', '2', '3', '3', '2', '4', '4', '4'];
let it2 = [1, 1, 2, 3, 3, 34, 4, 4, 4];

var uniqueInOrder = function (iterable) {
    //your code here - remember iterable can be a string or an array
    let niz = [];
    let pre = null;

    for (let item of iterable) {
        if (pre != item) {
            if (!isNaN(+item)) {
                niz.push(+item);
            }
            else {
                niz.push(item);
            }
            pre = item;
        }
    }

    return niz;
}

function uniqueInOrder1(it) {
    var result = []
    var last

    for (var i = 0; i < it.length; i++) {
        if (it[i] !== last) {
            result.push(last = it[i])
        }
    }
    return result
}

var uniqueInOrder2 = function (iterable) {
    return [...iterable].filter((a, i) => a !== iterable[i - 1])
}
//console.log(it);
//console.log(uniqueInOrder(it));
//console.log('---------------------------');

console.log(it1);
console.log(uniqueInOrder(it1));
console.log('---------------------------');

console.log(it2);
console.log(uniqueInOrder(it2));
console.log('---------------------------');

let b = [...it];
console.log(it);
console.log(b);

