
import Buttons from "./Buttons"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
        <Buttons className="Home"/>
      </div>
    );
  }
}

export default List;
