[Understanding TypeScript - 2020 Edition](https://www.udemy.com/course/understanding-typescript/)

Don't limit the Usage of TypeScript to Angular! Learn the Basics, its Features, Workflows and how to use it!

Created by Maximilian Schwarzmüller

### Notes:

1. **Getting Started**

- What is JS:
  - TS is a JavaScript superset. Adds new features and advantades to JS. A language building up on JS.
  - Browser can not execute it! TS is a compiler which you run over your code to compile to JS.
  - The TS compiler compiles the new features to JS "workarounds" and possible errors are thrown. This can give you a nices syntax!
- TS adds:
  - **types**. So you can identify errors earlier.
  - Next-gen JS features (compliled down for older Browsers).
  - Non-JS features like Interfaces or Generics.
  - Meta-Programming features like Decorators.
  - / has Rich Configuration Options
  - Modern Tooling that helps even in non TS Projects. e.g. VS code, uses TS in JS projects...
  - Use of **lite-server**

2. **TypeScript Basics & Basic Types**
   - Core Types:
     - `number` no floats etc.
     - `string`
     - `boolean`
     - `objects` Any Js object but also more specific types of objects are possible.
     - `Array` Any JS array - type can be flexible or strict regarding the element types.
   - extra types:
     - `Tuple` An array but with fixed length and fixed type. eg `[number, string]`
     - `Enums: {NEW, OLD}` Added by TypeScript: Automatically enumerated global constant identifiers. Specifiek identifiers    global constants, which may be represented as numbers, but we assign a human readable lable.
     - `any` Any kind of value, no specific type assignment.
     - `union` eg `number | string`
     - `literal` eg `'as-number' | 'as-text'` = union type, combined with literal types
     - `Type Aliases / Custom Types`: eg `type Combinable = number | string;` Create a new type which stores a union type. 
     - `Type Aliases & Object Types`: Type aliases can be used to "create" your own types. You're not limited to storing       union types though - you can also provide an alias to a possibly complex object type.

       For example:

        ```js
            type User = { name: string; age: number };
            const u1: User = { name: 'Max', age: 30 }; // this works!
            // This allows you to avoid unnecessary repetition and manage types centrally.

            // For example, you can simplify this code:

            function greet(user: { name: string; age: number }) {
            console.log('Hi, I am ' + user.name);
            }

            function isOlder(user: { name: string; age: number }, checkAge: number) {
            return checkAge > user.age;
            }
           // To:

            type User = { name: string; age: number };

            function greet(user: User) {
            console.log('Hi, I am ' + user.name);
            }

            function isOlder(user: User, checkAge: number) {
            return checkAge > user.age;
            }
        ```
        - `Functions` as Types: eg `let combineValues: Function` or `let combineValues: (a: number, b: number) => number`
        - `Function Types & Callbacks`: 
            ```js 
            funtion addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
                const result = n1 + n2;
                cb(result)
            }

            addAndHandle(10, 20, result => {
                console.log(result);
            })
            ```
        - `unknown` It's a bit more restrictive then `any`. eg you cannot assign an unknown value to a varible of string type. But you can with `any`. 
        - `never` eg If a function doesn't return anything but also throws an error...  

