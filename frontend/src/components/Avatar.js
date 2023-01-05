import React from 'react';
import Buttons from './Buttons'
import Gauges from './Gauges'

class Avatar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            gaugeOn: false
        }
    }
    
    render() {
    
    return (
        <div id="header">
            <div>
                <div>
                <a href="http://localhost:3000/"><img id="home" src="/images/Home.png" /></a>
                    <nav>
                        <Buttons className="navigator"/></nav>
                </div>
            </div>
            <div id="avatar">
                <img id="face" onClick={() => {this.props.gauge(); this.setState({gaugeOn: !this.state.gaugeOn})}} src={"/images/" + this.props.nome + ".png"} />
                <img id="bg" className={"blur" + this.state.gaugeOn} src={"/images/" + this.props.nome + (" bg.jpg")} />
                <div className="gauges"><Gauges gaugeOn={this.props.gaugeOn} /></div>
                 <p>{this.props.eta} anni, {(this.props.altezza).toString().charAt(0)}.{(this.props.altezza).toString().substring(1, 3)} m{this.props.magia !== "nessuna" && ", Magia " + this.props.magia.charAt(0).toUpperCase() + this.props.magia.slice(1)}</p>
                <h1>{this.props.nome}</h1>
            </div>
        </div>
    )
    }
}

export default Avatar