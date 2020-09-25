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