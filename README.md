Packages is a public repo for the Taminaru Discord Bot.

This repo is for the bot and its dependencies. I dont want to clutter the core code so im making this.

Code is built in ts and then compiled to ts

### packages

- Logger
- MongoDb client provider
- GiveAway manger 
- ModMail manger 
- Db handler

check src/index.ts for exports

### How to install

To install simply do `yarn add https://github.com/taminaru/packages` or `npm i https://github.com/taminaru/packages`

Then go to the index.ts file and use the export name to run the code. Example:

If you need any support join our [discord server](https://discord.com/invite/N79DZsm3m2).

### Scope

When importing a module use the scope import `@taminaru/packages`

options:

```ts
import { Logger } from "@taminaru/packages"

new Logger(...)
// your code
```

and

```ts
import { MongooseProvider } from "@taminaru/packages"

new MongooseProvider(...)
// your code
```
