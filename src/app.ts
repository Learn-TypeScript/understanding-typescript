interface Admin {
    name: string;
    privileges: string[];
}

interface Employee {
    name: string;
    startDate: Date;
}

interface ElevatedEmployee extends Admin, Employee {}

// combine types with intersection types
// type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

// describes the types they have in common
type Universal = Combinable & Numeric

function add(a: Combinable, b: Combinable) {
    // type guard using typeof
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    } 
    return a + b;
}