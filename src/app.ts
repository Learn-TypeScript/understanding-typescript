type Admin = {
    name: string;
    privileges: string[];
}

type Empoloyee = {
    name: string;
    startDate: Date;
}

// combine types with intersection types
type ElevatedEmployee = Admin & Empoloyee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}