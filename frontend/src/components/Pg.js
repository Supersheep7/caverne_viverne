import React from 'react';
import { DiceRoller, Overlay } from './DiceRoller';
import Avatar from "./Avatar";
import Footer from "./Footer"
import Stats from "./Stats";
import Background from './Background';
import Dropdown from "./Dropdown"

class Pg extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: "", inventario: [], CA: [],
      pf: 0, mana: 0, luc: 0,
      modificatore: {
        skill: "",
        mod: 0
      },
      active: [],
      isLoading: true, gaugeOn: false,
      overlayOn: false
    };
      this.DiceRoller = React.createRef();
      this.gaugeHandleClick = this.gaugeHandleClick.bind(this)
      this.match = this.match.bind(this)
  }

  // This machine fetches all the details from the controllers located in localhost:9000
  async pgAPI() {
    await fetch(`http://192.168.1.138:9000${window.location.pathname}`)
        .then(res => res.text())
        .then(res => this.setState({ data: JSON.parse(res), pf: JSON.parse(res)["pf"], mana: JSON.parse(res)["mana"], luc: JSON.parse(res)["luc"] }))
        .catch(err => err);
    await fetch(`http://192.168.1.138:9000/dataAPI/inventario666`)
        .then(res => res.text())
        .then(res => this.setState({ inventario: JSON.parse(res), isLoading: false }))
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

  overlayHandleClick() {
    this.setState({overlayOn: !this.state.overlayOn})
    if (this.state.overlayOn !== true) {
      document.body.style.overflowY = "hidden"
    }
    else {
      document.body.style.overflowY = "overlay"
    }
}


mod(int, nome) {
  this.setState({
    modificatore: {
      skill: nome,
      mod: int
    } 
  })
}

  render() {

    const { isLoading, magie, abilita, attacchi, bonus, tattiche, missioni, inventario, data } = this.state
    const baseUrl = "C:/Repo/Projects/caverne_viverne/frontend/public/images/";
  
    if (isLoading) {
      return null;
    }

    let arrCA = this.state.data.inventario.filter(d => this.match(d.nome, this.state.inventario, "modificatore", "skill") === "CA")
                                          .map(d => this.match(d.nome, this.state.inventario, "modificatore", "bonus"))
    let totalCA = arrCA.reduce((a, b) => a + b, 0)  

    return (
      <div className={data.religione + " App " + "overlay" + this.state.overlayOn + " visible" + this.state.visible}>
          <div className={"dice-roller-overlay open" + this.state.overlayOn}>
            <Overlay open={this.state.overlayOn}
            modificatore={this.state.modificatore} modificatoremod={this.state.modificatore.mod}
            data={data} bonus={bonus}
            ref={this.AddAPI} addstack={this.state.addstack}  mod={this.mod.bind(this)}/> 
          </div>  
        <div>
          <Avatar 
          gaugeOn={this.state.gaugeOn} gauge={this.gauge.bind(this)} gaugeHandleClick={this.gaugeHandleClick.bind(this)} gaugeCallback={this.gaugeCallback.bind(this)}
          nome={data.nome} magia={data.religione} eta={data.eta} altezza={data.altezza} 
          data={data} CA={10 + data.skills.motskills.reazione + totalCA} pf={this.state.pf}
          mana={this.state.mana} luc={this.state.luc} maxpf={data.maxpf} maxmana={data.maxmana} maxluc={data.maxluc}
          source={baseUrl + data.nome} />
          <div className='dropdown-wrapper'>
            <Stats data={data} />
            <Dropdown nome="abilita_innate" base={"abilita"} data={data.abilita_innate}/>
            <Dropdown nome="tattiche" base={"tattiche"} data={data.tattiche}/>
            <Dropdown nome="magie" base={"magie"} data={data.magie}/>
            <Dropdown nome="attacchi" base={"attacchi"} data={data.attacchi}/>
            <Dropdown nome="bonus" base={"bonus"} data={data.bonus}/>
            <Dropdown nome="inventario" base={"inventario"} data={data.inventario}/>
            <Dropdown nome="missioni" base={"missioni"} data={data.missioni}/>
            <Background nome="background" data={data}/>
          </div>
        </div>
        <DiceRoller 
          ref={this.DiceRoller}
          modificatore={this.state.modificatore} modificatoremod={this.state.modificatore.mod}
          data={data} bonus={bonus} active={this.state.active}
          addstack={this.state.addstack}
          overlayHandleClick={this.overlayHandleClick.bind(this)}
          mod={this.mod.bind(this)} 
          />
        <Footer />  
      </div>
    )  
  }

  componentDidMount() {
    Promise.all(Array.from(document.images).filter(img => !img.complete)
                                           .map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })))
                                           .then(() => {
      try {
        this.pgAPI()
        setTimeout(() => {this.setState({visible: true})}, 200)
      } catch (e) {console.log(e)}
  });
  }
}

export default Pg;