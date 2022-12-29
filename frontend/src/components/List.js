
import logo from '../logo.svg';
import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Component1 from "./component1";
import React from 'react';


class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="App">
      <h2><a href="http://localhost:3000/personaggio/Kalim%20Malik">Kalim</a></h2>
      <h2><a href="http://localhost:3000/personaggio/Guiburgis">Guiburgis</a></h2>
      <h2><a href="http://localhost:3000/personaggio/Aruhara%20Mitski">Aruhara</a></h2>
      <h2><a href="http://localhost:3000/personaggio/Kleonikos%20da%20Bolina">Kleonikos</a></h2>
      <h2><a href="http://localhost:3000/personaggio/Syd%20Rodrigo%20da%20Gorbuc">Syd</a></h2>
        </div>
    );
  }
}

export default List;
