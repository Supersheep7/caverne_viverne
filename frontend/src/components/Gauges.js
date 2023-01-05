import React from 'react';

class Gauges extends React.Component {
    render() {
        return(
        this.props.gaugeOn === true &&
        <div>
            <Gauge nome="pf" />
            <Gauge nome="mana" />
            <Gauge nome="luc" />
            <CA />
        </div>
        
    )
}
}

class Gauge extends React.Component {
    render() {
        return (
            <div className="outer-gauge">
                <div className="inner-gauge gauge">
                    <div className={this.props.nome + " bar"} />
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