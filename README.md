Packages is a public repo for the Taminaru Discord Bot.

This repo is for the bot and its dependencies. I dont want to clutter the core code so im making this.

Code is built in ts and then compiled to ts

### packages

- Logger
- MongoDb provider

more will be added

### How to install

To install simply do `yarn add https://github.com/taminaru/packages` or `npm i https://github.com/taminaru/packages`

Then go to the index.ts file and use the export name to run the code. Example:

```ts
import { Logger } from "@taminaru/packages"
import { LoggerOptions } from "./somewhere.ts"

class Logger {
	private readonly example?: string
	public constructor(options?: LoggerOptions) {
		this.example = example
	}
	// logger logic
}
// Allows the logger to be used
const log = new Logger()
```
With this code you would import the class { Logger } like so.

If you need any support join our [discord server](https://discord.com/invite/N79DZsm3m2).

### Scope

When importing a module use the scope import `@taminaru/packages`