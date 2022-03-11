# symbol-help a simple shell application
###### Using Symbol primitive to build the help system of one hypothetical application.  

___

## Index of Contents.

- [Introduction](#introduction)
- [Deno](#deno)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Deno Ecosystem](#deno-ecosystem)
    - [Install Velociraptor and configuring it](#install-velociraptor-and-configuring-it)
- [symbol-help application](#symbol-help-application)
  - [Symbol](#symbol)
  - [Object [symbol-help] - module](#object--symbol-help----module)
  - [input - module](#input---module)
  - [entry-point](#entry-point)
- [Finalize the application](#finalize-the-application)
  - [lint](#lint)
  - [format](#format)
  - [compile](#compile)
  - [install](#install)
  - [run](#run)
- [Enjoy](#enjoy)
- [JetBrains OSS License](#jetbrains-oss-license)

___

## Introduction.

Hello folks, I'm Simone Del Popolo and I want to introduce my self to the community as a Javascript developer mostly oriented to build shell (terminal, command-line) applications and network microservices.  
I started 7 months ago getting to know Node.js and with it, I have speed up my learning curve of Javascript, but since I have begun, I have "discovered" Deno and due to its use of Typescript as "first class language" I promised to my self to give it a chance as soon as ready.  
So, here I'm, and I have found a nice project to talk about Deno, Typescript and Symbol primitive, that are that kind of types with big question mark on their shoulders.

> source code can be found here ➡ [symbol-help repository](https://github.com/simonedelpopolo/symbol-help)

___

## Deno

___

### Installation

Installing Deno is pretty simple from Deno website just follow the ➡ [instruction](https://deno.land/#installation)  
or, like I do, use Cargo to compile it and install it.  
On UNIX install Deno with Cargo typing ⬇︎ in the shell  

`cargo install deno --locked`

So, Deno is written in Rust and this tells us also that is pretty fast, easy to contribute on the code and when it comes to use new technologies we should expect excitement and experimentation as a code base. **_koolthings_**.  
I'm very new to Deno and haven't gone that deep reading the manual or the API specification, but at first impression, I think that the project is well-structured and well maintained.

___

### Configuration

I code with Webstorm and for it there is a plugin called Deno.  
For VSCode there is a big manual page that I advise you to read ➡ [Deno VSCode](https://deno.land/manual@v1.19.3/vscode_deno)

Deno makes use of configuration file to make it simple to run commands and set options for the embedded components:

- linter -> `deno lint`  
  - having a linter without installing other tooling is just great.  
    it doesn't have infinite rules but just what necessary for the project to have its own code style.
    I think also that having few customizations bring a sort of standardization in Deno ecosystem.
- formatter -> `deno fmt`
  - simple as it is, few rules and boom your code is formatted.
- executable compiler -> `deno compile`
  - this is what I love most of Deno. Finally, we can compile our Javascript to a self-executable file without the Divine intervention.
  - It is so straight forward that at first time I didn't believe it.

Below it's the configuration file for this project.

**filename ./deno.json**
```json
{
  "compilerOptions": {
    "types": [
      "./src/types/String.d.ts"
    ]
  },
  "lint": {
    "rules": {
      "tags": ["recommended"],
      "include": ["eqeqeq"]
    }
  },
  "fmt": {
    "files": {
      "exclude": [
        "./README.md"
      ]
    },
    "options": {
      "useTabs": false,
      "indentWidth": 2,
      "singleQuote": true
    }
  }
}
```

I want to spend few words just about the compilerOptions property.  
In this project I have extended the String built-in Object with functions to decorate, coloring the text and the background. Typescript needs to know these things and, it is necessary to declare the types that aren't available natively in Javascript.  
So basically I'm telling to Deno to look for the types in the file ./src/types/String.d.ts and make them available globally.

**filename ./src/types/String.d.ts**

```typescript
/**
 * _Types definitions for String built-in Javascript Object._
 * @file ./src/types/String.d.ts
 * **this file will be loaded by Deno from deno.json configuration file before compiling main.ts**
 */
interface String {
    // foregrounds
    color(code?: number): string;
    black(): string;
    blue(): string;
    cyan(): string;
    green(): string;
    magenta(): string;
    red(): string;
    white(): string;
    yellow(): string;
    // backgrounds
    bg_color(code?: number): string;
    bg_black(): string;
    bg_blue(): string;
    bg_cyan(): string;
    bg_green(): string;
    bg_magenta(): string;
    bg_red(): string;
    bg_white(): string;
    bg_yellow(): string;
    // decorations
    strong(): string;
    underline(): string;
}
```

The extending functions are all in the directory ./src/String/

- color/fg -> foreground colors, text.
- color/bg -> background for text.
- decoration
  - underline -> underlined text
  - strong -> bold text

just few examples on how to use them:

- **String.color(code?:number) & String.bg_color(code?:number)**
```javascript
// ❗️ not all the shell are compatible with 256 colors.
// with these two function you can change up to 256 colors for foreground and background.
console.log( 'white text'.color( 255 ) )
console.log( 'white text, black background'.color( 255 ).bg_color( 0 ) )

// the other functions (bg&fg) are 8 colors that most of the terminal are compatible with.
// decoration just bold and underlined text.
console.log( 'red text, yellow background, underlined and bold'.bg_yellow().red().underline().strong() )
```

___

### Deno ecosystem.

Well let's be honest here, the command `npm run scripts` it is highly addictive thing and send me looking for something similar for Deno and I found Velociraptor, I installed it, and I can say that is pretty nice utility to run scripts and automate repetitive shell typing. 

___

#### Install Velociraptor and configuring it.

install running ⬇ in the shell.

`deno install -qAn vr https://deno.land/x/velociraptor@1.4.0/cli.ts   `

Velociraptor can be configured with .json or .yaml files, I chose yaml so, I can comment the things out.

**filename ./scripts.yaml**

```yaml
# script property tells to Velociraptor which scripts are available.
scripts:
  # usage : -> vr run linter
  linter: deno lint ./*
  # usage : -> vr run format
  format: deno fmt ./*
  # usage : -> vr run compile
  compile: deno compile --output ./build/symbol-help main.ts
```

Does Velociraptor facilitate the use of Deno as npm does for Node.js? yes it does.

Like Node.js we have a standard library that we can browse ➡︎ [Deno STD](https://deno.land/std/)  
Like npmjs repository we have a third party repository ➡︎ [Third party repository](https://deno.land/x)

Everything is nice and ready.

___

## symbol-help application

Now that we have our environment ready let's analyse some code, simple code.  
As the subtitle suggests, we will talk about Symbol type in Javascript.  
- The application will be compiled to a single executable in the directory ./build/symbol-help
- It is composed of many modules but mainly these two modules do the job:
  - [symbol-help - module](#object--symbol-help----module)
  - [input - module](#input---module)

___

### Symbol

This type has been object of many conversations around the tech community and for me, in first place, took a while to understand and accept the utility of it.  

> Why should I use it?  
> Where should I use it?  
> What the heck is that?

some questions, I think, we all have been asking ourselves.

Well, a Symbol is a unique value and can be Globally OR Locally available.  
It is defined with a {string} OR {number} that basically describes it.  

```typescript

// deno lint will tell you to avoid using the type, because is pretty clear to everyone that the type is Symbol
const help_system_local:symbol = Symbol('help_system')
console.log(help_system_local) // prints -> Symbol(help_system)

```
how to use Symbol when creating objects with **_Object.create()_**

```javascript
// obvious, no Symbol, way to do it.
Object.create(null, {
    
    help:{value:'help'}
    
})

/**
 * but we really want to make a use out of the Symbol.
 * otherwise why is there? 
 * Mistery?!
 */

Object.create(null, {
   
    [Symbol.for('help')]: { value: 'help' }
})

```
- ⬆︎ _**this is ES6 Object dynamic property name initialization.**_
  - square brackets and everything you like.
  - in this case a Symbol

> OH, thank you, Simone. Now everything is crystal clear!

you are welcome, but let's see how I have been using Symbol in this application.

___

### Object [ symbol-help ] - module

I'm going to break down the file in this post. to read it all go at [symbol-help.ts ➡︎](https://github.com/simonedelpopolo/symbol-help/blob/main/src/symbol-help.ts).

___

**filename ./src/symbol-help.ts**

```typescript
import { help_text } from './symbol-help/help-text.ts';
import { init_text } from './symbol-help/init-text.ts';
```

- ⬆︎ these two file have the text that will be printed in the shell.
  1. `help_text` responds to the command `./symbol-help help`
  2. `init_text` responds to the command `./symbol-help init`

```typescript
const symbol_help = Object.create(null, {
```

- ⬆︎ we create an Object by setting its prototype to `null` 
- we declare the owns properties of the Object straight in the create method. ⬇︎

```typescript
    [Symbol.for('help')]: {
        enumerable: true,
        value: help_text,
    },
```

- ⬆︎ I declared the property by using `Symbol.for()` making it Globally reachable.
- I describe the Symbol with `'help'`
- the value is set to `help_text`

```typescript
    [Symbol.for('init')]: {
        enumerable: true,
        value: init_text,
    },
});
```

- same same as above describing it with `'init'` and set the value to `init_text`
- to have clarified the thing about **_Object.create(Object, {objectProperties})_** just go [developer.mozilla ➡︎](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#using_propertiesobject_argument_with_object.create)
- we make the properties enumerable. to be printed when logged in the console and to be inheritable in case of cloning the Object in another Object. but in this case just to be printed.

```typescript
export default symbol_help;
```
- finally, we export the object.

___

### input - module

I'm going to break down the file in this post. to read it all go at [input.ts ➡︎](https://github.com/simonedelpopolo/symbol-help/blob/main/src/input.ts).

___

**filename ./src/symbol-help.ts**

```typescript
import { error_text } from './input/error-text.ts'
import symbol_help from './symbol-help.ts';
```
- ⬆︎ import the Symbol properties Object.
- import the `error_text`

```typescript
/**
 * Gets the Deno.args[0] ad returns string from symbol_help module.
 * If it does not find the symbol return an object {code:number, error: string}
 * @param {string} args - Deno.args[0] argument
 * @returns {string|{code:number, error:string}}
 */
export function input(args: string): string | { code: number; error: string } {
    
    // found Symbol property return the text.
    return symbol_help[Symbol.for(args)]
        
        // if no Symbol property is found return the error.
        || {
            code: 1,
            error: error_text(args),
        };
}
```
**_Simple function that returns an error code and message or the help formatted text._**  
> You have noticed that I make a lot of use of backtick like this snippet `${"string".bg_black()}`  
Backtick is amazing to format text, execute functions returning printable value and in short make your text dynamic.  
but heavy use of it in functions, like the one above, can reduce drastically the readability of your code.  
writing a module that handle this scenario is the best thing to do.

Sometimes organizing the code is hell but worth as hell in the long-running.

___

### entry-point

I'm going to break down the file in this post. to read it all go at [main.ts ➡︎](https://github.com/simonedelpopolo/symbol-help/blob/main/main.ts).

___

**filename ./main.ts**

```typescript
// exporting to make the functions available.
// Deno hints to put an underscore before the variable deliberately not being used anywhere.
export { default as _fg_black } from './src/extends/String/color/fg/black.ts';
export { default as _fg_color } from './src/extends/String/color/fg/color.ts';
export { default as _fg_cyan } from './src/extends/String/color/fg/cyan.ts';
export { default as _fg_green } from './src/extends/String/color/fg/green.ts';
export { default as _fg_magenta } from './src/extends/String/color/fg/magenta.ts';
export { default as _fg_red } from './src/extends/String/color/fg/red.ts';
export { default as _fg_white } from './src/extends/String/color/fg/white.ts';
export { default as _fg_yellow } from './src/extends/String/color/fg/yellow.ts';
export { default as _bg_black } from './src/extends/String/color/bg/black.ts';
export { default as _bg_color } from './src/extends/String/color/bg/color.ts';
export { default as _bg_cyan } from './src/extends/String/color/bg/cyan.ts';
export { default as _bg_green } from './src/extends/String/color/bg/green.ts';
export { default as _bg_magenta } from './src/extends/String/color/bg/magenta.ts';
export { default as _bg_red } from './src/extends/String/color/bg/red.ts';
export { default as _bg_white } from './src/extends/String/color/bg/white.ts';
export { default as _bg_yellow } from './src/extends/String/color/bg/yellow.ts';
export { default as _strong } from './src/extends/String/decoration/strong.ts';
export { default as _underline } from './src/extends/String/decoration/underline.ts';

```

- ⬆︎ yes, I know. if you have a better solution let me know. :)
- these are all decoration functions that extend the String Object.

```typescript
import { input } from './src/input.ts';
```

- ⬆︎ import the input module.
```typescript
if (Deno.args.length === 0) {
    console.error(`
${'symbol-help'.color(20)} ${
        'error -> required at least on argument'.bg_red().color(255)
    }
`);
    Deno.exit(1);
} else if (Deno.args.length > 1) {
    console.error(`
${'symbol-help'.color(20)} ${'error -> too many arguments'.bg_red().color(255)}
`);
    Deno.exit(1);
}
```

- ⬆︎ Let's make our app intelligent.
- if the length of Deno.args is less than 1 or more than 1
- we exit the application with message and code 1.
- Siiiiimple.
- ❗️ here you can see also the use of backtick and lack of readability.

```typescript
const stdout: string | { code: number; error: string } = input(Deno.args[0]);
```

- ⬆︎ we give to input module the Deno.args, and it will give us back the response.
- the response may be a {String} when successful an {Object} when failure.

```typescript
if (typeof stdout === 'string') {
    console.log(stdout);
    Deno.exit(0);
} else {
    console.error(stdout.error);
    Deno.exit(stdout.code);
}
```

- ⬆︎ yes again, if successful we print to the console the retrieved formatted text and exit the app with code 0
- otherwise, it prints the error and exit with the returned code.

___

## Finalize the application

___

### lint

You may want to try out the Deno linter

**_edit the ./main.ts file adding this code_**

```typescript
// why not just use const instead of let if it is never reassigned?
let x = 5
// eqeqeq rule is active for the linter in this project
if(x==0)
    console.log('hurray!')
```

and then run ⬇︎

```shell
vr run linter
```

- ⬇︎ the output will be something like this
- isn't koolthing?

```shell

(prefer-const) `x` is never reassigned
let x = 5
    ^
    at /Volumes/code/symbol-help/main.ts:61:4

    hint: Use `const` instead
    help: for further information visit https://lint.deno.land/#prefer-const

(eqeqeq) expected '===' and instead saw '=='.
if(x==0)
   ^^^^
    at /Volumes/code/symbol-help/main.ts:63:3

    hint: Use '==='
    help: for further information visit https://lint.deno.land/#eqeqeq

Found 2 problems
Checked 27 files
error: Failed at the linter script


```

___

### format

do you want to reformat the code?

**_edit the file ./deno.json changing the value of the property indentWidth from 2 to 4_**

```json
{
[...]
  "fmt": {
    "options": {
      "useTabs": false,
      "indentWidth": 4, # ⬅︎
      "singleQuote": false # ⬅︎
    }
  }
}

```

and then run ⬇︎

```shell
vr run format
```

- ⬇︎ the output will be something like this
- this means that all those files have been formatted with the new options.

```shell
/Volumes/code/symbol-help/deno.json
/Volumes/code/symbol-help/src/extends/String/decoration/underline.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/white.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/blue.ts
/Volumes/code/symbol-help/src/extends/String/decoration/strong.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/black.ts
/Volumes/code/symbol-help/src/symbol-help.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/red.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/green.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/yellow.ts
/Volumes/code/symbol-help/src/symbol-help/help-text.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/color.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/cyan.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/magenta.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/magenta.ts
/Volumes/code/symbol-help/src/symbol-help/init-text.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/cyan.ts
/Volumes/code/symbol-help/main.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/color.ts
/Volumes/code/symbol-help/src/input/error-text.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/white.ts
/Volumes/code/symbol-help/src/extends/String/color/bg/yellow.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/green.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/blue.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/black.ts
/Volumes/code/symbol-help/src/input.ts
/Volumes/code/symbol-help/src/types/String.d.ts
/Volumes/code/symbol-help/src/extends/String/color/fg/red.ts
Checked 28 files
```

go check the files now, easy to revert by putting back the original values in the deno.json configuration.

___

### compile

Now after all this playground it's time to compile the application and see it in action.

```shell
vr run compile

# when done run

./build/symbol-help help
```

- ⬇︎ the output will be like this

```shell
# symbol help system

## here it's possible to learn how to use this application.

### introduction
  In elit quam, dapibus vel dolor et, euismod lacinia tortor.
  Nam mollis tincidunt tortor at facilisis. In hac habitasse platea dictumst.
  Cras pharetra purus magna, ac consequat ligula mollis id.
  Etiam elit lectus, congue a diam sed, porta aliquet lacus. Aliquam erat volutpat.
  Duis pretium nulla lacinia nunc congue, et tincidunt nisl volutpat.
  Curabitur quis augue tincidunt, porttitor velit eget, cursus arcu.
  Donec elementum molestie nisi, in aliquam metus egestas in.
  Aenean sed elit neque. Quisque ultricies pulvinar turpis, in porta lacus laoreet quis.
  Nunc bibendum sed odio id elementum.
  Vivamus non rhoncus leo.
  Fusce ullamcorper sit amet ligula at tincidunt.
  Aliquam erat volutpat. Phasellus nec urna sodales, cursus ipsum a, consequat sapien.
```

nice formatted output and decorate colorful text ;)

___

### install

Two ways to install our amazing Symbol help system

1. **_using Deno ⬇︎_**  
   `deno install --name symbol-help main.ts`  
   the output is this
   ```shell
   ✅ Successfully installed symbol-help
   /path/to/user/home/directory/.deno/bin/symbol-help
   ```
   if you open that file this will be the content or something similar
   ```shell
   cat /path/to/user/home/directory/.deno/bin/symbol-help
   #______________________OUTPUT_______________________
   #!/bin/sh
   # generated by deno install
   exec deno run 'file:///Volumes/code/symbol-help/main.ts' "$@"
   ```
   **_as you can see it is a simple shell script that will run Deno to run the ./main.ts file passing the arguments._**  


2. **_copying the compiled executable in a directory and make it available at least for your user_**.
   - `cp ./build/symbol-help /path/to/user/home/directory/.local/bin/symbol-help`
   - I usually put executables in the directory .local/bin adding the path to the ENVIRONMENT_VARIABLE -> PATH 
  - ok than, now let's run something
___

### run

I assume that the application is available in the PATH of your system.
```shell
symbol-help

#______________________OUTPUT_______________________

symbol-help error -> require at least on argument

# one more

symbol-help give me everything

#______________________OUTPUT_______________________

symbol-help error -> too many arguments

# one more

symbol-help --is-nuts

#______________________OUTPUT_______________________

  help for the flag ~--is-nuts~ not found
  
  usage -> symbol-help init
  
  available topics:
  
    - help
    - init
```

___

## Enjoy

I enjoyed writing down this post, my very first post.  
If you would like to interact with me be in touch:  
Twitter -> @XimoneDelPopolo  
GitHub -> https://github.com/simonedelpopolo  

**_Have a nice day from Iceland :)_**

___

## JetBrains OSS License

___

I want to thank JetBrains to grant me the Open Source Software license for all their products. This opportunity gives me strength to keep on going with my studies and personal project.  
To learn more about this opportunity have a look at [Licenses for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_
