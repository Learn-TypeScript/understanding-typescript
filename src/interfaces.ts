// Use an interface to type-check an object.
interface Player {
  name: string;
  age: number;

  greet(phrase: string): void;
}

/* We could also use a custom type instead of an interface
type Player = {
  name: string;
  age: number;

  greet(phrase: string): void;
}
The difference is that interfaces are used to describe the type of an object,
but you can not store in there other things like union types, as you can with custom types. 
But when you define an interface, 
it is clear that you want to define the structure of an object.
The other thing is that you may implement an interface inside of a class. 
It can be used as a contract a class can implement, and then has to adhear to.
Check Greatable below.
*/

let player1: Player;

player1 = {
  name: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(`${phrase} ${this.name} and my age is ${this.age}`);
  },
};

player1.greet('Hi there I am ');

// type AddFn = (a: number, b: number) => number; // more common
// You can use an interface to set the type for a function
// NOTE: It doesn't have a name like: greet(phrase: string): void;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};

// This also works. No error!
// add = (n1, n2) => {
//   return n1 + n2
// }

interface Named {
  readonly name?: string;
  outputName?: string;
}

// interface Greetable extends Named, AnotherInterface, etc {
interface Greetable extends Named {
  greet(phrase: string): void;
}

// class Person implements Greetable, Named {
class Person implements Greetable, Named {
  name?: string;
  age = 30;

  // You can also pass a default value, like (n: string = '')
  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    }
    console.log('hi');
  }
}

let user1: Greetable;

user1 = new Person();

user1.greet('Hi there - I am');
console.log('user1', user1);
