import React from 'react';

class Stats extends React.Component {

    render() {
        return(
        <div className="stats">
            <div id="forza-stats">
                <Stat nome="intelletto" data={this.props.data} colore={this.props.colore}/>
                <div className='stats-wrapper'>
                    <Skill nome="logica" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="cultura" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="pragmatica" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="concettualizzazione" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="tattica" data={this.props.data} colore={this.props.colore}/>
                </div>
                
                <Stat nome="psiche" data={this.props.data} colore={this.props.colore}/>
                <div className='stats-wrapper'>
                    <Skill nome="forza_di_volonta" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="sesto_senso" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="pratica_magica" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="empatia" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="connessione_divina" data={this.props.data} colore={this.props.colore}/>
                </div>
                <Stat nome="forza" data={this.props.data} colore={this.props.colore}/>
                <div className='stats-wrapper'>
                    <Skill nome="sopportazione_del_dolore" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="forza_bruta" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="elettrochimica" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="prestanza" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="istinto_animale" data={this.props.data} colore={this.props.colore}/>
                </div>
                
                <Stat nome="motorics" data={this.props.data} colore={this.props.colore}/>
                <div className='stats-wrapper'>
                    <Skill nome="coordinazione" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="percezione" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="reazione" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="precisione" data={this.props.data} colore={this.props.colore}/>
                    <Skill nome="intuito_di_razza" data={this.props.data} colore={this.props.colore}/>
                </div>
            </div>
        </div>
        )
    }
}

class Stat extends React.Component {
    render() {
        return (
            <div id={this.props.nome} className="stat-skill-container">
                <div className={this.props.colore + " stat-tag"}>
                    <h3>{this.props.nome}</h3>
                </div>
                <div className="stat-content">{this.props.data.stats[this.props.nome]}</div>
            </div>
        )
    }
}

class Skill extends React.Component {
    render() {

        return (
            <div id={this.props.nome} className="stat-skill-container">
                <div className={this.props.colore + " skill-tag"}>
                    <h3>{this.props.nome.substring(0,3)}</h3>
                </div>
                <div className="skill-content">{Object.keys(this.props.data.skills).map(d => {
                if (this.props.data.skills[d][this.props.nome] !== undefined) {
                    return this.props.data.skills[d][this.props.nome]
                }
                
                else return null
                })}</div>
            </div>
        )
    }
}

export default Stats