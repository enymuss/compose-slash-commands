import React, {useState} from "react";
import {SlashCommands} from "./slashCommands";
import {AddCommandForm} from "./AddCommandForm";

export const SlashTextarea = () => {
    const [textValue, setTextValue] = useState<string>()
    const [showCommandMenu, setShowCommandMenu] = useState(false)
    const [showAddCommandMenu, setShowAddCommandMenu] = useState(true)

    const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const stringSeparator = ' '
        const splitSting = e.currentTarget.value.split(stringSeparator)

        if (splitSting[splitSting.length -1].includes('/')) {
            setShowCommandMenu(true)
        } else {
            setShowCommandMenu(false)
        }

        SlashCommands.forEach((element, index) => {
            const fullCommand = element.options.trigger+element.options.name
            const commandIndex = splitSting.indexOf(fullCommand)
            if (commandIndex > -1) {
                if (element.options.paramsAreAfterCommand) {
                    if (commandIndex + element.options.paramCount === splitSting.length-1) {
                        const commandOutput = element.options.commandAction(fullCommand, stringSeparator, splitSting.slice(commandIndex+1))
                        splitSting.splice(commandIndex, element.options.paramCount+1, commandOutput)
                    }
                } else {
                    if (element.options.paramCount + 1 <= splitSting.length) {
                        const commandOutput = element.options.commandAction(fullCommand, stringSeparator,
                            splitSting.slice(commandIndex-element.options.paramCount, commandIndex)
                        )
                        splitSting.splice(commandIndex-element.options.paramCount, element.options.paramCount+1, commandOutput)
                    }
                }
            }
        })


        // let commandIndex = splitSting.indexOf('/addCommand');
        // if (commandIndex > -1) {
        //     setShowAddCommandMenu(true)
        //     // show div with input forms
        //     // focus on first input form
        //     // cancel -> close input form and focus on this textarea
        //     // add -> add command to list, close input fomr adn focus on text area
        // }

        setTextValue(splitSting.join(stringSeparator))
    }

    return (
        <>
            <textarea style={{width: "400px", height: "200px"}} onChange={handleChange} value={textValue}/>
            <div>Existing Commands:</div>
            {SlashCommands.map(value => {
                return <p>{value.options.trigger+value.options.name}<br />
                    {value.options.commandAction.toString()}</p>
            })}
            {showCommandMenu && <div className="tribute-container"><ul><li>Tribute Container</li></ul></div>}
            {showAddCommandMenu && <AddCommandForm />}
        </>
    )
}