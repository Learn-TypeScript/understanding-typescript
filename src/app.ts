
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
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1000)
    }
}

useVehicle(v1)
useVehicle(v2)