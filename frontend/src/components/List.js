
import Buttons from "./Buttons"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from 'react';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }


  render() {

    return (
      <div className={"App visible" + this.state.visible}>
        <div className="Home-wrapper"> 
          <Buttons className="Home"/>
        </div>
      </div>
    );
  }

  
  componentDidMount() {
    Promise.all(Array.from(document.images).filter(img => !img.complete)
                                           .map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })))
                                           .then(() => {
      try {
        setTimeout(() => {this.setState({visible: true})}, 500)
      } catch (e) {console.log(e)}
  });
  }
}

export default List;
