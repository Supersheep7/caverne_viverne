import React from 'react';

export default class AddAPI extends React.Component {
    
  constructor(props) {
      super(props)
      this.state = {
        active: []
      }
  }

  match(elemName, docName, detail1, detail2 = "", detail3 = "") {

    if (arguments.length === 5) {
      return docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1][detail2][detail3]
    }
    else if (arguments.length === 4) {
      return docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1][detail2]
    }
    else {
      return docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1]
    }
  
  }
  
  turnOn(b) {
      this.state.active.push(b)
  }

  turnOff(b) {
    let dropBoy = this.state.active.indexOf(b)
    if (dropBoy > -1) { this.state.active.splice(dropBoy, 1) }
  }

  cleanName(string) {
    let newString
    if (string.includes("_")) {
      return newString = string.substring(0, string.indexOf("_"))
    }
    else return string
  }
  
  render() {

    return (
      <div className='icons'>
      {/* {this.props.addstack} */}
      {this.props.data.bonus.map(d => {
        // Renders clean button
        const stat = this.match(d, this.props.bonus, "modificatore", "skill")
        const statSlice = stat.slice(0, 3).toLowerCase()
        if (
          (this.props.modificatore.skill === this.match(d, this.props.bonus, "modificatore", "skill"))
          // Checks stat modifiers
          || (this.props.data.stats[stat] !== undefined
          && this.props.data.skills[`${statSlice}skills`].hasOwnProperty(this.props.modificatore.skill))
          || (this.match(d, this.props.bonus, "modificatore", "skill") === "\\")
        ) {
          if (!this.state.active.includes(d)) {
            return (
              <div className="flex column addcard">
                <img onClick={() => {this.props.add(this.match(d, this.props.bonus, "modificatore", "bonus")); this.turnOn(d)}} className="icon" src={"/images/icons/" + this.cleanName(d) + ".png"} />
                <div className={"add-summary cardactive" + this.state.active.includes(d)}>
                  <h2 className="iconTitle">{this.cleanName(d)}</h2>
                  <p>{this.match(d, this.props.bonus, "summary")}</p>
                </div>
              </div>     
              )
            }
          else {
            return (
              <div className="flex column addcard">
                <img onClick={() => {this.props.add(-(this.match(d, this.props.bonus, "modificatore", "bonus"))); this.turnOff(d)}} className="icon active" src={"/images/icons/" + this.cleanName(d) + ".png"} />
                <div className={"add-summary cardactive" + this.state.active.includes(d)}>
                  <h2 className="iconTitle">{this.cleanName(d)}</h2>
                  <p>{this.match(d, this.props.bonus, "summary")}</p>
                </div>
              </div>
            )
            }
          }
        })
      }
      </div>
    )
  }
}
