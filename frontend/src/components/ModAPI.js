import React from 'react';

export default class ModAPI extends React.Component {
    
    render() {
        return (
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
                </div>
        )
    }
}