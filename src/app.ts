
// Array is a generic type and requires 1 type argument like eg string.
// const names: Array<string> = [] //  = string[]
// names[0].split(' ')

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
// Creating a generic function:
// Working with constrains: T extends object,
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}
// With generic TS can infer the name and age properties. 
// const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 30})
const mergedObj = merge({name: 'Max'}, {age: 30})
console.log(mergedObj.age);

//---------------------------------
// Another Generic function

interface Lengthy {
    length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value';
    if (element.length > 0) {
        descriptionText = 'Got ' + element.length + ' element(s)';
    }
    return [element, descriptionText] // tuple: An array with fixed length and fixed type
}

console.log(countAndDescribe('Hi there!'));

//---------------------------------
// The "keyof" constraint: U extends keyof T
function extractAndConvert<T extends object, U extends keyof T> (obj: T, key: U) {
    return 'Value ' + obj[key]
}

extractAndConvert({name: 'Max'}, 'name')

//---------------------------------
// Generic Classes
class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

// Create different storages
const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max')
console.log(textStorage.getItems())

const textStorage2 = new DataStorage<number>();
const textStorage3 = new DataStorage<number | string>();


