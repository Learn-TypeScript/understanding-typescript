// refreshment
// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number
} 

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2
}

// This also works. No error! 
// add = (n1, n2) => {
//   return n1 + n2
// }

interface Named {
  readonly name?: string;
  outputName?: string
}

// interface Greetable extends Named, AnoherInterface {
interface Greetable extends Named {
    greet(phrase: string): void;
  }
  
  // class Person implements Greetable, Named {
  class Person implements Greetable, Named {
    name?: string;
    age = 30;
  
    // You can also pass a default value n: string = ''
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