
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

