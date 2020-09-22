
class Department {
    // a field of the class
    // name: string; 
    private employees: string[] = [];

    // constructor method
    constructor(private id: string, public name: string) {
        // this.name = n;
    }

    // this: Department = describe has to be called by an obj of type: Department
    describe(this: Department) {
        console.log(`Deparment:  (${this.id}) ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

 const accounting = new Department('d1','Accounting');

 accounting.addEmployee('Max');
 accounting.addEmployee('Manu');
//  accounting.employees[2] = 'Anna'

 accounting.describe()
 console.log(accounting);

//  const accountingCopy = { name: 'DUMMY', describe: accounting.describe}

 // undefined because `this` refers the accountingCopy obj which calls describe of Department.
 // So if you put a name property to it, it gets printed...
//  accountingCopy.describe() 

