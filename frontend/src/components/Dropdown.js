import React from "react";

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    dropClick() {
        this.setState ({
            open: !this.state.open
        })
    }

    tagHelper() {
        if (this.props.nome === "abilita_innate") {
            return "Abilità innate"
           }
        else {
            return this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)
        }
    }

    match(elemName, docName, detail1 = "", detail2 = "", detail3 = "") {
            if (arguments.length === 5) {
            return (docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1][detail2][detail3])
            }
            else if (arguments.length === 4) {
            return (docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1][detail2]) 
            }
            else {
            return (docName.filter(obj => obj.nome.toLowerCase() === elemName.toLowerCase())[0][detail1]) 
            }
        }


    render() {
        
        let data = this.props.data;
        let base = this.props.base;
        let arry = [] 

        return (
            <div className="dropdown-outer" onClick={() => this.dropClick()}>
            <div className="dropdown-tag"><h2 className="dropdown-text" >{this.tagHelper()}</h2></div>

            {/*************** INNER DROPDOWN ***************/}
            <div>{ this.state.open && 
            <div className="dropdown-inner">

            {/*************** CHECK "_" CONDITION ***************/}
            <div>{data.map(d => {

              if ((d.includes("_") && arry.length === 0) || (d.includes("_")
              && arry[0].substring(0, arry[0].indexOf("_")) !== d.substring(0, d.indexOf("_")) 
              && arry.length > 0)) {
                arry = []
                arry.push(d)
                return (
                  <ul>
                  <li>Nome: {arry[0].substring(0, arry[0].indexOf("_"))}</li>
                  <img className="icon" src={"/images/icons/" + d + ".png"} />
                  { this.match(d, base, "summary") !== "\\" &&   
                  <li>Descrizione: { this.match(d, base, "summary") }</li>
                  }
                  {(this.props.nome === "magie") && 
                  <li>Costo di mana: { this.match(d, base, "costo", "mana") }%</li> }
                  {(this.props.nome === "magie") && this.match(d, base, "costo", "skill") !== "\\" && 
                  <li>Prova da effettuare: { this.match(d, base, "costo", "skill") }: CD { this.match(d, base, "costo", "cd") }</li>
                  }
                {(this.props.nome === "attacchi") && 
                    <li>Check: { this.match(d, base, "check") }</li>
                }                   
                {(this.props.nome === "attacchi") && 
                    <li>Danni: { this.match(d, base, "effetto", "danni") }</li>
                }                   
                {(this.props.nome === "attacchi") && this.match(d, base, "effetto", "modificatore", "skill") !== "\\" &&
                    <li>Altri modificatori: { this.match(d, base, "effetto", "modificatore", "skill") }: { this.match(d, base, "effetto", "modificatore", "bonus_malus") }</li>
                }       
                {(this.props.nome === "bonus") && this.match(d, base, "modificatore", "skill") !== "\\" &&
                    <li>Modificatore: { this.match(d, base, "modificatore", "skill") }: { this.match(d, base, "modificatore", "bonus") }</li>
                }     
                  {(this.props.nome === "magie") && this.match(d, base, "costo", "altro") !== "\\" &&
                  <li>Altri requisiti: { this.match(d, base, "costo", "altro") }</li>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "skill") !== "\\" &&
                  <li>Bonus abilità: { this.match(d, base, "effetto", "skill") }; { this.match(d, base, "effetto", "bonus") } </li>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "dadi") !== "\\" &&
                  <li>Dadi: { this.match(d, base, "effetto", "dadi") }</li>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "altro") !== "\\" &&
                  <li>Altri effetti: { this.match(d, base, "effetto", "altro") }</li>
                  }
                </ul>
                )
              }

              else if (d.includes("_") 
              && arry.length > 0) {
                return null
              }

              else {
              arry = []
              return (
                <ul>
                  <li>Nome: {d}</li>
                  <img className="icon" src={"/images/icons/" + d + ".png"} />
                  { this.match(d, base, "summary") !== "\\" &&   
                  <li>Descrizione: { this.match(d, base, "summary") }</li>
                  }
                  {(this.props.nome === "magie") && 
                  <li>Costo di mana: { this.match(d, base, "costo", "mana") }%</li> }
                  {(this.props.nome === "magie") && this.match(d, base, "costo", "skill") !== "\\" && 
                  <li>Prova da effettuare: { this.match(d, base, "costo", "skill") }: CD { this.match(d, base, "costo", "cd") }</li>
                  }
                {(this.props.nome === "attacchi") && 
                    <li>Check: { this.match(d, base, "check") }</li>
                }                   
                {(this.props.nome === "attacchi") && 
                    <li>Danni: { this.match(d, base, "effetto", "danni") }</li>
                }                   
                {(this.props.nome === "attacchi") && this.match(d, base, "effetto", "modificatore", "skill") !== "\\" &&
                    <li>Altri modificatori: { this.match(d, base, "effetto", "modificatore", "skill") }: { this.match(d, base, "effetto", "modificatore", "bonus_malus") }</li>
                }       
                {(this.props.nome === "bonus") && this.match(d, base, "modificatore", "skill") !== "\\" &&
                    <li>Modificatore: { this.match(d, base, "modificatore", "skill") }: { this.match(d, base, "modificatore", "bonus") }</li>
                }     
                  {(this.props.nome === "magie") && this.match(d, base, "costo", "altro") !== "\\" &&
                  <li>Altri requisiti: { this.match(d, base, "costo", "altro") }</li>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "skill") !== "\\" &&
                  <li>Bonus abilità: { this.match(d, base, "effetto", "skill") }; { this.match(d, base, "effetto", "bonus") } </li>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "dadi") !== "\\" &&
                  <li>Dadi: { this.match(d, base, "effetto", "dadi") }</li>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "altro") !== "\\" &&
                  <li>Altri effetti: { this.match(d, base, "effetto", "altro") }</li>
                  }
                </ul>
              )
                }
            })}</div>

            </div>
        }</div>
    </div>
        )
    }
}