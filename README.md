[Understanding TypeScript - 2020 Edition](https://www.udemy.com/course/understanding-typescript/)

Don't limit the Usage of TypeScript to Angular! Learn the Basics, its Features, Workflows and how to use it!

Created by Maximilian Schwarzmüller

### Notes:
run: 
`tsc src/app.ts --watch`
or
`tsc src/app.ts -w`
or 
`tsc -w`

1. **Getting Started**
    - What is TS:
        - TS is a JavaScript superset. Adds new features and advantages to JS. A language building up on JS.
        - Browsers can not execute it! TS is a compiler which you run over your code to compile to JS.
        - The TS compiler compiles the new features to JS "workarounds" and possible errors are thrown. This can give you a nicer syntax!
    - TS adds:
        - Types: So you can identify errors earlier.
        - Next-gen JS features (compliled down for older Browsers).
        - Non-JS features like Interfaces or Generics.
        - Meta-Programming features like Decorators.
        - TS has Rich Configuration Options
        - Modern Tooling that helps even in non TS Projects. e.g. VS code, uses TS in JS projects...
    - Use of `lite-server`
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
    - `never` If a function doesn't return anything and also throws an error... then this function doesn't return anything eg cb: (num: number) => never 
3. **The TypeScript Compiler (and its Configuration)**
    - run `tsc app.ts -w` to enter watch mode. You can quite with `ctrl + C`. With watch mode you don't have to run `tsc fileName.ts` all the time. It runs automatically when saving the file.
    - run `tsc --init` to tell TS that all the files here are one project. It will create the  `tsconfig.json` file ...
    - You can exclude files from compiling by puting them in the `exclude` in `tsconfig.json` 
      eg:
        ```js
            },
            "exclude": [
                "analytics.ts"
            ]
        }
        ```
      You can also use a wildcard like: `*.dev.ts`. Or like: `**/*dev.ts`. Note: by default "node_modules" is excluded.
    - You can also `include` files. But then if you ommit one, it will not be compiled.
    - In `tsconfig.json` `"lib": []` lets you specify which default objects and features TS knows. eg with the DOM. Like how does TS know what a  `button` is...? So, if it's not set in `config` it takes the defaults according to the `target`.
    This is the default:
        ```js
        "lib": [
        "DOM",
        "ES6",
        "dom.iterable",
        "ScriptHost"
        ], 
        ```
    - `allowJs` set js files you want to be compiled
    - `"sourceMap": true`, generates extra files that the browsers can read and in this way you get also the .ts files in chrome dev tools, which helps a lot with debuging.
    - `"outDir": "./"` : You can move all the .js files to a `dist` folder and specify the path here, so TS will know where to look. Don't forget to change the path also in index.js
    - `"rootDir": "./"` Set the folder where the .ts files are.
    - `"noEmitOnError": true`: Does not compile the files if there is an error.
    - These links might also be interesting:
        - tsconfig Docs: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
        - Compiler Config Docs: https://www.typescriptlang.org/docs/handbook/compiler-options.html
        - VS Code TS Debugging: https://code.visualstudio.com/docs/typescript/typescript-debugging    
4. **Next-generation JavaScript & TypeScript** 
    - About let, const etc...
5.  - **Classes & Interfaces** ...
        - An interface describes the structure of an object. Use it to type-check an object. But why not use just `custom types` then?
         - Differences between `interfaces` and `custom types`:
            1. Interfaces only describe the structure of an object. In custom types you can use also store other things like `union types` etc. So when using an interface it's clear you want to describe the structure of an object.
            2. You can implement an interface inside a class. It can be used as a contract a class can implement and then has to adhere to. Then you can share an interface among different classes. Note: A class may implement multiple interfaces. 
            3. We can implement `Inheritance` in interfaces by extending in an interface another one, or even multiple.
            4. With Interfaces you can describe the structure of a function too. But probably it's a bit more common to use custom types.
            5. Interfaces: mark properties as optional by adding a `?` after the property. Note: You can also mark methods as optional: `myMethod?(){}`. And also parameters of methods...
    - These links might also be interesting:
        - More on (JS) Classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
        - More on TS Interfaces: https://www.typescriptlang.org/docs/handbook/interfaces.html
6.  - **Advanced Types**
        - Intersection types: Allow as to combine other types. They are close related to interface inheritance. But with interfaces we use more code. Note: You can use intersection types not only with objects but with any types. eg with union types you get the types that 2 union types have in common. 
        - Type guards: 
            1. `typeof`
            2. `in`
            3. `instanceof`
        - Discriminated Unions: It's a pattern to use with union types and make working with type guards easier.
        - Type Casting: You can say TS that some value is of specifiek type!
        - Index Properties: Allows to create objects that are more flexible regarding the properties they might hold.
        - Function Overloads: Allows us to define multiple function signatures, for one function. ie multiple ways of calling a function with different parameters. Use it when TS cannot infer correctly the return type.
        - Optional Chaining: Let's say you get data from a back end, and you don't know if in an object a certain property is defined. Use optional chaining to not get a runtime error.
        - Nullish Coalescing: Manage nullish or undefined data.
        - These links might also be interesting:
            - More on Advanced Types: https://www.typescriptlang.org/docs/handbook/advanced-types.html

