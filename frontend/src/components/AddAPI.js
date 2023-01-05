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

  
  render() {

    return (
      <div className='flex row icons'>
      {/* {this.props.addstack} */}
      {this.props.data.bonus.map(d => {
        // Renders clean button
        const stat = this.match(d, this.props.bonus, "modificatore", "skill")
        const statSlice = stat.slice(0, 3).toLowerCase()
        if (
          (this.props.modificatore.skill === this.match(d, this.props.bonus, "modificatore", "skill"))
          // Checks stat modifiers
          || (this.props.data.stats[stat] !== undefined
          && this.props.data.skills[`${statSlice}skills`].hasOwnProperty(this.props.modificatore.skill)
        )) {
          if (!this.state.active.includes(d)) {
            return (
              <div className="flex column">
              <h2 className="iconTitle">{d.substring(0, d.indexOf("_")) || d}</h2>
              <img onClick={() => {this.props.add(this.match(d, this.props.bonus, "modificatore", "bonus")); this.turnOn(d)}} className="icon" src={"/images/icons/" + d + ".png"} />
              {/*  <li>{this.match(d, this.props.bonus, "summary")}</li>
                  { this.match(d, this.props.bonus, "modificatore", "skill") !== "\\" &&
                  <li>Modificatore: { this.match(d, this.props.bonus, "modificatore", "bonus") }</li>
                  }
                  <button onClick={() => {this.props.add(this.match(d, this.props.bonus, "modificatore", "bonus")); this.turnOn(d)}}>Aggiungi bonus</button>
            */}
              </div>     
              )
            }
          else {
            return (
              <div className="flex column">
                <h2 className="iconTitle">{d.substring(0, d.indexOf("_")) || d}</h2>
                <img onClick={() => {this.props.add(-(this.match(d, this.props.bonus, "modificatore", "bonus"))); this.turnOff(d)}} className="icon active" src={"/images/icons/" + d + ".png"} />
               {/* <li>{this.match(d, this.props.bonus, "summary")}</li>
                { this.match(d, this.props.bonus, "modificatore", "skill") !== "\\" &&
                <li>Modificatore: { this.match(d, this.props.bonus, "modificatore", "bonus") }</li>
                } */}
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
