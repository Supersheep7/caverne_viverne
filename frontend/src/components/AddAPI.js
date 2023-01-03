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
    
    clickHandle(b) {
       this.state.active.push(b)
    }

    dropActive(b) {
      let dropBoy = this.state.active.indexOf(b)
      if (dropBoy > -1) { this.state.active.splice(dropBoy, 1) }
    }

    render() {
        return (
            <div>
                {this.props.addstack}
                {this.props.data.bonus.map(d => {
              if (this.props.modificatore.skill === this.match(d, this.props.bonus, "modificatore", "skill") && !this.state.active.includes(d)) {
                return (
                  <ul>
                    <li>{d.substring(0, d.indexOf("_")) || d}</li>
                    <li>{this.match(d, this.props.bonus, "summary")}</li>
                    { this.match(d, this.props.bonus, "modificatore", "skill") !== "\\" &&
                    <li>Modificatore: { this.match(d, this.props.bonus, "modificatore", "bonus") }</li>
                    }
                    <button onClick={() => {this.props.add(this.match(d, this.props.bonus, "modificatore", "bonus")); this.clickHandle(d)}}>Aggiungi bonus</button>
                  </ul>
                )
              }
              else if (this.props.modificatore.skill === this.match(d, this.props.bonus, "modificatore", "skill") && this.state.active.includes(d)) {
                return (
                  <ul>
                    <li>{d.substring(0, d.indexOf("_")) || d}</li>
                    <li>{this.match(d, this.props.bonus, "summary")}</li>
                    { this.match(d, this.props.bonus, "modificatore", "skill") !== "\\" &&
                    <li>Modificatore: { this.match(d, this.props.bonus, "modificatore", "bonus") }</li>
                    }
                    <button onClick={() => {this.props.add(-(this.match(d, this.props.bonus, "modificatore", "bonus"))); this.dropActive(d)}}>Elimina bonus</button>
                  </ul>
                )
              }
              else return null
            })
            }
            </div>
        )
    }
}
