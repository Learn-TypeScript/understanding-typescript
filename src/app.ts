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
    // {new(...args: any[]): {name: string}} : It's an object that can be created by using `new`. 
    // So it's a constructor function. 
    return function<T extends {new(...args: any[]): {name: string}}> (originalConstructor: T) { // change type to any so it's not a normal function 
    // create and return a class which creates a constructor.    
    return class extends originalConstructor {
            // Add new functionality
            // ..._: we don't use args so TS should ignore it.
            constructor(..._: any[]) {
                super()
                // Now the template will be rendered to the DOM only if we instantiate an instance of the class.
                console.log('WithTemplate... ' + originalConstructor);
                // creates an instance of the class that is decorated.
                // const p = new originalConstructor(); // no need to call it anymore use `this`

                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template
                    hookEl.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}

@Logger('Logging - Person1')
@WithTemplate('<h1>Adding text to a div using decorators<h1', 'app')
class Person1 {
    name = 'Max';

    constructor() {
        console.log('Creating person object... ')
    }
}

// So now if we don't instantiate Person we don't get the insertion of the h1 to the div, id Max.
// const pers = new Person1(); 
// console.log(pers);

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

// ------------------------------
// 114. Example: Creating an "Autobind" Decorator.
console.log('// ------------------------------');
console.log('114. Example: Creating an "Autobind" Decorator');

// Change the behavior of `this`, so it won't targer the `button` but the `Printer`.
function Autobind(_:any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; // check the log of Log3 to see what `value` is.
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this); // `this` of `get()` is the `Printer`.
            return boundFn;
        }
    }
    return adjDescriptor;
}

class Printer {
    message = 'This works!'

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!; // ! tells TS that the button exists. It's not null.
// Use bind, other wise `this` will refer to the target of the event, ie `button`.
// But with `@Autobind` decorator, we don't need `bind`
// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);



