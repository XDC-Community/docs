# XDC Relayer

## XDC Relayer

Relayer is a communication bridge between XDC mainnet and its subnet. It provides synchronisation feature to make sure subnet chain is audited on mainnet securely.

### Pre-reqs

To build and run this app locally you will need:

* Install [Node.js](https://nodejs.org/en/). Note, we use node 14

## Getting Started

* Install dependencies

```
npm install
```

* Set up .env Copy over the .example.env file and override the values to appropriate ones The new file name shall be `.env`
* Run the project directly in TS (dev mode)

```
npm run start:dev
```

* Build and run the project in JS

```
npm run build
npm run start
```

* Run unit tests

```
npm run test
```

* Run unit tests with coverage

```
npm run test:coverage
```

* Run unit tests on Jest watch mode

```
npm run test:watch
```

### Environment variables

Create a .env file (or just rename the .example.env) containing all the env variables you want to set, dotenv library will take care of setting them. This project is using three variables at the moment:

* PORT -> port where the server will be started on
* NODE\_ENV -> environment, development value will set the logger as debug level, also important for CI.

### Getting TypeScript

TypeScript itself is simple to add to any project with `npm`.

```
npm install -D typescript
```

If you're using VS Code then you're good to go! VS Code will detect and use the TypeScript version you have installed in your `node_modules` folder. For other editors, make sure you have the corresponding [TypeScript plugin](http://www.typescriptlang.org/index.html#download-links).

### Configuring TypeScript compilation

TypeScript uses the file `tsconfig.json` to adjust project compile options. Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.

```
    "compilerOptions": {
        "module": "commonjs",
        "target": "es2017",
        "lib": ["es6"],
        "noImplicitAny": true,
        "strictPropertyInitialization": false,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "baseUrl": ".",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,  
        }
    },
```

### Running ESLint

Like the rest of our build steps, we use npm scripts to invoke ESLint. To run ESLint you can call the main build script or just the ESLint task.

```
npm run build   // runs full build including ESLint format check
npm run lint    // runs ESLint check + fix
```

Notice that ESLint is not a part of the main watch task. It can be annoying for ESLint to clutter the output window while in the middle of writing a function, so I elected to only run it only during the full build. If you are interested in seeing ESLint feedback as soon as possible, I strongly recommend the [ESLint extension in VS Code](https://github.com/Microsoft/vscode-eslint.git).
