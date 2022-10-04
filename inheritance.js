function Hero(name, level) {
    this.name = name;
    this.level = level;
    this.getName = function () {
        return this.name;
    };
}
Hero.prototype.id = "id";
Hero.prototype.hello = function () {
    console.log("hello");
}
Hero.prototype.goodbye = function () {
    console.log('zbogom');
}
/**  End Hero  **/


function Warrior(name, level, weapon) {
    Hero.call(this, name, level);
    //this.weapon = weapon;
}
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Warrior.prototype.attack = function () {
    console.log('napad');
}

/** End Warrior **/

function Conan(name, level, weapon, lady) {
    Warrior.call(this, name, level, weapon);
    this.lady = "Sonja";
}
Object.setPrototypeOf(Conan.prototype, Warrior.prototype);

/** End Conan **/

let hero = new Hero('Joca', 1);
let warrior = new Warrior('Gomboca', 2, 'sekira');


console.log(hero);
console.log(warrior);
console.log('--------------------------');

function single() {
}

single.f = function () {
}

console.log(single);