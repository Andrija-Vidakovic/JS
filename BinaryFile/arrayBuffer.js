
// ArrayBuffer se ne moze inicijalizovati !!!
// predstavlja samo memoriju!!!
const arrayBuffer = new ArrayBuffer(6);
const int16Array = new Int16Array(arrayBuffer);
int16Array[0] = 1;
int16Array[1] = 513;
const uint8array = new Uint8Array(arrayBuffer);

// Buffer from Uint8Array
const buf1 = Buffer.from(uint8array.buffer, 2, 4);

console.log(int16Array);
console.log(uint8array);
console.log(buf1);

console.log(Buffer.from("Zdravo svete!"));
//console.log(buf.toString('base64'));
