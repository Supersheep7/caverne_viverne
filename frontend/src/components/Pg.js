import React from 'react';
import { DiceRoller, Overlay } from './DiceRoller';
import Avatar from "./Avatar";
import Footer from "./Footer"
import Stats from "./Stats";
import Dropdown from "./Dropdown"

class Pg extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      /* Data viz and JSON fetch */ 
      data: "", 
      magie: [], abilita: [], inventario: [], tattiche: [], 
      attacchi: [], missioni: [], bonus: [], CA: [],
      pf: 0, mana: 0, luc: 0,
      /* Interactivity */
      modificatore: {
        skill: "",
        mod: 0
      },
      addstack: 0,
      isLoading: true, gaugeOn: false,
      overlayOn: false
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


  overlayHandleClick() {
    this.setState({overlayOn: !this.state.overlayOn})
    if (this.state.overlayOn !== true) {
    document.body.style.overflowY = "hidden"
    }
    else {
    document.body.style.overflowY = "auto"
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


flush() {
  this.setState({
  addstack: 0
  })
  this.AddAPI.current.setState({
  active: []
  })
}


add(int) {
  this.setState({
      addstack: this.state.addstack + int
  })
}

  render() {

    const { isLoading, magie, abilita, attacchi, bonus, tattiche, missioni, inventario, data } = this.state
    const baseUrl = "C:/Repo/Projects/caverne_viverne/frontend/public/images/";
  
    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    let arrCA = this.state.data.inventario.filter(d => this.match(d.nome, this.state.inventario, "modificatore", "skill") === "CA")
                                          .map(d => this.match(d.nome, this.state.inventario, "modificatore", "bonus"))
    let totalCA = arrCA.reduce((a, b) => a + b, 0)  

    return (
      <div className={data.religione + " App " + "overlay" + this.state.overlayOn}>
                <div className={"dice-roller-overlay open" + this.state.overlayOn}><Overlay open={this.state.overlayOn}
                  modificatore={this.state.modificatore} modificatoremod={this.state.modificatore.mod}
                  data={data} bonus={bonus}
                  ref={this.AddAPI} addstack={this.state.addstack}  mod={this.mod.bind(this)} flush={this.flush.bind(this)} add={this.add.bind(this)}
          
        /> </div>  
        <div>
          <Avatar 
          gaugeOn={this.state.gaugeOn} gauge={this.gauge.bind(this)} gaugeHandleClick={this.gaugeHandleClick.bind(this)} gaugeCallback={this.gaugeCallback.bind(this)}
          nome={data.nome} magia={data.religione} eta={data.eta} altezza={data.altezza} 
          data={data} CA={10 + data.skills.motskills.reazione + totalCA} pf={this.state.pf}
          mana={this.state.mana} luc={this.state.luc} maxpf={data.maxpf} maxmana={data.maxmana} maxluc={data.maxluc}
          source={baseUrl + data.nome} />
          <div className='dropdown-wrapper'>
            <Stats className="stats" data={data} />
            <Dropdown nome="abilita_innate" base={abilita} data={data.abilita_innate}/>
            <Dropdown nome="tattiche" base={tattiche} data={data.tattiche}/>
            <Dropdown nome="magie" base={magie} data={data.magie}/>
            <Dropdown nome="attacchi" base={attacchi} data={data.attacchi}/>
            <Dropdown nome="bonus" base={bonus} data={data.bonus}/>
            <Dropdown nome="inventario" base={inventario} data={data.inventario}/>
            <Dropdown nome="missioni" base={missioni} data={data.missioni}/>
            <Dropdown nome="background" base={data.background} />
          </div>
        {/*  <AddAPI ref={this.props.AddAPI} addstack={this.props.addstack} modificatore={this.props.modificatore} data={this.props.data} bonus={this.props.bonus} add={this.props.add()}/>
          <ModAPI modificatore={this.props.modificatoremod} data={this.props.data} mod={this.props.mod()} flush={this.props.flush()}/>        
    */}</div>
        
        <DiceRoller 
          modificatore={this.state.modificatore} modificatoremod={this.state.modificatore.mod}
          data={data} bonus={bonus}
          ref={this.AddAPI} addstack={this.state.addstack}
          overlayHandleClick={this.overlayHandleClick.bind(this)}
          mod={this.mod.bind(this)} flush={this.flush.bind(this)} add={this.add.bind(this)}
          />
          <Footer />

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