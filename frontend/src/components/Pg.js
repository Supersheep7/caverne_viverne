import '../App.css';
import React from 'react';
import ModAPI from "./ModAPI";
import AddAPI from "./AddAPI";
import Avatar from "./Avatar";
import Stats from "./Stats";
import Dropdown from "./Dropdown"

class Pg extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      /* Data viz and JSON fetch */ 
      data: "",
      magie: [],
      abilita: [],
      inventario: [],
      tattiche: [],
      attacchi: [],
      missioni: [],
      bonus: [], 
      CA: [],
      pf: 0,
      mana: 0,
      luc: 0,
      /* Interactivity */
      modificatore: {
        skill: "",
        mod: 0
      },
      addstack: 0,
      isLoading: true,
      gaugeOn: false
    };
      this.AddAPI = React.createRef();
      this.gaugeHandleClick = this.gaugeHandleClick.bind(this)
      this.match = this.match.bind(this)
  }

  // This machine fetches all the details from the controllers located in localhost:9000
  async pgAPI() {
    await fetch(`http://localhost:9000${window.location.pathname}`)
        .then(res => res.text())
        .then(res => this.setState({ data: JSON.parse(res), pf: JSON.parse(res)["pf"], mana: JSON.parse(res)["mana"], luc: JSON.parse(res)["luc"] }))
        .catch(err => err);
    await fetch(`http://localhost:9000/dataAPI/abilita666`)
        .then(res => res.text())
        .then(res => this.setState({ abilita: JSON.parse(res) }))
        .catch(err => err);
    await fetch(`http://localhost:9000/dataAPI/inventario666`)
        .then(res => res.text())
        .then(res => this.setState({ inventario: JSON.parse(res) }))
        .catch(err => err);
    await fetch(`http://localhost:9000/dataAPI/bonus666`)
        .then(res => res.text())
        .then(res => this.setState({ bonus: JSON.parse(res) }))
        .catch(err => err);
    await fetch(`http://localhost:9000/dataAPI/tattiche666`)
        .then(res => res.text())
        .then(res => this.setState({ tattiche: JSON.parse(res) }))
        .catch(err => err);
    await fetch(`http://localhost:9000/dataAPI/attacchi666`)
        .then(res => res.text())
        .then(res => this.setState({ attacchi: JSON.parse(res) }))
        .catch(err => err);
    await fetch(`http://localhost:9000/dataAPI/magie666`)
        .then(res => res.text())
        .then(res => this.setState({ magie: JSON.parse(res) }))
        .catch(err => err);
    await fetch(`http://localhost:9000/dataAPI/missioni666`)
        .then(res => res.text())
        .then(res => this.setState({ missioni: JSON.parse(res), isLoading: false }))
        .catch(err => err);
  }
  
  // Finds details of character skills, items, attacks, etc
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

  /* State management for modifiers */

  gauge() {
    this.setState ({
      gaugeOn: !this.state.gaugeOn
    })
  }
 
  gaugeHandleClick(int, bar) {
    this.setState({
        [bar]: this.state[bar] + int
  }) 
}

gaugeCallback = (stat, count) => {
  this.setState({[stat]: count})
}

  mod(int, nome) {
    this.setState({
        modificatore: {
          skill: nome,
          mod: int
        } 
    })
  }

  add(int) {
    this.setState({
        addstack: this.state.addstack + int
    })
  }

  flush() {
    this.setState({
      addstack: 0
    })
    this.AddAPI.current.setState({
      active: []
    })
  }

  render() {

    // This whole render was made with blood sweat and tears, some notable sanitizers:
      // 1 - "Double db entries merger": whenever there's a "_" this method renders only the first occurrence of the repeating entries. Fixes multiple entries in the database 
      // 2 - Conditional rendering: if the character has not the entry in the db, the method will render null

    const { isLoading, magie, abilita, attacchi, bonus, tattiche, missioni, inventario, data } = this.state
    const baseUrl = "C:/Repo/Projects/caverne_viverne/frontend/public/images/";
    let arry = [] 

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    let arrCA = this.state.data.inventario.filter(d => this.match(d.nome, this.state.inventario, "modificatore", "skill") === "CA")
                                          .map(d => this.match(d.nome, this.state.inventario, "modificatore", "bonus"))
    let totalCA = arrCA.reduce((a, b) => a + b, 0)  

    return (
        <div className={data.religione + " App"}>
          <div>
            <Avatar 
            gaugeOn={this.state.gaugeOn} 
            gauge={this.gauge.bind(this)} 
            gaugeHandleClick={this.gaugeHandleClick.bind(this)}
            gaugeCallback={this.gaugeCallback.bind(this)}
            nome={data.nome} 
            magia={data.religione} 
            eta={data.eta} 
            altezza={data.altezza} 
            data={data} 
            CA={10 + data.skills.motskills.reazione + totalCA}
            pf={this.state.pf}
            mana={this.state.mana}
            luc={this.state.luc}
            maxpf={data.maxpf}
            maxmana={data.maxmana}
            maxluc={data.maxluc}
            source={baseUrl + data.nome}/>
            <div className='dropdown-wrapper'>
              <Dropdown nome="abilita_innate" base={abilita} data={data.abilita_innate}/>
              <Dropdown nome="tattiche" base={tattiche} data={data.tattiche}/>
              <Dropdown nome="magie" base={magie} data={data.magie}/>
              <Dropdown nome="attacchi" base={attacchi} data={data.attacchi}/>
              <Dropdown nome="bonus" base={bonus} data={data.bonus}/>
              <Dropdown nome="inventario" base={inventario} data={data.inventario}/>
              <Dropdown nome="missioni" base={missioni} data={data.missioni}/>
              <Dropdown nome="missioni" base={data.background} />
            </div>
            <p>Risultato finale mod + add = {this.state.modificatore.mod + this.state.addstack}</p>
            <ModAPI modificatore={this.state.modificatore.mod} data={this.state.data} mod={this.mod.bind(this)} flush={this.flush.bind(this)}/>
            <AddAPI ref={this.AddAPI} addstack={this.state.addstack} modificatore={this.state.modificatore} data={data} bonus={this.state.bonus} add={this.add.bind(this)}/>
          </div>
          <div>
            <Stats className="stats" data={data} colore={data.religione}/>




            <h1>Abilità innate</h1>
            <p>{data.abilita_innate.map(d => {
              return (
                <ul>
                  <li>Nome abilità: {d}</li>
                  <li>Descrizione abilità: {this.match(d, abilita, "summary")}</li>
                </ul>
              )
            })}</p>
            <h1>Tattiche</h1>
            <p>{data.tattiche.map(d => {         
            if ((d.includes("_") && arry.length === 0) || (d.includes("_")
              && arry[0].substring(0, arry[0].indexOf("_")) !== d.substring(0, d.indexOf("_")) 
              && arry.length > 0)) {
                arry = []
                arry.push(d)
                return ( 
                  <ul>
                  <li>Nome tattica: {arry[0].substring(0, arry[0].indexOf("_"))} </li>
                  <li>Descrizione tattica: { this.match(d, tattiche, "summary") }</li>
                  { this.match(d, tattiche, "costo", "check") !== "\\" &&
                  <li>Prova da effettuare: {this.match(d, tattiche, "costo", "check")}: CD {this.match(d, tattiche, "costo", "cd")}</li>              
                  }
                  { this.match(d, tattiche, "costo", "altro") !== "\\" &&
                  <li>Altri requisiti: {this.match(d, tattiche, "costo", "altro")}</li>              
                  }
                  { this.match(d, tattiche, "effetto", "skill") !== "\\" &&
                  <li>Bonus abilità: {this.match(d, tattiche, "effetto", "skill")}: {this.match(d, tattiche, "effetto", "bonus")}</li>
                  }
                  { this.match(d, tattiche, "effetto", "dadi") !== "\\" &&   
                  <li>Dadi: {this.match(d, tattiche, "effetto", "dadi")}</li>
                  }                            
                </ul>)
              }
              else if (d.includes("_") 
              && arry.length > 0) {
                return null
              }
              else {
              arry = []
              return (
                <ul>
                  <li>Nome tattica: {d}</li>
                  <li>Descrizione tattica: { this.match(d, tattiche, "summary") }</li>
                  { this.match(d, tattiche, "costo", "check") !== "\\" &&
                  <li>Prova da effettuare: {this.match(d, tattiche, "costo", "check")}: CD {this.match(d, tattiche, "costo", "cd")}</li>              
                  }
                  { this.match(d, tattiche, "costo", "altro") !== "\\" &&
                  <li>Altri requisiti: {this.match(d, tattiche, "costo", "altro")}</li>              
                  }
                  { this.match(d, tattiche, "effetto", "skill") !== "\\" &&
                  <li>Bonus abilità: {this.match(d, tattiche, "effetto", "skill")}: {this.match(d, tattiche, "effetto", "bonus")}</li>
                  }
                  { this.match(d, tattiche, "effetto", "dadi") !== "\\" &&   
                  <li>Dadi: {this.match(d, tattiche, "effetto", "dadi")}</li>
                  }                            
                </ul>
              )
            }
            })}</p>
            <h1>Magie</h1>
            <p>{data.magie.map(d => {
              if ((d.includes("_") && arry.length === 0) || (d.includes("_")
              && arry[0].substring(0, arry[0].indexOf("_")) !== d.substring(0, d.indexOf("_")) 
              && arry.length > 0)) {
                arry = []
                arry.push(d)
                return (
                  <ul>
                  <li>Nome magia: {arry[0].substring(0, arry[0].indexOf("_"))}</li>
                  { this.match(d, magie, "summary") !== "\\" &&   
                  <li>Descrizione magia: { this.match(d, magie, "summary") }</li>
                  }
                  <li>Costo di mana: { this.match(d, magie, "costo", "mana") }%</li>
                  { this.match(d, magie, "costo", "skill") !== "\\" && 
                  <li>Prova da effettuare: { this.match(d, magie, "costo", "skill") }: CD { this.match(d, magie, "costo", "cd") }</li>
                  }
                  { this.match(d, magie, "costo", "altro") !== "\\" &&
                  <li>Altri requisiti: { this.match(d, magie, "costo", "altro") }</li>
                  }
                  { this.match(d, magie, "effetto", "skill") !== "\\" &&
                  <li>Bonus abilità: { this.match(d, magie, "effetto", "skill") }; { this.match(d, magie, "effetto", "bonus") } </li>
                  }
                  { this.match(d, magie, "effetto", "dadi") !== "\\" &&
                  <li>Dadi: { this.match(d, magie, "effetto", "dadi") }</li>
                  }
                  { this.match(d, magie, "effetto", "altro") !== "\\" &&
                  <li>Altri effetti: { this.match(d, magie, "effetto", "altro") }</li>
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
                  <li>Nome magia: {d}</li>
                  { this.match(d, magie, "summary") !== "\\" &&   
                  <li>Descrizione magia: { this.match(d, magie, "summary") }</li>
                  }
                  <li>Costo di mana: { this.match(d, magie, "costo", "mana") }%</li>
                  { this.match(d, magie, "costo", "skill") !== "\\" && 
                  <li>Prova da effettuare: { this.match(d, magie, "costo", "skill") }: CD { this.match(d, magie, "costo", "cd") }</li>
                  }
                  { this.match(d, magie, "costo", "altro") !== "\\" &&
                  <li>Altri requisiti: { this.match(d, magie, "costo", "altro") }</li>
                  }
                  { this.match(d, magie, "effetto", "skill") !== "\\" &&
                  <li>Bonus abilità: { this.match(d, magie, "effetto", "skill") }; { this.match(d, magie, "effetto", "bonus") } </li>
                  }
                  { this.match(d, magie, "effetto", "dadi") !== "\\" &&
                  <li>Dadi: { this.match(d, magie, "effetto", "dadi") }</li>
                  }
                  { this.match(d, magie, "effetto", "altro") !== "\\" &&
                  <li>Altri effetti: { this.match(d, magie, "effetto", "altro") }</li>
                  }
                </ul>
              )
                }
            })}</p>
            <h1>Attacchi</h1>
            <p>{data.attacchi.map(d => {
              if ((d.includes("_") && arry.length === 0) || (d.includes("_")
              && arry[0].substring(0, arry[0].indexOf("_")) !== d.substring(0, d.indexOf("_")) 
              && arry.length > 0)) {
                arry = []
                arry.push(d)
                return (
                  <ul>
                  <li>Nome attacco: {arry[0].substring(0, arry[0].indexOf("_"))}</li>
                  <li>Descrizione attacco: { this.match(d, attacchi, "summary") }</li>
                  <li>Check: { this.match(d, attacchi, "check") }</li>
                  <li>Danni: { this.match(d, attacchi, "effetto", "danni") }</li>
                  { this.match(d, attacchi, "effetto", "modificatore", "skill") !== "\\" &&
                  <li>Altri modificatori: { this.match(d, attacchi, "effetto", "modificatore", "skill") }: { this.match(d, attacchi, "effetto", "modificatore", "bonus_malus") }</li>
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
                  <li>Nome attacco: {d}</li>
                  <li>Descrizione attacco: { this.match(d, attacchi, "summary") }</li>
                  <li>Check: { this.match(d, attacchi, "check") }</li>
                  <li>Danni: { this.match(d, attacchi, "effetto", "danni") }</li>
                  { this.match(d, attacchi, "effetto", "modificatore", "skill") !== "\\" &&
                  <li>Altri modificatori: { this.match(d, attacchi, "effetto", "modificatore", "skill") }: { this.match(d, attacchi, "effetto", "modificatore", "bonus_malus") }</li>
                  }
                </ul>
              )
            }
            })}</p>
            <h1>Bonus</h1>
            <p>{data.bonus.map(d => {
              if ((d.includes("_") && arry.length === 0) || (d.includes("_")
              && arry[0].substring(0, arry[0].indexOf("_")) !== d.substring(0, d.indexOf("_")) 
              && arry.length > 0)) {
                arry = []
                arry.push(d)
                return (
                  <ul>
                    <li>Nome bonus: {arry[0].substring(0, arry[0].indexOf("_"))}</li>
                    <li>Descrizione bonus: { this.match(d, bonus, "summary") }</li>
                    { this.match(d, bonus, "modificatore", "skill") !== "\\" &&
                    <li>Modificatore: { this.match(d, bonus, "modificatore", "skill") }: { this.match(d, bonus, "modificatore", "bonus") }</li>
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
                  <li>Nome bonus: {d}</li>
                  <li>Descrizione bonus: { this.match(d, bonus, "summary") }</li>
                  { this.match(d, bonus, "modificatore", "skill") !== "\\" &&
                  <li>Modificatore: { this.match(d, bonus, "modificatore", "skill") }: { this.match(d, bonus, "modificatore", "bonus") }</li>
                  } 
                </ul>
              )
            }
            })}</p>
            <h1>Inventario</h1>
            <p>{data.inventario.map(d => {
              if ((d.nome.includes("_") && arry.length === 0) || (d.nome.includes("_")
              && arry[0].substring(0, arry[0].indexOf("_")) !== d.nome.substring(0, d.nome.indexOf("_")) 
              && arry.length > 0)) {
              arry = []
              arry.push(d.nome)
              return (
                <ul>
                  <li>Nome oggetto: {arry[0].substring(0, arry[0].indexOf("_"))}</li>
                  <li>Descrizione oggetto: { this.match(d.nome, inventario, "summary") }</li>
                  <li>Quantità: {d.quantita}</li>
                  { this.match(d.nome, inventario, "magia") !== "\\" &&
                  <li>Magia: { this.match(d.nome, inventario, "magia") }</li>
                  }
                  { this.match(d.nome, inventario, "modificatore", "skill") !== "\\" &&
                  <li>Modificatore: { this.match(d.nome, inventario, "modificatore", "skill") }: { this.match(d.nome, inventario, "modificatore", "bonus") }</li>
                  }
                </ul>
              )
              }
              else if (d.nome.includes("_") 
              && arry.length > 0) {
                return null
              }
              else {
              arry = []
              return (
                <ul>
                  <li>Nome oggetto: {d.nome}</li>
                  <li>Descrizione oggetto: { this.match(d.nome, inventario, "summary") }</li>
                  <li>Quantità: {d.quantita}</li>
                  { this.match(d.nome, inventario, "magia") !== "\\" &&
                  <li>Magia: { this.match(d.nome, inventario, "magia") }</li>
                  }
                  { this.match(d.nome, inventario, "modificatore", "skill") !== "\\" &&
                  <li>Modificatore: { this.match(d.nome, inventario, "modificatore", "skill") }: { this.match(d.nome, inventario, "modificatore", "bonus") }</li>
                  }
                </ul>
                )
              }
            })}</p>
            <h1>Missioni</h1>
            <p>{data.missioni.map(d => {
              return (
                <ul>
                  <li>Nome missione: {d}</li>
                  <li>Descrizione missione: { this.match(d, missioni, "summary") }</li>
                </ul>
              )
            })}</p>
            <h1>Background</h1>
            <p>{data.background}</p>
          </div>
        </div>
      );  
  }

  componentDidMount() {
  try {
    this.pgAPI();
  } catch (e) {console.log(e)}
  }
}

export default Pg;