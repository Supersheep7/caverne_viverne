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
                  <div className="card">
                  <img className="icon" src={"/images/icons/" + d + ".png"} />
                  <p>Nome: {arry[0].substring(0, arry[0].indexOf("_"))}</p>
                  { this.match(d, base, "summary") !== "\\" &&   
                  <p>Descrizione: { this.match(d, base, "summary") }</p>
                  }
                  {(this.props.nome === "magie") && 
                  <p>Costo di mana: { this.match(d, base, "costo", "mana") }%</p> }
                  {(this.props.nome === "magie") && this.match(d, base, "costo", "skill") !== "\\" && 
                  <p>Prova da effettuare: { this.match(d, base, "costo", "skill") }: CD { this.match(d, base, "costo", "cd") }</p>
                  }
                {(this.props.nome === "attacchi") && 
                    <p>Check: { this.match(d, base, "check") }</p>
                }                   
                {(this.props.nome === "attacchi") && 
                    <p>Danni: { this.match(d, base, "effetto", "danni") }</p>
                }                   
                {(this.props.nome === "attacchi") && this.match(d, base, "effetto", "modificatore", "skill") !== "\\" &&
                    <p>Altri modificatori: { this.match(d, base, "effetto", "modificatore", "skill") }: { this.match(d, base, "effetto", "modificatore", "bonus_malus") }</p>
                }       
                {(this.props.nome === "bonus") && this.match(d, base, "modificatore", "skill") !== "\\" &&
                    <p>Modificatore: { this.match(d, base, "modificatore", "skill") }: { this.match(d, base, "modificatore", "bonus") }</p>
                }     
                  {(this.props.nome === "magie") && this.match(d, base, "costo", "altro") !== "\\" &&
                  <p>Altri requisiti: { this.match(d, base, "costo", "altro") }</p>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "skill") !== "\\" &&
                  <p>Bonus abilità: { this.match(d, base, "effetto", "skill") }; { this.match(d, base, "effetto", "bonus") } </p>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "dadi") !== "\\" &&
                  <p>Dadi: { this.match(d, base, "effetto", "dadi") }</p>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "altro") !== "\\" &&
                  <p>Altri effetti: { this.match(d, base, "effetto", "altro") }</p>
                  }
                </div>
                )
              }

              else if (d.includes("_") 
              && arry.length > 0) {
                return null
              }

              else {
              arry = []
              return (
                <div className="card">
                  <img className="icon" src={"/images/icons/" + d + ".png"} />
                  <p>Nome: {d}</p>
                  { this.match(d, base, "summary") !== "\\" &&   
                  <p>Descrizione: { this.match(d, base, "summary") }</p>
                  }
                  {(this.props.nome === "magie") && 
                  <p>Costo di mana: { this.match(d, base, "costo", "mana") }%</p> }
                  {(this.props.nome === "magie") && this.match(d, base, "costo", "skill") !== "\\" && 
                  <p>Prova da effettuare: { this.match(d, base, "costo", "skill") }: CD { this.match(d, base, "costo", "cd") }</p>
                  }
                {(this.props.nome === "attacchi") && 
                    <p>Check: { this.match(d, base, "check") }</p>
                }                   
                {(this.props.nome === "attacchi") && 
                    <p>Danni: { this.match(d, base, "effetto", "danni") }</p>
                }                   
                {(this.props.nome === "attacchi") && this.match(d, base, "effetto", "modificatore", "skill") !== "\\" &&
                    <p>Altri modificatori: { this.match(d, base, "effetto", "modificatore", "skill") }: { this.match(d, base, "effetto", "modificatore", "bonus_malus") }</p>
                }       
                {(this.props.nome === "bonus") && this.match(d, base, "modificatore", "skill") !== "\\" &&
                    <p>Modificatore: { this.match(d, base, "modificatore", "skill") }: { this.match(d, base, "modificatore", "bonus") }</p>
                }     
                  {(this.props.nome === "magie") && this.match(d, base, "costo", "altro") !== "\\" &&
                  <p>Altri requisiti: { this.match(d, base, "costo", "altro") }</p>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "skill") !== "\\" &&
                  <p>Bonus abilità: { this.match(d, base, "effetto", "skill") }; { this.match(d, base, "effetto", "bonus") } </p>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "dadi") !== "\\" &&
                  <p>Dadi: { this.match(d, base, "effetto", "dadi") }</p>
                  }
                  {(this.props.nome === "magie") && this.match(d, base, "effetto", "altro") !== "\\" &&
                  <p>Altri effetti: { this.match(d, base, "effetto", "altro") }</p>
                  }
                </div>
              )
                }
            })}</div>

            </div>
        }</div>
    </div>
        )
    }
}