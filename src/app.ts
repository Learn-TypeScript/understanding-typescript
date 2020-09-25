console.log('Decorators');

function Logger(logString: string) {
    return function(constructor: Function) {
        console.log('Logging... ' + constructor);
        console.log('logString... ' + logString);
    }
    
}

@Logger('Logging - Person1')
class Person1 {
    name = 'Max';

    constructor() {
        console.log('Creating person object... ')
    }
}

const pers = new Person1();
console.log(pers);