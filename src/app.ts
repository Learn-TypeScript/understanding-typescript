
// Array is a generic type and requires 1 type argument like eg string.
const names: Array<string> = [] //  = string[]
names[0].split(' ')

// Give generic type so TS knows what this function will wield.
const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout( () => {
        resolve('This is done!')
    } , 2000)
})

promise.then(data => {
    data.split(' ');
})