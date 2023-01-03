import React from 'react';

export default class AddAPI extends React.Component {
    
    constructor(props) {
        super(props)
    }

    match(elemName, docName, detail1, detail2 = "", detail3 = "") {

      if (arguments.length == 5) {
        return docName.filter(obj => obj.nome.toLowerCase() == elemName.toLowerCase())[0][detail1][detail2][detail3]
      }
      else if (arguments.length == 4) {
        return docName.filter(obj => obj.nome.toLowerCase() == elemName.toLowerCase())[0][detail1][detail2]
      }
      else {
        return docName.filter(obj => obj.nome.toLowerCase() == elemName.toLowerCase())[0][detail1]
      }
    
    }
    
    render() {
        return (
            <div>
                {this.props.addstack}
                {this.props.data.bonus.map(d => {
              return (
                <ul>
                  { this.match(d, this.props.bonus, "modificatore", "skill") !== "\\" &&
                  <li>Modificatore: { this.match(d, this.props.bonus, "modificatore", "skill") }: { this.match(d, this.props.bonus, "modificatore", "bonus") }</li>
                  }
                  <button onClick={() => this.props.add(this.match(d, this.props.bonus, "modificatore", "bonus"))}>Aggiungi bonus</button>
                </ul>
              )
            })
            }
            </div>
        )
    }
}

{/*
# Set state: addstack bonus


*/}