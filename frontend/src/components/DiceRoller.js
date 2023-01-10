import React from "react"
import AddAPI from "./AddAPI"
import ModAPI from "./ModAPI"

export class DiceRoller extends React.Component {
    constructor(props) {
        super(props)
    }
  
    render() {
        return (
            <div className="dice-roller-wrapper" onClick={() => this.props.overlayHandleClick()}>
                <div className="dice-roller-circle">
                    <img src="/images/dice/d8icon.png"/>    
                </div>
            </div>
        )
    }
}

export class Overlay extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
        <div className={"dice-roller-overlay open" + this.props.open}>
            <div className="overlay-content">
                <div>
                    <ModAPI modificatore={this.props.modificatoremod} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                </div>
                <div>
                    <AddAPI ref={this.props.AddAPI} addstack={this.props.addstack} modificatore={this.props.modificatore} data={this.props.data} bonus={this.props.bonus} add={this.props.add}/>
                </div>
                <div>
                    <p>Risultato finale mod + add = {this.props.modificatoremod}</p>
                </div>
            </div>
        </div>
        )
    }
}