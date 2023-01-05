import React from 'react';

class Logo extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
    
    return (
        <div id="avatar">
            <img id="face" src={"/images/" + this.props.nome + ".png"} />
            <img id="bg" src={"/images/" + this.props.nome + (" bg.jpg")} />
        </div>
    )
    }
}

export default Logo