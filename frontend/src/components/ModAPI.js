import React from 'react';
import "./ModAPI.css"

export default class ModAPI extends React.Component {
    
    constructor(props)  {
        super(props)
        this.state = {
            show: 0
        }
    }

    turner() {
        this.setState ({show: (this.state.show + 1) % 4})
    }


    render() {
        return (
                <div className="wheels">
                    <FullCircle nome="intelletto" data={this.props.data} turn={0} turner={this.turner.bind(this)} show={this.state.show} mod={this.props.mod} flush={this.props.flush}/>
                    <FullCircle nome="psiche" data={this.props.data} turn={1} turner={this.turner.bind(this)} show={this.state.show} mod={this.props.mod} flush={this.props.flush}/>
                    <FullCircle nome="forza" data={this.props.data} turn={2} turner={this.turner.bind(this)} show={this.state.show} mod={this.props.mod} flush={this.props.flush}/>
                    <FullCircle nome="motorics" data={this.props.data} turn={3} turner={this.turner.bind(this)} show={this.state.show} mod={this.props.mod} flush={this.props.flush}/>
                </div>
            

            
            /*
            <div>
                <p>{this.props.modificatore.mod}</p>
                <p>{Object.keys(this.props.data.stats).map(s => {
                    return (
                        <button name={s} onClick={() => {this.props.mod(this.props.data.stats[s], s); this.props.flush()}}>{s}</button>
                    )
                })}</p>
                <p>{Object.keys(this.props.data.skills.intskills).map(s => {
                    return (
                        <button name={s} onClick={() => {this.props.mod(this.props.data.skills.intskills[s] + this.props.data.stats.intelletto, s); this.props.flush()}}>{s}</button>
                    )
                })}</p>
                <p>{Object.keys(this.props.data.skills.psiskills).map(s => {
                    return (
                        <button name={s} onClick={() => {this.props.mod(this.props.data.skills.psiskills[s] + this.props.data.stats.psiche, s); this.props.flush()}}>{s}</button>
                    )
                })}</p>
                <p>{Object.keys(this.props.data.skills.forskills).map(s => {
                    return (
                        <button name={s} onClick={() => {this.props.mod(this.props.data.skills.forskills[s] + this.props.data.stats.forza, s); this.props.flush()}}>{s}</button>
                    )
                })}</p>
                <p>{Object.keys(this.props.data.skills.motskills).map(s => {
                    return (
                        <button name={s} onClick={() => {this.props.mod(this.props.data.skills.motskills[s] + this.props.data.stats.motorics, s); this.props.flush()}}>{s}</button>
                    )
                })}</p>
                </div> */
        )
    }
}

class Arc extends React.Component {
    constructor(props) {
        super(props)
        this.sate = {}
    }


    render() {
        
        const backgroundUrl = "/images/attr/" + this.props.nome + ".png"
        let modSum = this.props.data.skills[this.props.father][this.props.nome] + this.props.data.stats[this.props.stat]

        return (
            <div className={"arc"} style={{
                backgroundImage: `url(${backgroundUrl})`,
                backgroundSize: 'cover'
            }}
            onClick={() => {this.props.mod(modSum, this.props.nome); this.props.flush()}}
            > <p className="skillwheelname">{
                !this.props.nome.includes("_") &&
                this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)
                }
                {this.props.nome.includes("_") && this.props.nome !== "forza_di_volonta" &&
                this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1).replace(/_/g, " ")
                }
                {this.props.nome === "forza_di_volonta" && 
                "Forza di volontà"}</p>
            </div>
        )
    }
}

class FullCircle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const objSkills = Object.keys(this.props.data.skills).filter(d => {return d.slice(0,3) === this.props.nome.slice(0,3)});
        const skill = this.props.data.skills[objSkills];
        console.log(objSkills)

        return (
        <div className={'wheel-wrapper wheelshow' + (this.props.show === this.props.turn)}>
            <div class="wheel">
                    <Arc nome={Object.keys(skill)[0]} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                    <Arc nome={Object.keys(skill)[1]} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                    <Arc nome={Object.keys(skill)[2]} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                    <Arc nome={Object.keys(skill)[3]} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/>
                    <Arc nome={Object.keys(skill)[4]} stat={this.props.nome} father={objSkills} data={this.props.data} mod={this.props.mod} flush={this.props.flush}/> 
                    <div onClick={() => this.props.turner()}>
                    <Inner nome={this.props.nome} />
                    </div>
            </div>
        </div>
        )
    }
}

class Inner extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
    return (
        <div className={"inner-circle " + this.props.nome}><p>{this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1)}</p></div>
    )
    }
}