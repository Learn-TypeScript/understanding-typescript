
class Department {
    // a field of the class
    // name: string; 
    private employees: string[] = [];

    // constructor method
    // readonly exist only in TS
    constructor(private readonly id: string, public name: string) {
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

class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins

    }
}

class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
    }

    addReport(text: string) {
        this.reports.push(text)
    }

    printReports() {
        console.log(this.reports);
        
    }
}

 const it = new ITDepartment('d1', ['Max']);

 it.addEmployee('Max');
 it.addEmployee('Manu');
//  it.employees[2] = 'Anna'

 it.describe()
 console.log(it);

 const accounting = new AccountingDepartment('d2', [])

 console.log(accounting);
 
 accounting.addReport('Something went wrong!')
 accounting.printReports()

//  const accountingCopy = { name: 'DUMMY', describe: accounting.describe}

 // undefined because `this` refers the accountingCopy obj which calls describe of Department.
 // So if you put a name property to it, it gets printed...
//  accountingCopy.describe() 

