import React from 'react';

export default class ModAPI extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div>
                <p>{this.props.modificatore}</p>
                <button name="intelletto" onClick={() => this.props.mod(this.props.data.stats.intelletto)}>Intelletto</button>
                <button name="logica" onClick={() => this.props.mod(this.props.data.skills.intskills.logica + this.props.data.stats.intelletto)}>Logica</button>
                <button name="cultura" onClick={() => this.props.mod(this.props.data.skills.intskills.cultura + this.props.data.stats.intelletto)}>Cultura</button>
                <button name="pragmatica" onClick={() => this.props.mod(this.props.data.skills.intskills.pragmatica + this.props.data.stats.intelletto)}>Pragmatica</button>
                <button name="concettualizzazione" onClick={() => this.props.mod(this.props.data.skills.intskills.concettualizzazione + this.props.data.stats.intelletto)}>Concettualizzazione</button>
                <button name="tattica" onClick={() => this.props.mod(this.props.data.skills.intskills.tattica + this.props.data.stats.intelletto)}>Tattica</button>
                <button name="psiche" onClick={() => this.props.mod(this.props.data.stats.psiche)}>psiche</button>
                <button name="forza_di_volonta" onClick={() => this.props.mod(this.props.data.skills.psiskills.forza_di_volonta + this.props.data.stats.psiche)}>forza_di_volonta</button>
                <button name="sesto_senso" onClick={() => this.props.mod(this.props.data.skills.psiskills.sesto_senso + this.props.data.stats.psiche)}>sesto_senso</button>
                <button name="pratica_magica" onClick={() => this.props.mod(this.props.data.skills.psiskills.pratica_magica + this.props.data.stats.psiche)}>pratica_magica</button>
                <button name="empatia" onClick={() => this.props.mod(this.props.data.skills.psiskills.empatia + this.props.data.stats.psiche)}>empatia</button>
                <button name="connessione_divina" onClick={() => this.props.mod(this.props.data.skills.psiskills.connessione_divina + this.props.data.stats.psiche)}>connessione_divina</button>
                <button name="forza" onClick={() => this.props.mod(this.props.data.stats.forza)}>forza</button>
                <button name="sopportazione_del_dolore" onClick={() => this.props.mod(this.props.data.skills.forskills.sopportazione_del_dolore + this.props.data.stats.forza)}>sopportazione_del_dolore</button>
                <button name="forza_bruta" onClick={() => this.props.mod(this.props.data.skills.forskills.forza_bruta + this.props.data.stats.forza)}>forza_bruta</button>
                <button name="elettrochimica" onClick={() => this.props.mod(this.props.data.skills.forskills.elettrochimica + this.props.data.stats.forza)}>elettrochimica</button>
                <button name="prestanza" onClick={() => this.props.mod(this.props.data.skills.forskills.prestanza + this.props.data.stats.forza)}>prestanza</button>
                <button name="istinto_animale" onClick={() => this.props.mod(this.props.data.skills.forskills.istinto_animale + this.props.data.stats.forza)}>istinto_animale</button>
                <button name="motorics" onClick={() => this.props.mod(this.props.data.stats.motorics)}>motorics</button>
                <button name="coordinazione" onClick={() => this.props.mod(this.props.data.skills.motskills.coordinazione + this.props.data.stats.motorics)}>coordinazione</button>
                <button name="percezione" onClick={() => this.props.mod(this.props.data.skills.motskills.percezione + this.props.data.stats.motorics)}>percezione</button>
                <button name="reazione" onClick={() => this.props.mod(this.props.data.skills.motskills.reazione + this.props.data.stats.motorics)}>reazione</button>
                <button name="precisione" onClick={() => this.props.mod(this.props.data.skills.motskills.precisione + this.props.data.stats.motorics)}>precisione</button>
                <button name="intuito_di_razza" onClick={() => this.props.mod(this.props.data.skills.motskills.intuito_di_razza + this.props.data.stats.motorics)}>intuito_di_razza</button>
            </div>
        )
    }
}