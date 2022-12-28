
import logo from '../logo.svg';
import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Component1 from "./component1";
import React from 'react';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { personaggio: "" };
    this.state = { abilita: "" };
    this.state = { attacchi: "" };
    this.state = { bonus: "" };
    this.state = { inventario: "" };
    this.state = { magie: "" };
    this.state = { missioni: "" };
    this.state = { tattiche: "" };
    
  }

personaggioAPI() {
    fetch("http://localhost:9000/dataAPI/personaggio666")
        .then(res => res.text())
        .then(res => this.setState({ personaggio: res }))
        .catch(err => err);
  }
  
abilitaAPI() {
    fetch("http://localhost:9000/dataAPI/abilita666")
        .then(res => res.text())
        .then(res => this.setState({ abilita: res }))
        .catch(err => err);
  }
attacchiAPI() {
    fetch("http://localhost:9000/dataAPI/attacchi666")
        .then(res => res.text())
        .then(res => this.setState({ attacchi: res }))
        .catch(err => err);
  }
bonusAPI() {
    fetch("http://localhost:9000/dataAPI/bonus666")
        .then(res => res.text())
        .then(res => this.setState({ bonus: res }))
        .catch(err => err);
  }
inventarioAPI() {
    fetch("http://localhost:9000/dataAPI/inventario666")
        .then(res => res.text())
        .then(res => this.setState({ inventario: res }))
        .catch(err => err);
  }
magieAPI() {
    fetch("http://localhost:9000/dataAPI/magie666")
        .then(res => res.text())
        .then(res => this.setState({ magie: res }))
        .catch(err => err);
  }
missioniAPI() {
    fetch("http://localhost:9000/dataAPI/missioni666")
        .then(res => res.text())
        .then(res => this.setState({ missioni: res }))
        .catch(err => err);
  }
tatticheAPI() {
    fetch("http://localhost:9000/dataAPI/tattiche666")
        .then(res => res.text())
        .then(res => this.setState({ tattiche: res }))
        .catch(err => err);
  }

  componentDidMount() {
    this.personaggioAPI();
    this.abilitaAPI();
    this.bonusAPI();
    this.inventarioAPI();
    this.magieAPI();
    this.missioniAPI();
    this.tatticheAPI();
    this.attacchiAPI();
  }

  render() {

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <h1>Dati dei personaggi</h1>
          <p className="App-intro">{this.state.personaggio}</p>
          <h1>Dati delle abilità innate</h1>
          <p className="App-intro">{this.state.abilita}</p>
          <h1>Dati degli attacchi</h1>
          <p className="App-intro">{this.state.attacchi}</p>
          <h1>Dati dei bonus</h1>
          <p className="App-intro">{this.state.bonus}</p>
          <h1>Dati dell'inventario</h1>
          <p className="App-intro">{this.state.inventario}</p>
          <h1>Dati delle magie</h1>
          <p className="App-intro">{this.state.magie}</p>
          <h1>Dati delle missioni</h1>
          <p className="App-intro">{this.state.missioni}</p>
          <h1>Dati delle tattiche di combattimento</h1>
          <p className="App-intro">{this.state.tattiche}</p>
          <h1></h1>
        </div>
    );
  }
}

export default List;
