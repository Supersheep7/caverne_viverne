import React from 'react';

class Gauges extends React.Component {
    render() {
        return(
        this.props.gaugeOn === true &&
        <div>
            <div className='gauge-wrapper'>
                <Gauge nome="pf" gaugeHandleClick={this.props.gaugeHandleClick} qty={this.props.pf} max={this.props.maxpf}/>
                <Gauge nome="mana" gaugeHandleClick={this.props.gaugeHandleClick} qty={this.props.mana} max={this.props.maxmana}/>
                <Gauge nome="luc" gaugeHandleClick={this.props.gaugeHandleClick} qty={this.props.luc} max={this.props.maxluc}/>
            </div>
            <div className='dial-wrapper'>
                <Dial nome="CA" int={this.props.CA}/>
                <Dial nome="prestanza" int={this.props.prestanza}/>
                <Dial nome="precisione" int={this.props.precisione}/>
            </div>
        </div>
        
    )
}
}

class Gauge extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        
    var percent = (this.props.qty / this.props.max * 100)
        return (
            <div className="outer-gauge">
                <div className="inner-gauge gauge">
                <button className='left btn' onClick={() => this.props.gaugeHandleClick(-1, this.props.nome)}>&lt;</button>
                <p className="gauge-text">{this.props.nome.toUpperCase()}:  {this.props.qty} / {this.props.max}</p>
                <button className='right btn' onClick={() => this.props.gaugeHandleClick(1, this.props.nome)}>&gt;</button>
                    <div className={this.props.nome + " bar"} style={{'width': percent+'%'}} />
                </div>
            </div>
            
        )
    }
}

class Dial extends React.Component {
    render() {
        return (
            <div className='inner-dial'>
            <img src={"/images/" + this.props.nome + ".png"} className="dial"/>
            <p className="gauge-text dial-text">{this.props.int}</p>
            </div>
        )
    }
}

export default Gauges