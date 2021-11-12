interface SlashCommandOptions {
    trigger?: string
    name: string
    description?: string
    paramCount: number
    paramsAreAfterCommand?: boolean
    commandAction: (slashCommand: string, separator: string, args: string[]) => string
}

const slashCommandDefaults: SlashCommandOptions = {
    trigger: "/",
    name: "noName",
    description: "Empty description.",
    paramCount: 0,
    paramsAreAfterCommand: false,
    commandAction: (slashCommand: string, separator, args: string[]) => {
        args.unshift(slashCommand)
        return (args.join(separator))
    }
}

export class SlashCommand {
    options: SlashCommandOptions;

    constructor(slashCommandOptions: SlashCommandOptions) {
        this.options = {...slashCommandDefaults, ...slashCommandOptions}
        if (this.options.name.indexOf(' ') > -1) {
            throw new Error('Command name should not contain spaces')
        }
    }
}


export let SlashCommands: SlashCommand[] = [new SlashCommand({
    name: "add",
    description: "Add two numbers following the commands together. Example: '/add 1 2' => '3'",
    paramCount: 2,
    paramsAreAfterCommand: true,
    commandAction: (slashCommand: string, separator: string, args: string[]) => {
        const var1 = parseInt(args[0], 10)
        const var2 = parseInt(args[1], 10)
        if (var1 && var2) {
            return (var1+var2).toString()
        }
        return slashCommandDefaults.commandAction(slashCommand, separator, args)

    }
}),
    new SlashCommand({
        name: "upper",
        description: "Convert to uppercase the preceding word. Example: 'hello world /upper' => 'hello WORLD'",
        paramCount: 1,
        paramsAreAfterCommand: false,
        commandAction: (slashCommand: string, separator: string, args: string[]) => {
            return args[0].toUpperCase()
        }
    }),
    new SlashCommand({
        name: "shrug",
        description: "Insert shrug. Example: 'hello world /shrug' => 'hello world ¯\\_(ツ)_/¯'",
        paramCount: 0,
        paramsAreAfterCommand: false,
        commandAction: (slashCommand: string, separator: string, args: string[]) => {
            return '¯\\_(ツ)_/¯'

        }
    }),
]