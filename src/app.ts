console.log('Decorators');

function Logger(logString: string) {
  console.log('LOGGER FACTORY');

  return function(constructor: Function) {
    console.log('Logging... ' + constructor);
    console.log('logString... ' + logString);
  };
}
// WithTemplate is a decorator factory!
function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  // {new(...args: any[]): {name: string}} : It's an object that can be created by using `new`.
  // So it's a constructor function.
  return function<T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
    // change type to any so it's not a normal function
    // create and return a class which creates a constructor.
    // In a class decorator we can return a constructor which depends on the old one
    // so we can keep all the properties of the class, and will replace the old one.
    return class extends originalConstructor {
      // Add new functionality
      // ..._: we don't use args so TS should ignore it.
      constructor(..._: any[]) {
        // with super() we save the original constructor
        super();
        // Now the template will be rendered to the DOM only if we instantiate an instance of the class.
        // Not when it's just defined, like previously.
        console.log('WithTemplate... ' + originalConstructor);
        // creates an instance of the class that is decorated.
        // const p = new originalConstructor(); // no need to call it anymore use `this`

        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

@Logger('Logging - Person1')
@WithTemplate('<h1>Adding text to a div using decorators<h1', 'app')
class Person1 {
  name = 'Max';

  constructor() {
    console.log('Creating person object... ');
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
  console.log('Log!, target ', target);
  console.log('Log! propertyName ', propertyName);
}

function Log2(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  console.log('Log2!, target ', target);
  console.log('Log2! propertyName ', propertyName);
  console.log('Log2! descriptor ', descriptor);
}

function Log3(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  console.log('Log3!, target ', target);
  console.log('Log3! propertyName ', propertyName);
  console.log('Log3! descriptor ', descriptor);
}

function Log4(target: any, propertyName: string, position: number) {
  console.log('Log4!, target ', target);
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
      throw new Error('Invalid price - should be positive.');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// ------------------------------
// 114. Example: Creating an "Autobind" Decorator.
console.log('// ------------------------------');
console.log('114. Example: Creating an "Autobind" Decorator');

// Change the behavior of `this`, so it won't targer the `button` but the `Printer`.
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // check the log of Log3 to see what `value` is.
  /* enumerable: false
  value: ƒ getPriceWithTax(tax)
  writable: true
  __proto__: Object */
  const originalMethod = descriptor.value; // get the name of the function
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); // `this` of `get()` is the `Printer`.
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

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

// ------------------------------
// Validation with Decorators
console.log('// ------------------------------');
console.log('Validation with Decorators');

// With a decorator we can include a validation in the Course class

// configure the storage we have to work with
interface ValidatorConfig {
  // index type notation
  // [property: string] is the class name for which we want to register some validation props
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

// Initially it's an empty obj, because nothing is validated at the beginning.
const registeredValidators: ValidatorConfig = {};

// With the Decorators we'll add validators to the registeredValidators.
// This is what target returns, for Log2 (above).
/* constructor: class Product
arguments: (...)
caller: (...)
length: 2
name: "Product" */
// A property decorator object, takes in 2 properties.
function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    // We first retrive any existing validators, then copy them into the array,
    // because if we had other validators for this prop they would be overrided.
    // If we have other validators add them, else add nothing ([]) and then add the 'required' validator.
    // [...(registeredValidators[target.constructor.name] ? [propName] : []), 'required']
    ...registeredValidators[target.constructor.name], // price or title
    [propName]: [...(registeredValidators[target.constructor.name] ? [propName] : []), 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name] ? [propName] : []), 'positive']
  };
}

// Runs through all registered validators and runs different logic, based on the validators.
function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  // If we try to find and obj for which nothing was registered.
  if (!objValidatorConfig) {
    return true; // There is nothing to validate, so it's valid!
  }
  console.log('objValidatorConfig ', objValidatorConfig);
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log('objValidatorConfig[prop] ', objValidatorConfig[prop][0]);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
        default:
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault(); // so we don't submit the form and don't send HTTP request.
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  // Create a new Course with the above info.
  const createdCourse = new Course(title, price);

  console.log('!validate(createdCourse) ', !validate(createdCourse));

  if (!validate(createdCourse)) {
    alert('Invalid input ...');
    return;
  }
  console.log(createdCourse);
});
