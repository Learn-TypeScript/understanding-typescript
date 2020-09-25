console.log('Decorators');

function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    
    return function(constructor: Function) {
        console.log('Logging... ' + constructor);
        console.log('logString... ' + logString);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function (constructor: any) { // change type to any so it's not a normal function 
        console.log('WithTemplate... ' + constructor);
        const p = new constructor(); // creates an instance of the class that is decorated.
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
            hookEl.innerHTML = template
            hookEl.querySelector('h2')!.textContent = p.name
        }
    }
}

@Logger('Logging - Person1')
@WithTemplate('<h2>Adding text to a div using decorators<h2', 'app')
class Person1 {
    name = 'Max';

    constructor() {
        console.log('Creating person object... ')
    }
}

const pers = new Person1();
console.log(pers);

// ------------------------------
// 109. Diving into Property Decorators
console.log('// ------------------------------');
console.log('Diving into Property Decorators');


function Log(target: any, propertyName: string | Symbol) {
    console.log('Log!, target ',  target);
    console.log('Log! propertyName ', propertyName);
}

function Log2(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log('Log2!, target ',  target);
    console.log('Log2! propertyName ', propertyName);
    console.log('Log2! descriptor ', descriptor);
    
 }

function Log3(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    console.log('Log3!, target ',  target);
    console.log('Log3! propertyName ', propertyName);
    console.log('Log3! descriptor ', descriptor);
    
 }

function Log4(target: any, propertyName: string, position: number) {
    console.log('Log4!, target ',  target);
    console.log('Log4! propertyName ', propertyName);
    console.log('Log4! position ', position);
    
 }
class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set Price(val: number) {
        if (val) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive.')
        }
    }

    constructor(t: string, p: number){
        this.title = t;
        this._price = p
    }

    @Log3
    getPriceWithTax(@Log4 tax: number){
        return this._price * (1  + tax)
    }
}
