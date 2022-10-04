function findNb(m) {
    let n = 0;
    let sum = 0;
    while (sum < m) {
        n++;
        sum += n ** 3;
    }
    return sum == m ? n : (-1);
}

function findEvenIndex(arr) {
    for (let i = 0; i < arr.length; i++) {
        let leftSum = arr.reduce((sum, item, index) => {
            if (index < i) sum += item;
            return sum;
        }, 0);
        let rightSum = arr.reduce((sum, item, index) => {
            if (index > i) sum += item;
            return sum;
        }, 0);
        if (leftSum == rightSum) return i;
    }
    return -1;
}

function humanReadable(seconds) {
    let h = (seconds - seconds % 3600) / 3600;
    let m = seconds - h * 3600;
    m = (m - m % 60) / 60;
    let s = seconds - h * 3600 - m * 60;

    return ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
}


/**
 * Cezarov ciklicni sifarski sistem. Svako slovo se
 * preslikava u slovo udaljeno za 13 mesta abecede.
 * @param {string} msg ulazni tekst
 * @returns {string} sifrovani tekst
 */
function rot13(msg) {
    let rot = 13;
    let enc = [...msg].map((item) => {
        let code = item.charCodeAt(0);
        if (code > 64 && code < 91) { // A-Z 65-90 
            return String.fromCharCode((code - 65 + rot) % 26 + 65);
        }
        if (code > 96 && code < 123) { // a-z 97-122
            return String.fromCharCode((code - 97 + rot) % 26 + 97);
        }

        return item;
    });
    return enc.join('');
}
/**
 * Funkcija racuna poslednju cifru stepenovanog broja
 * 
 * @param {string} a baza
 * @param {string} n exponent
 * @returns {number} poslednja cifra stepenovanog broja
 */
function lastDigit(a, n) {
    let ldp = [
        [0],            // 0
        [1],            // 1
        [6, 2, 4, 8],   // 2: ostatak deljenja sa 4 exponenta
        [1, 3, 9, 7],   // 3: ostatak deljenja sa 4 exponenta
        [6, 4],         // 4: 
        [5],            // 5
        [6],            // 6
        [1, 7, 9, 3],   // 7:ostatak deljenja sa 4 exponenta
        [6, 8, 4, 2],   // 8:
        [1, 9]          // 9: ostatak deljenja sa 2 exponenta
    ];

    let ldBase = +a[a.length - 1];
    let ldExp = +n.slice(-2);

    return ldp[ldBase][ldExp % ldp[ldBase].length];
}
/**
 * Sazeti zapis rastuceg niza integer-a
 * @param {array} niz niz integera slozen po rastucem redosledu
 * @returns {string} sazeti zapis niza u stringu
 */
function shrinkArray(niz) {
    let ret = '';
    let item;
    let p;
    niz = niz.toString().split(',');

    for (let i = 0; i < niz.length - 2; i++) {
        p = i;

        if (niz[p].search(/\b-/) != -1) {
            ret += niz[p] + ',';
            continue;
        }

        while (niz[p + 1] - niz[p] == 1) {
            p++;
        }
        if (p > i + 1) {
            item = `${niz[i]}-${niz[p]}`;
            i = p;
        }
        else {
            item = niz[i];
        }
        ret += item + ',';
    }
    for (let i = p + 1; i < niz.length; i++)
        ret += niz[i] + ',';

    ret = ret.slice(0, -1)
    return ret;
}

function sumStrings(a, b) {
    return (BigInt(a) + BigInt(b)).toString();
}

function incString(str) {

    let index = str.search(/\d+/g);
    if (index == -1) return str + '1';
    let num = str.slice(index);
    str = str.replace(/\d+/g, '');
    let zero = num.replace(/[1-9]+/, '');
    num = num.replace(/0+/, '');
    let l = num.length;
    num = (BigInt(num) + 1n).toString();
    if (l !== num.length && zero != '') zero = zero.slice(0, -1);
    return str + zero + num
}

function gapInPrimes(g, m, n) {
    let prevPrime = 2;
    let prime = null;

    for (let i = m; i < n; i++) {
        if (isPrimeWiki(i)) {
            prime = i;
            if (prime - prevPrime === g)
                return [prevPrime, prime];
            prevPrime = prime
        }
    }
    return null;
}

//====================================================================================
let incString1 = str => str.replace(/([0-8]|\d?9+)?$/, (e) => e ? + e + 1 : 1)
//------------------------------------------------------------------------------------
function isPrimeWiki(num) {
    if (num == 2 || num == 3)
        return true;
    if (num <= 1 || num % 2 == 0 || num % 3 == 0)
        return false;
    for (let i = 5; i * i <= num; i += 6)
        if (num % i == 0 || num % (i + 2) == 0)
            return false;
    return true;
}
//------------------------------------------------------------------------------------
const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0) return false;
    return num > 1;
}
//=====================================================================================
/**
 * Function calculate Hamming number
 * @param {integer} n - 
 */
function hamming(n) {
    let h = [1];
    let n2 = 2;
    let n3 = 3;
    let n5 = 5;
    let i = j = k = 0;
    for (let index = 1; index < n; index++) {
        h[index] = Math.min(n2, n3, n5);
        if (h[index] == n2) n2 = 2 * h[++i];
        if (h[index] == n3) n3 = 3 * h[++j];
        if (h[index] == n5) n5 = 5 * h[++k];
    }
    return h[n - 1];
}
/**
 * The Vigenère cipher
 * @param {string} key 
 * @param {string} abc 
 */
function VigenereCipher(key, abc) {
    this.encode = function (str) {
        return ed(str, 1);
    };

    this.decode = function (str) {
        return ed(str, -1);
    };

    function ed(str, direction) {
        let ret = '';
        let index;

        for (let i = 0; i < str.length; i++) {
            let m = abc.indexOf(str[i]);
            if (m == -1) {
                ret += str[i];
                continue;
            }
            index = (m + direction * abc.indexOf(key[i % key.length]) + abc.length) % abc.length
            ret += abc[index];
        }
        return ret;
    }
}


function just(text, width) {
    if (text == '')
        return '';
    let niz = [];
    let wordsWith = width;
    let wordsCount = 0;
    for (word of text.split(' ')) {
        if (wordsWith + word.length + wordsCount <= width) {
            niz[niz.length - 1].push(word);
        }
        else {
            wordsWith = 0;
            wordsCount = 0;
            niz.push([word])
        }
        wordsWith += word.length;
        wordsCount++;
    }

    for (let line = 0; line < (niz.length - 1); line++) {
        let chCount = niz[line].join('').length;
        let spaceCount = width - chCount;
        let dSpace = ' ';
        let b = Math.floor(spaceCount / (niz[line].length - 1));
        for(let i=1; i< b; i++)
            dSpace+=' ';
        for (let i = 0; i < niz[line].length - 1; i++)
            niz[line][i] += dSpace;
        let remainder = spaceCount % (niz[line].length - 1);
        for (let i = 0; i < remainder; i++)
            niz[line][i] += ' ';
    }

    let strRet = '';
    for(let i=0; i< niz.length-1; i++)
        strRet += niz[i].join('') + '\n';   
    strRet += niz[niz.length-1].join('');

    return strRet;
}

let txt = "qwerty. i  qwerty?  [] \/";
let fox = 'The quick brown fox X jum ps over the lazy dog. If the dog barked, was it really lazy?';


let LoremIpsum =
    "Sed ut perspiciatis unde omnis \
iste natus error sit voluptatem \
accusantium doloremque laudantium, \
totam rem aperiam, eaque ipsa quae \
ab illo inventore veritatis et quasi \
architecto beatae vitae dicta sunt \
explicabo. Nemo enim ipsam voluptatem \
quia voluptas sit aspernatur aut odit \
aut fugit, sed quia consequuntur magni \
dolores eos qui ratione voluptatem \
sequi nesciunt. Neque porro quisquam \
est, qui dolorem ipsum quia dolor sit \
amet, consectetur, adipisci velit, \
sed quia non numquam eius modi tempora \
incidunt ut labore et dolore magnam \
aliquam quaerat voluptatem. Ut enim \
ad minima veniam, quis nostrum \
exercitationem ullam corporis suscipit \
laboriosam, nisi ut aliquid ex ea commodi \
consequatur? Quis autem vel eum iure \
reprehenderit qui in ea voluptate velit \
esse quam nihil molestiae consequatur, \
vel illum qui dolorem eum fugiat quo \
voluptas nulla pariatur.";

console.log(just(LoremIpsum, 100));