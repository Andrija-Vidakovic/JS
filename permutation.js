function permutations(string) {
    
    let set = new Set();
    heaps(string.split(''), string.length);
    return Array.from(set);

    // Hoisting...
    function heaps(niz, k) {

        if (k == 1)
            set.add(niz.join(''));
        else {
            for (let i = 0; i < k; i++) {
                heaps(niz, k - 1);
                if (k % 2 == 0)
                    swap(i, k - 1);
                else
                    swap(0, k - 1);
            }
        }

        function swap(i, j) {
            let tmp = niz[i];
            niz[i] = niz[j];
            niz[j] = tmp;
        }
    }
}

function findPermutations(string) {

    if (!string || typeof string !== "string") {
        return "Please enter a string"
    } else if (string.length < 2) {
        return string
    }

    let permutationsArray = []

    for (let i = 0; i < string.length; i++) {
        let char = string[i]

        let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)

        for (let permutation of findPermutations(remainingChars)) {
            permutationsArray.push(char + permutation)
        }
    }
    return permutationsArray
}

console.log(permutations('aabb'));
//console.log(findPermutations('1234'));
let a=[];
let b=[];
console.log(a===b);