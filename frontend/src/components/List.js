
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
      <h2><a href="http://localhost:3000/personaggio/kalim%20malik">Kalim</a></h2>
      <h2><a href="http://localhost:3000/personaggio/guiburgis">Guiburgis</a></h2>
      <h2><a href="http://localhost:3000/personaggio/aruhara%20mitski">Aruhara</a></h2>
      <h2><a href="http://localhost:3000/personaggio/kleonikos%20da%20bolina">Kleonikos</a></h2>
      <h2><a href="http://localhost:3000/personaggio/syd%20rodrigo%20da%20gorbuc">Syd</a></h2>
        </div>
    );
  }
}

export default List;
