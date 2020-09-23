
type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

// interface ElevatedEmployee extends Admin, Employee {}

// combine types with intersection types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

// describes the types they have in common
type Universal = Combinable & Numeric

function add1(a: Combinable, b: Combinable) {
    // type guard using typeof
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    } 
    return a + b;
}

type UnknownenEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownenEmployee) {
    console.log('Name ' + emp.name);
    // Problem UnknownEmployee could be a normal Employee that has no privileges.
    // and we cannot fix it with typeof 
    if ('privileges' in emp) {
        console.log('Privileges ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('startDate ' + emp.startDate);
    }
}

printEmployeeInformation(e1)

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

function useVehicle(vehicle: Vehicle) {
    vehicle.drive()
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000)
    }
}

useVehicle(v1)
useVehicle(v2)

interface Bird {
    // this is a literal type
    type: 'bird'; // or kind: 'bird'
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
            speed = animal.flyingSpeed
            break;
        case 'horse':
            speed = animal.runningSpeed
            break;
        default:
            break;
    }
    console.log('Moving with speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10})

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
const userInputElement = document.getElementById('user-input') as HTMLInputElement;

// if (userInputElement) {
//     (userInputElement as HTMLInputElement).value = 'Hi there';
// }

userInputElement.value = 'Hi there';
