Array.prototype.sameStructureAs = function (other) {
    // Return 'true' if and only if 'other' has the same
    // nesting structure as 'this'.

    // Note: You are given a function isArray(o) that returns
    // whether its argument is an array.
    if (!Array.isArray(other)) return false;
    if (this.length != other.length) return false;

    for (let i = 0; i < this.length; i++) {
        if (!(Array.isArray(this[i]) ^ Array.isArray(other[i]))) {
            if (Array.isArray(this[i])) {
                return this[i].sameStructureAs(other[i]);
            }
        }
        else
            return false;
    }
    return true;
};

/**
 * Izracunava broj nacina na koji moze biti formirana 
 * suma od zadatih apoena
 * @param {*} sum zeljeni iznos
 * @param {*} coins kovanice
 * @param {*} index nula
 * @returns broj mogucih nacina vracanja sume
 */
function countChange(sum, coins, index = 0) {
    let ret = 0;
    if (sum == 0) return 1;
    for (let i = index; i < coins.length; i++) {
        //console.log(`(${index},${i})`);
        if (sum - coins[i] >= 0)
            ret += countChange(sum - coins[i], coins, i);
    }
    return ret;
}

function sumOfDivided(lst) {
    function factoring(num) {
        const nextPrime = function (prime) {
            let next = prime + 1;
            while (!isPrimeWiki(next))
                next++;
            return next;
        }
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

        let ret = [];
        let prime = 2;
        num = num < 0 ? -num : num
        while (num != 1) {
            if (num % prime == 0) {
                ret.push(prime);
                num /= prime;
            }
            else
                prime = nextPrime(prime);
        }
        return ret;
    }


    let set = new Set();

    for (let item of lst) {
        let factors = factoring(item);
        for (let e of factors)
            set.add(e);
    }

    set = new Set(Array.from(set).sort((a, b) => a - b));

    let ret = [];
    for (s of set) {
        let sum = 0;
        for (e of lst) {
            if (e % s == 0)
                sum += e;
        }
        ret.push([s, sum]);
    }

    return ret;
}

/**
 * Najblizi veci broj datom broju
 * @param {integer} num 
 * @returns 
 */
function nextBiggerNum(num) {

    function swap(i, j) {
        if (i == j) return;
        let tmp = strNum[i];
        strNum[i] = strNum[j];
        strNum[j] = tmp;
    }

    function sort(k) {
        for (let i = k; i < strNum.length - 1; i++)
            for (let j = i + 1; j < strNum.length; j++) {
                if (strNum[i] > strNum[j])
                    swap(i, j);
            }
    }

    function minLimit(k) {
        let iMin = k + 1;
        for (let i = k + 2; i < strNum.length; i++) {
            if (strNum[i] < strNum[iMin] && strNum[i] > strNum[k]) {
                iMin = i;
            }
        }
        return iMin;
    }

    let strNum = num.toString().split('');
    let ret = -1;
    for (let i = strNum.length - 1; i > 0; i--) {
        if (strNum[i] > strNum[i - 1]) {
            let minIndex = minLimit(i - 1);
            swap(minIndex, i - 1)
            sort(i);

            ret = +strNum.join('');
            break;
        }
    }
    return ret;
}

const numToWord = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'then',
    11: 'eleven',
    12: 'twelve',
    13: 'therteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
    100: 'hundred',
    1000: 'thausend',
    'mil': 'million'
}

numToWord.decode = function (num) {
    let ret = '';
    let digit = num.toString().split('');
    let len = digit.length;


    if (len == 1) return this[digit[len - 1]]

    if (len == 4) {
        ret = this[digit[len - 4]] + ' ' + this[1000] + ' ';
    }

    if (len >= 3) {
        ret = ret + this[digit[len - 3]] + ' ' + this[100] + ' ';
    }

    if (len >= 2) {
        if (digit[len - 2] == 1)
            ret = ret + this[digit[len - 2] + digit[len - 1]];
        else {
            if (digit[len - 2] != 0)
                ret = ret + this[digit[len - 2] * 10] + '-' + this[digit[len - 1]];
            else {
                if (digit[len - 1] != 0)
                    ret = ret + this[digit[len - 1]];
            }
        }
    }

    return ret;
}

/**
 * Funkcija izracunava detrminantu matrice NxN
 * @param {number} mat matrica NxN
 * @returns determinanta matrice
 */
function det(mat) {
    if (mat.length == 1) {
        return mat[0][0];
    }

    if (mat.length == 2) {
        let ret = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
        return ret;
    }

    let sum = 0;
    let znak = 1;
    for (let j = 0; j < mat.length; j++) {
        sum += mat[0][j] * det(reduce(mat, 0, j)) * znak;
        znak = znak * (-1);
    }
    return sum;

    function reduce(niz, i, j) {
        let ret = niz.filter((e, index) => {
            if (index == i)
                return false;
            return true;
        }).map(e => e.filter((e, k) => k != j));
        return ret;
    }
}

function minSum(niz) {
    let flag = true;
    while (flag) {
        flag = false;
        for (let i = 0; i < niz.length - 1; i++) {
            reduce(i, i + 1);
        }
    }
    return niz.reduce((prev, curr) => prev + curr, 0);
    //return niz;

    function reduce(i, j) {
        while (niz[i] != niz[j]) {
            if (niz[i] > niz[j]) {
                let tmp = niz[i] % niz[j];
                if (tmp == 0)
                    niz[i] = niz[j];
                else
                    niz[i] = tmp
            }
            else {
                let tmp = niz[j] % niz[i];
                if (tmp == 0)
                    niz[j] = niz[i];
                else
                    niz[j] = tmp;
            }
            flag = true;
        }
    }
}
// const gcd = (a, b) =>
//   b ? gcd(b, a % b) : a;

/**
 * Najveci zajednicki delilac
 * @param {number} a 
 * @param {number} b 
 * @returns 
 */
function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
}

/**
 * Najmanji zajednicki sadrzilac
 * @param {number} a 
 * @param {number} b 
 * @returns 
 */
function lcm(a,b){
    return a*b/gcd(a,b)
}

console.log(gcd(20, 15));
console.log(lcm(20, 15));