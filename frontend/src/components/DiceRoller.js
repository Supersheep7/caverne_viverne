import React from "react"
import AddAPI from "AddAPI.js"
import ModAPI from "ModAPI.js"

class DiceRoller extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <AddAPI />
                <ModAPI />
            </div>
        )
    }
}