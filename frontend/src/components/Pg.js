import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from 'react';


class Pg extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      pgDetails: "",
      magie: [],
      abilita: [],
      inventario: [],
      tattiche: [],
      attacchi: [],
      missioni: [],
      bonus: [], 
      isLoading: true };
  }



pgAPI() {
    fetch(`http://localhost:9000${window.location.pathname}`)
        .then(res => res.text())
        .then(res => this.setState({ pgDetails: JSON.parse(res) }))
        .catch(err => err);
    fetch(`http://localhost:9000/dataAPI/abilita666`)
        .then(res => res.text())
        .then(res => this.setState({ abilita: JSON.parse(res) }))
        .catch(err => err);
    fetch(`http://localhost:9000/dataAPI/inventario666`)
        .then(res => res.text())
        .then(res => this.setState({ inventario: JSON.parse(res) }))
        .catch(err => err);
    fetch(`http://localhost:9000/dataAPI/bonus666`)
        .then(res => res.text())
        .then(res => this.setState({ bonus: JSON.parse(res) }))
        .catch(err => err);
    fetch(`http://localhost:9000/dataAPI/tattiche666`)
        .then(res => res.text())
        .then(res => this.setState({ tattiche: JSON.parse(res) }))
        .catch(err => err);
    fetch(`http://localhost:9000/dataAPI/attacchi666`)
        .then(res => res.text())
        .then(res => this.setState({ attacchi: JSON.parse(res) }))
        .catch(err => err);
    fetch(`http://localhost:9000/dataAPI/magie666`)
        .then(res => res.text())
        .then(res => this.setState({ magie: JSON.parse(res) }))
        .catch(err => err);
    fetch(`http://localhost:9000/dataAPI/missioni666`)
        .then(res => res.text())
        .then(res => this.setState({ missioni: JSON.parse(res), isLoading: false }))
        .catch(err => err);
  }


render() {
  const { isLoading } = this.state
  const data = this.state.pgDetails
    const abilita = this.state.abilita
    const magie = this.state.magie
    const attacchi = this.state.attacchi
    const bonus = this.state.bonus
    const tattiche = this.state.tattiche
    const missioni = this.state.missioni
const inventario = this.state.inventario 
  const points = data.skills

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

    return (
        <div className="App">
          <h1>Nome personaggio</h1>
          <p>{data.nome}</p>
          <h1>Caratteristiche personaggio</h1>
            <ul>
              <li>Età: {data.eta}</li>
              <li>Religione: {data.religione}</li>
              <li>Altezza: {data.altezza}</li>
              <li>Pf: {data.pf}/{data.maxpf}</li>
              <li>Mana: {data.mana}/{data.maxmana}</li>
              <li>Lucidità: {data.luc}/{data.maxluc}</li>
            </ul>
          <h1>Stats</h1>
            <ul>
              <li>Intelletto: {data.stats.intelletto}</li>
                <ul>
                  <li>Logica: {points.intskills.logica}</li>
                  <li>Cultura: {points.intskills.cultura}</li>
                  <li>Pragmatica: {points.intskills.pragmatica}</li>
                  <li>Concettualizzazione: {points.intskills.concettualizzazione}</li>
                  <li>Tattica: {points.intskills.tattica}</li>
                </ul>
              <li>Psiche: {data.stats.psiche}</li>
                <ul>
                  <li>Forza di volontà: {points.psiskills.forza_di_volonta}</li>
                  <li>Sesto senso: {points.psiskills.sesto_senso}</li>
                  <li>Pratica magica: {points.psiskills.pratica_magica}</li>
                  <li>Empatia: {points.psiskills.empatia}</li>
                  <li>Connessione divina: {points.psiskills.connessione_divina}</li>
                </ul>
              <li>Forza: {data.stats.forza}</li>
                <ul>
                  <li>Sopportazione del dolore: {points.forskills.sopportazione_del_dolore}</li>
                  <li>Forza bruta: {points.forskills.forza_bruta}</li>
                  <li>Elettrochimica: {points.forskills.elettrochimica}</li>
                  <li>Prestanza: {points.forskills.prestanza}</li>
                  <li>Istinto animale: {points.forskills.istinto_animale}</li>
                </ul>
              <li>Motorics: {data.stats.motorics}</li>
                <ul>
                  <li>Coordinazione: {points.motskills.coordinazione}</li>
                  <li>Percezione: {points.motskills.percezione}</li>
                  <li>Reazione: {points.motskills.reazione}</li>
                  <li>Precisione: {points.motskills.precisione}</li>
                  <li>Intuito di razza: {points.motskills.intuito_di_razza}</li>
                </ul>
            </ul>
          <h1>Abilità innate</h1>
          <p>{data.abilita_innate.map(d => {
            return (
              <ul>
                <li>Nome abilità: {d}</li>
                <li>Descrizione abilità: {abilita.filter(obj => obj.nome.toLowerCase() == d.toLowerCase())[0].summary}</li>
              </ul>
            )
          })}</p>
          <h1>Tattiche</h1>
          <p>{data.tattiche.map(d => {
            return (
              <ul>
                <li>Nome tattica: {d}</li>
                <li>Descrizione tattica: {tattiche.filter(obj => obj.nome.toLowerCase() == d.toLowerCase())[0].summary}</li>
              </ul>
            )
          })}</p>
          <h1>Magie</h1>
          <p>{data.magie.map(d => {
            return (
              <ul>
                <li>Nome magia: {d}</li>
                <li>Descrizione magia: {
                magie.filter(obj => obj.nome.toLowerCase() == d.toLowerCase())[0].summary
                }</li>
              </ul>
            )
          })}</p>
          <h1>Attacchi</h1>
          <p>{data.attacchi.map(d => {
            return (
              <ul>
                <li>Nome attacco: {d}</li>
                <li>Descrizione attacco: {
                attacchi.filter(obj => obj.nome.toLowerCase() == d.toLowerCase())[0].summary
                }</li>
              </ul>
            )
          })}</p>
          <h1>Bonus</h1>
          <p>{data.bonus.map(d => {
            return (
              <ul>
                <li>Nome bonus: {d}</li>
                <li>Descrizione bonus: {
                bonus.filter(obj => obj.nome.toLowerCase() == d.toLowerCase())[0].summary
                }</li>
              </ul>
            )
          })}</p>
          <h1>Inventario</h1>
          <p>{data.inventario.map(d => {
            return (
              <ul>
                <li>Nome oggetto: {d}</li>
                <li>Descrizione oggetto: {
                bonus.filter(obj => obj.nome.toLowerCase() == d.toLowerCase())[0].summary
                }</li>
              </ul>
            )
          })}</p>
          <h1>Missioni</h1>
          <p>{data.missioni.map(d => {
            return (
              <ul>
                <li>Nome missione: {d}</li>
                <li>Descrizione missione: {
                bonus.filter(obj => obj.nome.toLowerCase() == d.toLowerCase())[0].summary
                }</li>
              </ul>
            )
          })}</p>
          <h1>Background</h1>
          <p>{data.background}</p>
        </div>
    );

    
  }

  componentDidMount() {
    this.pgAPI();
  }

  
}

export default Pg;