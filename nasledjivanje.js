//----------------------------------------------------------------------
// funkcija sa statickom varijablom, vraca broj poziva
let counter = (function () {
    let count = 0;                  // staticka varijabla
    return function () {
        return count++;
    }
})();

console.log('-----------------start counter() test-------------');
console.log(counter());
console.log(counter());
console.log(counter());
console.log('-----------------end counter() test---------------');
//----------------------------------------------------------------------

// funkcija konstruktor klase
function Test(name = 'test', id = 1) {
    this.name = name;            // javni clanovi
    this.id = id;

    let c = 0;                  // privatna varijabla
    this.counter = function () {
        return c++;
    }

    let msg = "Zdravo!";            // privatni clan objekta
    function proba() {              // privatna funkcija objekta
        console.log("Proba");
    }
}

Test.staticFunc = function () {     // staticka funkcija clase NE nasledjuje se
    console.log("Hello!");
}
Test.staticProp = "static ccc..";   // staticki clan klase NE nasledjuje se

Test.prototype.getId = function () {    // dodavanje funkcije u prototip
    return this.id;
}
Test.prototype.pr = "Prototip prop...";
//----------------------------------------------------------------------
//> Nasledjivanje
function TestNaslednik(name = "chld", id = 1) {
    Test.call(this, name, id);                        // funkcija konstruktor osnovne klase
    this.mouse = "<-3)--";
}

Object.setPrototypeOf(TestNaslednik.prototype, Test.prototype);    // nasledjivanje prototipa
//----------------------------------------------------------------------

t = new TestNaslednik();
t.counter();
console.log(t.counter());
console.log(t.counter());

console.log(t.getId());                 // nasledjeno
console.log(Test.staticProp);
console.log(TestNaslednik.staticProp);  // ovo nije nasledjeno
console.log('------------------------------');

console.log(t.pr);
console.log(TestNaslednik.pr);

console.log(Test.staticProp);
Test.staticFunc();

console.log(TestNaslednik.staticProp);   // nije nasledjeno
//TestNaslednik.staticFunc();  // nije nasledjeno
