
class Department {
    static fiscalYear = 2020
    // a field of the class
    // name: string; 
    // private employees: string[] = [];
    protected employees: string[] = [];

    // constructor method
    // readonly exist only in TS
    constructor(private readonly id: string, public name: string) {
        // this.name = n;
    }

    static createEmployee(name: string) {
        return {name: name}
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
    private lastReport: string;

    get mostRecentReport () {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.')
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error('Please pass in a valid value!')
        }
        this.addReport(value)
    }

    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0]
    }

    addEmployee(name: string){
        if (name === 'Max') {
            return;
        } 
        this.employees.push(name)
    }

    addReport(text: string) {
        this.reports.push(text)
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    printEmployeeInformation() {
        console.log('Employee Information: ',this.employees.length);
        
    }
}

const employee1 = Department.createEmployee('Max');
console.log('employee1', employee1, Department.fiscalYear);


 const it = new ITDepartment('d1', ['Max']);

 it.addEmployee('Max');
 it.addEmployee('Manu');
//  it.employees[2] = 'Anna'

 it.describe()
 console.log(it);

 const accounting = new AccountingDepartment('d2', [])

 console.log(accounting);
 
 
 accounting.addReport('Something went wrong!')
 accounting.mostRecentReport = 'Year end report'
 console.log('accounting.mostRecentReport', accounting.mostRecentReport);
 accounting.printReports()
 accounting.addEmployee('Max')
 accounting.addEmployee('Fotios')
 accounting.printEmployeeInformation()

//  const accountingCopy = { name: 'DUMMY', describe: accounting.describe}

 // undefined because `this` refers the accountingCopy obj which calls describe of Department.
 // So if you put a name property to it, it gets printed...
//  accountingCopy.describe() 

