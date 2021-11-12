import React from "react";
import {SlashCommands, SlashCommand} from "./slashCommands";

export const AddCommandForm = () => {
    const newFunc = eval("(slashCommand, separator, args) => {\n" +
        "            console.log('lower');\n" +
        "            return args[0].toLowerCase();\n" +
        "        }")

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            trigger: {value: string};
            name: {value: string};
            description: {value: string};
            paramCount: {value: number};
            paramsAreAfterCommand: {value: boolean};
            commandActionFunc: {value: string};
        }

        SlashCommands.push(new SlashCommand({
            trigger: target.trigger.value,
            name: target.name.value,
            description: target.description.value,
            paramCount: target.paramCount.value,
            paramsAreAfterCommand: target.paramsAreAfterCommand.value,
            commandAction:  newFunc,
        }))
        console.log("target", target.name.value)

    }
    return (
        <>
            <div className="tribute-container">Add command</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Command Trigger:
                        <input type="text" name="trigger"></input>
                    </label>
                </div>
                <div>
                    <label>
                        Command Name:
                        <input type="text" name="name"></input>
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input type="text" name="description"></input>
                    </label>
                </div>
                <div>
                    <label>
                        Number of parameters passed to command:
                        <input type="number" name="paramCount"></input>
                    </label>
                </div>
                <div>
                    <label>
                        Parameters appear after the command:
                        <input type="checkbox" name="paramsAreAfterCommand"></input>
                    </label>
                </div>
                <div>
                    <label>
                        Function to transform the input:
                        <br />
                        {"((slashCommand: string, separator: string, args: string[]) => string)"}
                        <textarea name="commandActionFunc"></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        Submit:
                        <input type="submit"/>
                    </label>
                </div>
            </form>
        </>
    )
}