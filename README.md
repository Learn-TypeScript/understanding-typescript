[Understanding TypeScript - 2020 Edition](https://www.udemy.com/course/understanding-typescript/)

Don't limit the Usage of TypeScript to Angular! Learn the Basics, its Features, Workflows and how to use it!

Created by Maximilian Schwarzmüller

### Notes:

- In the beginning we had to run `tsc fileName.ts` to compile the ts code to js. Then we used the watch mode. To enter watch mode, run:

  - `tsc src/app.ts --watch`

  or

  - `tsc src/app.ts -w`

  or

  - `tsc -w`

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
     - Then run `npm init` to then be able to install `lite-server` with `npm intall --save-dev lite-server`. Then got to package.json and add a `start` cmd to run it.

       ```js

       "scripts": {
           "start": "lite-server"
           },
       ```

2. **TypeScript Basics & Basic Types**

   - Core Types:
     - `number` no floats etc.
     - `string`
     - `boolean`
     - `objects` Any Js object but also more specific types of objects are possible.
     - `Array` Any JS array - type can be flexible or strict regarding the element types.
   - extra types:

     - `Tuple` An array but with fixed length and fixed type. eg `[number, string]` . Note: You can assing new values to a tuple, and if you mix the order, you'll get an error. But if you use `push` you don't get an error! Further if you try to add more elements, you get an error!
       ```js
       const role: [number, string] = [2, `author`];
       role[1] = 10; // error
       role.push('admin'); // No error
       role = [0, 'admin', 'user']; // error
       ```
     - `Enums: {NEW, OLD}` Loosly related to the idea of `tuble` is the idea of having identifiers, global constants, which you want to represent as numbers, but you want to assign a human readable label. Added by TypeScript: Automatically enumerated global constant identifiers, i.e. add labels to numberss. Specifiek identifiers, global constants, which may be represented as numbers, but we assign a human readable lable.

       ```js
       // Every input gets a number value. ADMIN = 0 ...
       enum Role {ADMIN, READ_ONLY, AUTHOR};
       // You may also assing your own number, then the rest will follow, like 5, 6, 7
       enum Role {ADMIN = 5, READ_ONLY, AUTHOR};
       // Or you may assing numbers to all the identifiers
       enum Role {ADMIN = 5, READ_ONLY = 100, AUTHOR = 200};
       // And you can also use text.
       enum Role {ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 200};
       const Person = {
           //...
           role = Role.ADMIN
       }
       ...

       if (person.role === Role.AUTHOR)...
       ```

       - **Docs**: A helpful addition to the standard set of datatypes from JavaScript is the **enum**. As in languages like C#, an enum is a way of giving more friendly names to sets of numeric values.

       ```js
           enum Color {
           Red,
           Green,
           Blue,
           }
           let c: Color = Color.Green;
       ```

     - [`any`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) Any kind of value, no specific type assignment. Avoid when it's possible. It's just like vanila JS.

     - `union` eg `number | string`
       - Docs: A popular use-case for union types is to describe the set of strings or numbers literal that a value is allowed to be:
       ```js
       type WindowStates = 'open' | 'closed' | 'minimized';
       type LockStates = 'locked' | 'unlocked';
       type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
       ```
       - Docs: Unions provide a way to handle different types too. For example, you may have a function that takes an array or a string:
       ```js
       function getLength(obj: string | string[]) {
         return obj.length;
       }
       ```
     - `literal` You are very clear about the value. eg `'as-number' | 'as-text'` = union type, combined with literal types. [docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types) In practice string literal types combine nicely with `union types, type guards, and type aliases`. You can use these features together to get enum-like behavior with strings. String literal types can be used in the same way to distinguish overloads. ... Check also: `Numeric Literal Types` and `Boolean Literal Types`

     - `Type Aliases / Custom Types`: eg `type Combinable = number | string;` Create a new type which stores a union type. Type aliases create a new name for a type. Type aliases are sometimes similar to interfaces... and just like interfaces, type aliases can also be generic...
     - `Type Aliases & Object Types`: Type aliases can be used to "create" your own types. You're not limited to storing union types though - you can also provide an alias to a possibly complex object type.

       For example:

       ```js
       type User = { name: string, age: number };
       const u1: User = { name: 'Max', age: 30 }; // this works!
       // This allows you to avoid unnecessary repetition and manage types centrally.

       // For example, you can simplify this code:
       function greet(user: { name: string, age: number }) {
         console.log('Hi, I am ' + user.name);
       }

       function isOlder(user: { name: string, age: number }, checkAge: number) {
         return checkAge > user.age;
       }
       // To:

       type User = { name: string, age: number };

       function greet(user: User) {
         console.log('Hi, I am ' + user.name);
       }

       function isOlder(user: User, checkAge: number) {
         return checkAge > user.age;
       }
       ```

   - `Type assertions` [docs]https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

   - `Functions` as Types: eg `let combineValues: Function` or you can be more specifiek with `Function Types`:\
     `let combineValues: (a: number, b: number) => number`. In this way you avoid assinging to `combineValues` e.g. a number.
   - `Function Types & Callbacks`:

     ```js
     function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
       const result = n1 + n2;
       cb(result);
     }

     addAndHandle(10, 20, (result) => {
       console.log(result);
     });
     ```

   - `unknown` It's a bit more restrictive than `any`. eg you cannot assign an `unknown` value to a varible of `string` type. But you can with `any`. Use it when you don't really know what type of value you will have, but you do know what you want to do with it. [docs](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown). If you have a variable with an unknown type, you can **narrow** it to something more specific by doing `typeof` checks, `comparison` checks, or more advanced `type guards` checks...

     ```js
     let userInput: unknown;
     let userName: string;

     userInput = 5;
     userInput = 'Max';
     // with `unknown`  we get an error, but not with `any`.
     // type uknown is not assignable to type string.
     userName = userInput;
     //but you don't get an error if you first check
     if (typeof userInput === 'string') {
       userName = userInput;
     }
     ```

   - `never` If a function doesn't return anything and also throws an error... then this function doesn't return anything eg `cb: (num: number) => never `

3. **The TypeScript Compiler (and its Configuration)**

   - Check from the docs [Intro to the TSConfig Reference](https://www.typescriptlang.org/tsconfig)
   - [Configuring Watch](https://www.typescriptlang.org/docs/handbook/configuring-watch.html#configuring-file-watching-using-a-tsconfigjson) run `tsc app.ts -w` to enter watch mode. You can quit with `ctrl + C`. With watch mode you don't have to run `tsc fileName.ts` all the time. It runs automatically when saving the file.
   - run `tsc --init` to tell TS that all the files here are one project. It will create the `tsconfig.json` file ... Then TS will run all the .ts files of your project, by running just `tsc` without the file name. And it can be combined with `watch mode` by runnig: `tsc -w`.
   - You can exclude files from compiling by puting them in the `exclude` in `tsconfig.json`.
   - You can also use a wildcard like: `*.dev.ts` (= any file). Or like: `**/*dev.ts` (= any file in any folder). Note: by default "node_modules" is excluded.
   - You can also `include` files. But then if you ommit one, it will not be compiled.
     eg:

```js
    },
    "exclude": [
        "analytics.ts" // or "*.dev.ts" or "**/*.dev.ts" Note: * is a wildcard.
    ]
    },
    "include": [
        "fileName.ts" // Note: We compile include minus exclude... @5:00
    ],
    "files": [
        "app.ts" // Like include, but you cannot specify folders.
    ]
}
```

- In `tsconfig.json` `"lib": []` lets you specify which default objects and features TS knows. eg with the DOM. Like how does TS know what a `button` is...? So, if it's not set in `config` it takes the defaults according to the `target`.
  This is the default:/
  `js "lib": [ "DOM", "ES6", "dom.iterable", "ScriptHost" ], `
- `allowJs` set js files you want to be compiled
- `"sourceMap": true`, generates extra files that the browsers can read and in this way you get also the .ts files in chrome dev tools, which helps a lot with debuging.
- `"outDir": "./"` : You can move all the .js files to a `dist` folder and specify the path here, so TS will know where to look. Don't forget to change the path also in index.js
- `"outDir: "./dist"` Set where the created files should be stored.
- `"rootDir": "./src"` Set the folder where the .ts files are.
- `"noEmitOnError": true`: Does not compile the files if there is an error.
- About [Strict Type-Checking Options](https://www.typescriptlang.org/tsconfig#Strict_Type_Checking_Options_6173). If you set `"strict": true`, then all the options are set to true.
- About `Additional Checks`, check the docs @ [tsc CLI Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options). These checks are for code quality.
- About Debuging with VS Code, check the Q&A [Debugger not working?](https://www.udemy.com/course/understanding-typescript/learn/lecture/16888214#questions/10211160), and this [How to make VS Code work with ESLint, TypeScript and Prettier](https://www.udemy.com/course/understanding-typescript/learn/lecture/16888214#questions/12641080)
- These links might also be interesting:
  - tsconfig Docs: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  - Compiler Config Docs: https://www.typescriptlang.org/docs/handbook/compiler-options.html
  - VS Code TS Debugging: https://code.visualstudio.com/docs/typescript/typescript-debugging

4. **Next-generation JavaScript & TypeScript**

   - About let, const etc...

5. - **Classes & Interfaces** ...

   - [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
   - [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called **“duck typing” or “structural subtyping”**. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.
   - [Readonly](https://www.typescriptlang.org/docs/handbook/interfaces.html#readonly-properties) TypeScript comes with a `ReadonlyArray<T> `type that is the same as `Array<T> `with all mutating methods removed, so you can make sure you don’t change your arrays after creation:

   ```js
        interface Point {
          readonly x: number;
          readonly y: number;
        }
       ...
       let a: number[] = [1, 2, 3, 4];
       let ro: ReadonlyArray<number> = a;

       ro[0] = 12; // error!
   ```

   - An interface describes the structure of an object. Use it to type-check an object. But why not use just `custom types` then?
   - Note from the docs: You’ll see that there are two syntaxes for building types: `Interfaces` and `Types`. **You should prefer interface**. Use type when you need specific features.
   - Differences between `interfaces` and `custom types`:
     1. Interfaces only describe the structure of an object. In custom types you can store also other things like `union types` etc. So when using an interface it's clear you want to describe the structure of an object.
     2. You can implement an interface inside a class. It can be used as a contract a class can implement and then has to adhere to. Then you can share an interface among different classes and a class may implement multiple interfaces.
     3. We can implement `Inheritance` in interfaces by extending in an interface another one, or even multiple.
     4. With Interfaces you can describe the structure of a function too. But probably it's a bit more common to use custom types.
     5. Interfaces: mark properties as optional by adding a `?` after the property. Note: You can also mark methods as optional: `myMethod?(){}`. And also parameters of methods...

6. - [**Advanced Types**](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
   - `Intersection types:` Allow as to combine other types. They are close related to interface inheritance. But with interfaces we use more code. Note: You can use intersection types not only with objects but with any types. e.g. with union types you get the types that 2 union types have in common. Check: [Intersection Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types)
   - [Type Guards and Differentiating Types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards):
     1. `typeof`
     2. `in`
     3. `instanceof`
   - [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions): It's a pattern to use with union types and make working with type guards easier.
   - `Type Casting:` You can say TS that some value is of specifiek type!
   - `Index Properties:` Allows to create objects that are more flexible regarding the properties they might hold. Check also [Index types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
   - [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads): Allows us to define multiple function signatures, for one function. ie multiple ways of calling a function with different parameters. Use it when TS cannot infer correctly the return type.
     - [Ordering](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#ordering):
       - Don’t put more general overloads before more specific overloads.
       - Do sort overloads by putting the more general signatures after more specific signatures.
       - Why: TypeScript chooses the first matching overload when resolving function calls. When an earlier overload is “more general” than a later one, the later one is effectively hidden and cannot be called.
   - [Optional Chaining](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining): Let's say you get data from a back end, and you don't know if in an object a certain property is defined. Use optional chaining to not get a runtime error.
   - [Nullish Coalescing](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing): Manage nullish or undefined data.
   - These links might also be interesting:
     - More on Advanced Types: https://www.typescriptlang.org/docs/handbook/advanced-types.html

7. - [**Generics**](https://www.typescriptlang.org/docs/handbook/generics.html#hello-world-of-generics)
   - Generics is a type which is connected to another type, so TS gives us better support. They give us flexibility with type safety.
   - [Generic Constraints](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints): ...you may sometimes want to write a generic function that works on a set of types where you have some knowledge about what capabilities that set of types will have.
   - [Generic classes](https://www.typescriptlang.org/docs/handbook/generics.html#generic-classes): As we covered in our section on classes, a class has two sides to its type: the **static** side and the **instance** side. **Generic classes are only generic over their instance side** rather than their static side, so when working with classes, static members can not use the class’s type parameter.
   - [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype): Give extra type safety and flexibility. Check the docs for `Partial, Readconly` etc.
     - [Partial<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype): Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.
     - [Readonly<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype): Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.
   - These links might also be interesting:
     - More on Generics: https://www.typescriptlang.org/docs/handbook/generics.html

8. - [**Decorators**](https://www.typescriptlang.org/docs/handbook/decorators.html#decorators)
     A Decorator is a special kind of declaration that can be attached to a - `class declaration`, - `method`, - `accessor`, - `property`, or
     - `parameter`.
   - It's an instrument for writing code which is then easier to be used by other developers. eg one class gets used correctly, or do some hiden transformation.
   - A decorator is a function you apply to e.g. a class when the class is **defined**. It's not needed for the class to be instantiated.
   - `Decorator Factories` gives us more power to configure what the decorator does internally. When we have multiple Decorator Factories assigned in a class the decorators get executed bottom up.
   - You cannot use a decorator that is fine tuned for classes, elsewhere, like objects.
   - You can add decorators to: inctance property of a class, to a setter / getter, to a method, or a parameter.
   - [Decorator Evaluation](https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-evaluation)
     There is a well defined order to how decorators applied to various declarations inside of a class, are applied: - Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each **instance** member. - Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each **static** member. - Parameter Decorators are applied for the constructor. - Class Decorators are applied for the class.
   - [Class Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators): A Class Decorator is declared just before a class declaration. The class decorator is applied to the `constructor` of the class and can be used to `observe`, `modify`, or `replace` a class definition. A class decorator **cannot** be used in a declaration file, or in any other ambient context (such as on a declare class).
   - When adding a dec to an `instance` property of a class, the dec gets 2 arguments:
     - 1. `target` = the istance property `prototype`. Note: if it was a static property, it would infer to the `constructor` function.
     - 2. `property name`: a string or symbol...
   - `Property decorators` take 2 args: The first is `target` and it logs this:
     ```js
         {constructor: ƒ, getPriceWithTax: ƒ}
         constructor: class Product
         getPriceWithTax: ƒ getPriceWithTax(tax)
         set Price: ƒ Price(val)
         __proto__: Object
     ```
     - The second arg is the property `name`.
     - A property decorator can only be used to observe that a property of a specific name has been declared for a class - there is no descriptor.
   - `Accessor decorators` take 3 args: The first two are the same as Propetry dec. The 3d is the `PropetryDescriptor` which is e.g. for a setter:
     `js {get: undefined, enumerable: false, configurable: true, set: ƒ} configurable: true enumerable: false get: undefined set: ƒ Price(val) __proto__: Object `
     - NOTE: TypeScript disallows decorating both the get and set accessor for a single member (docs).
   - [Method decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators) take also 3 arguments and are the same as `Accessor decs`.
   - `Parameter Decorators`: They take 3 args ...and the 3d is the ordinal index of the parameter in the function’s parameter list [docs](https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators).
   - What is the order that decorators run? They all execute when the class they are assigned to is defined and the methods are registered etc! They don't run when the class is instanciated. They just allow you to do additional work behind the sceens. e.g. setup code that should run when a method is called.
   - 112. Returning (and changing) a Class in a Class Decorator:
     - In decorators you can return the constructor of the class and even override it. Check `WithTemplate` in `app.ts`. Now the decorator runs not when the class is defined but when it's instantiated!
     - setters / getters and methods may also return something. eg a new property descriptor and change how the property is configured.
   - [class-validator](https://github.com/typestack/class-validator)
   - More on Decorators: https://www.typescriptlang.org/docs/handbook/decorators.html
