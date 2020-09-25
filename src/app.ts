console.log('Decorators');

function Logger(constructor: Function) {
    console.log('Logging... ' + constructor)
}

@Logger
class Person1 {
    name = 'Max';

    constructor() {
        console.log('Creating person object... ')
    }
}

const pers = new Person1();
console.log(pers);