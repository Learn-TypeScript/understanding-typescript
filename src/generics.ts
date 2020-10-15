// ----------------------
// Build in generics
// Array is a generic type and requires 1 type argument, e.g. string.
// const names: Array<string> = [] //  the same like: string[]
// names[0].split(' ')

// Promises are also generic
// // Give generic type so TS knows what this function will wield.
// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout( () => {
//         resolve('This is done!')
//     } , 2000)
// })

// promise.then(data => {
//     data.split(' ');
// })

//-----------------------------
// Creating a generic function

// Working with constrains: T extends object So now we're forced to call merge with 2 objects.
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// With generics, TS can infer the name and age properties.
// const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30})
const mergedObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergedObj.age);

//---------------------------------
// Another Generic function

interface Lengthy {
  length: number;
}

// we return a tuple
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length > 0) {
    descriptionText = 'Got ' + element.length + ' element(s)';
  }
  return [element, descriptionText]; // tuple: An array with fixed length and fixed type
}

console.log(countAndDescribe('Hi there!'));

//---------------------------------
// The "keyof" constrain: U extends keyof T

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');

//---------------------------------
// Generic Classes
// Note check also the last lecture: "Generic Types vs Union Types".
// It explains that with generics, we get an array
// that is either full with strings, or nubmers ...
// But with Union Types, we get an array with mixed string, number etc values.
// Even if we set it to be string[] etc, then we wouldn't be able to use addItem...

// Better set ...extends string | number | boolean so it won't be able to work with objects.
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

// Create different storages
// Flexible but still strongly typed!
const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const textStorage2 = new DataStorage<number>();
const textStorage3 = new DataStorage<number | string>();

// Working with objects:
// Objects work with reference types.

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: 'Max' });
// objStorage.addItem({ name: 'Manu' });
// //...
// // Technically {name: 'Max'} is a new object and has a different address.
// // So indexOf returns -1 because it doesn't find it, thus it starts at the end of the array (vanila JS behavior)
// // and splice removes the last item of the array!
// console.log(objStorage.getItems());
// // But if we use the same object then it will work.
// const maxObj = { name: 'Max' };
// objStorage.addItem(maxObj);
// console.log(objStorage.getItems());
// objStorage.removeItem(maxObj);

// console.log(objStorage.getItems());

//---------------------------------
// Generic Utility Types:
// Partial
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

// This is correct, but we'll use something else.
// function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
//     return { title: title, description: description, completeUntil: date}
// }

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  // Partial indicates that courseGoal is an obj that in the end will be a CourseGoal.
  // But with Partial all the properties that courseGoal should have are optional.
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  // Use type casting to set it to CourseGoal because it's still a Partial<CourseGoal>
  // other wise it will through an error, because courseGoal is initially empty.
  return courseGoal as CourseGoal;
}

// ------------
// Readonly can be also used in objects
const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu')// not possible
