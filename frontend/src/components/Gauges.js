import React from 'react';

class Gauges extends React.Component {
    render() {
        return(
        this.props.gaugeOn === true &&
        <div>
            <Gauge nome="pf" qty={this.props.pf} max={this.props.maxpf}/>
            <Gauge nome="mana" qty={this.props.mana} max={this.props.maxmana}/>
            <Gauge nome="luc" qty={this.props.luc} max={this.props.maxluc}/>
            <CA />
        </div>
        
    )
}
}

class Gauge extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            max: this.props.max,
            qty: this.props.qty
        }
        this.qtyHandleClick = this.qtyHandleClick.bind(this);
    }


    qtyHandleClick(int) {
        this.setState({
            qty: this.state.qty + int
        })
     
    }

    render() {
    var percent = (this.state.qty / this.state.max) * 100
        return (
            <div className="outer-gauge">
                <div className="inner-gauge gauge">
                <button className='left btn' onClick={() => this.qtyHandleClick(-1)}>&lt;</button>
                <p className="gauge-text">{this.props.nome.toUpperCase()}:  {this.state.qty} / {this.state.max}</p>
                <button className='right btn' onClick={() => this.qtyHandleClick(1)}>&gt;</button>
                    <div className={this.props.nome + " bar"} style={{'width': percent+'%'}} />
                </div>
            </div>
            
        )
    }
}

class CA extends React.Component {
    render() {
        return null
    }
}

export default Gauges