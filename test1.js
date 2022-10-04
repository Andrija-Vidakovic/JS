const myFunction = function () {
  console.log(this);  // this -> global
}

//myFunction1();
// define a function
const myArrowFunction = () => {
  console.log(this);        //this -> {}
};

// call it
//myFunction();

const myObject = {
  name: 'Objekat',

  myMethod: () => {
    console.log(this, this.name); // this.name === undefined
  },                              // nije pogodna za definisanje metoda

  myMethod1: myArrowFunction,         // this->{}

  myMethod2: function () {
    console.log(this, this.name); //this->myObject
  },

  myMethod3: myFunction,         // this->myObject

  myMethod4: null,
  setMethod: function () {
    this.myMethod4 = () => console.log(this);  // this->myObject
  }                                            // kad se definise u methodu pokazuje na myObject
};

myObject.setMethod();
myObject.myMethod();
myObject.myMethod1();
myObject.myMethod2();
myObject.myMethod3();
myObject.myMethod4();
//console.log("zdravo konzolo!");