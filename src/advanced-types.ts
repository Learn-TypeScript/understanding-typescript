// ----------------------
// Intersection Types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee {}

// combine types with intersection types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
};

// ------------------------
// Function overload
type Combinable = string | number;
type Numeric = number | boolean;

// describes the types they have in common
type Universal = Combinable & Numeric;

// Type Guards 1.

// If we call this func and both args are number, then it returns a number.
function add1(a: number, b: number): number; // Function overload
function add1(a: string, b: string): string;
function add1(a: string, b: number): string;
function add1(a: number | string, b: number | string): string; // also a string...
function add1(a: Combinable, b: Combinable) {
  // type guard using typeof
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add1(1, 5);
// const result2 = add1('Max', ' Schwarz') as string; // with no function overload
const result3 = add1('Max', ' Schwarz');
result3.split(' '); // with function overload TS can infer that the return type is a string

// -------------------------
// Optional chaning

const fetchedUserData = {
  id: 'u1',
  name: 'Max',
  job: { title: 'CEO', description: 'My own company' } // imagine you get this from a back end
};

console.log(fetchedUserData?.job?.title); // Optional chaning

// ---------------------------------
// Nullish Coalescing:

// try the following: null, undefined, ''
// Note:  an empty string would be fasly so in case of ` '' || DEFAULT `  DEFAULT will be printed out.
const userInput = '';

// const storedData = userInput || 'DEFAULT'; // with || the empty string is falsy so we get DEFAULT
// nullish coalescing detects only  null or undefined.
const storedData = userInput ?? 'DEFAULT';

console.log(storedData);

// Type Guards 2.

type UnknownenEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownenEmployee) {
  console.log('Name ' + emp.name);
  // Problem UnknownEmployee could be a normal Employee that has no privileges.
  // and we cannot fix it with typeof

  // type guard `in`
  if ('privileges' in emp) {
    console.log('Privileges ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('startDate ' + emp.startDate);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

// Type Guards 3.
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // type guard using `instanceof`
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
// ------------------------
// Discriminated Unions
interface Bird {
  // this is a literal type i.e. it's a string and must be 'bird'
  type: 'bird'; // use type or kind: 'bird'
  flyingSpeed: number;
}
interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // We cannot work with instanceof because Bird is an interface and it does not compile to JS
  // if ('flyingSpeed' in animal) {
  //     console.log('Moving with speed: ' + animal.flyingSpeed);
  // }
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
    default:
      break;
  }
  console.log('Moving with speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// ---------------------
// Type casting

// One way:
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// Most common way:
const userInputElement = document.getElementById('user-input') as HTMLInputElement;

// if (userInputElement) {
//     (userInputElement as HTMLInputElement).value = 'Hi there';
// }

userInputElement.value = 'Hi there';

// -----------------------------------
// Index Properties:

// Validate input fields and show some proper message if error occurs.
// Let interface be generic so you can check differnt type of fields (not only email and userName).
// The values should be string, but we don't want to specify the number of the properties,
// neither their names.
// Use index types:
interface ErrorContainer {
  // We could use: {email: 'Not a valid email', username: 'Must start with a character!'}
  // Note in an obj you may have string, number or symbol as a property name, but not a boolean.
  [prop: string]: string;
  // We can add also predefined properties as long as they are of the same type.
  // id: string;
}

const errorBag: ErrorContainer = {
  // 1: 'Not a valid email', // Also OK to use a number as name (it can be interpreted as a string),
  // but not vice versa.
  // So now you can put as many string properties as you need.
  email: 'Not a valid email',
  username: 'Must start with a character!'
};
