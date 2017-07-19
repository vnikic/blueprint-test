import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Button, Navbar, EditableText, NumericInput } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import './../node_modules/normalize.css/normalize.css';
import './../node_modules/@blueprintjs/core/dist/blueprint.css';
import './../node_modules/@blueprintjs/datetime/dist/blueprint-datetime.css';

import * as AppData from './appdata.js';


let tournamentInfo = new AppData.Tournament();

// test data
tournamentInfo.addPlayer(new AppData.Player("Momcilo Bajagic", "ECE", null, 1));
tournamentInfo.addPlayer(new AppData.Player("Somilo", "ICE", null, 2));
tournamentInfo.addPlayer(new AppData.Player("Oblak u pantalonama", "REK", null, 2));


class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <NavBar/>
                </div>
                <br/>
                <div>
                    <ul className="pt-breadcrumbs">
                        <li><button type="button" className="pt-button">Tournament Info</button></li>
                        <li><button type="button" className="pt-button pt-intent-primary">Define Players</button></li>
                        <li><button type="button" className="pt-button">Groups Draw</button></li>
                        <li><button type="button" className="pt-button">Groups Results</button></li>
                        <li><button type="button" className="pt-button pt-disabled">Gold Draw</button></li>
                        <li><button type="button" className="pt-button pt-disabled">Silver Draw</button></li>
                    </ul>
                </div>
                <br/>
                <br/>
                <div>
                    {/*<h2>Списак играча</h2>*/}
                    <PlayerTable/>
                </div>
            </div>
        );
    }
}


class NavBar extends React.Component {
    render() {
        return (
            <nav className="pt-navbar pt-dark">
                <div className="pt-navbar-group pt-align-left">
                    <button className="pt-button pt-minimal pt-icon-home">Home</button>
                    <button className="pt-button pt-minimal pt-icon-document">Files</button>
                </div>
                <div className="pt-navbar-group pt-align-right">
                    <button className="pt-button pt-minimal pt-icon-user"></button>
                    <button className="pt-button pt-minimal pt-icon-notifications"></button>
                    <button className="pt-button pt-minimal pt-icon-cog"></button>
                </div>
            </nav>
        );
    }
}

class PlayerRow extends React.Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateClub = this.updateClub.bind(this);
    }

    renderDeleteButton(deletePlayerFunc, num) {
        if (deletePlayerFunc) {
            return <Button type="button" className="pt-button pt-icon-delete pt-intent-danger" onClick={()=>deletePlayerFunc(num)}/>
        } else {
            return "";
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.num}</td>
                <td>
                    {/*<EditableText selectAllOnFocus="true" value={this.props.name} placeholder="Унеси име" onConfirm={this.updateName} onChange={this.updateName} onpaste={()=>alert("PASTE!")}/>*/}
                    <input className="pt-input" type="text" placeholder="Prezime i ime igrača" dir="auto" value={this.props.name} onChange={() => this.updateName(this.value)} onPaste={(e)=>{this.updateName(e.clipboardData.getData("text/plain")); return false;}}/>
                </td>
                <td>
                    {/*<EditableText selectAllOnFocus="true" value={this.props.club} placeholder="Клуб" onConfirm={this.updateClub} onChange={this.updateClub}/>*/}
                    <input className="pt-input" type="text" placeholder="Klub" dir="auto" value={this.props.club} onChange={() => this.updateClub(this.value)} onPaste={()=>alert("PASTE!")}/>
                </td>
                <td><DateInput format="DD.MM.YYYY" value={this.props.birth} onChange={d=>this.props.updatePlayer(this.props.num, "birth", d)}/></td>
                <td><NumericInput min="-10" max="10000" selectAllOnFocus="true" selectAllOnIncrement="true" format="DD.MM.YYYY" value={this.props.ranking} onValueChange={v=>this.props.updatePlayer(this.props.num, "ranking", v)}/></td>
                <td>{this.renderDeleteButton(this.props.deletePlayer, this.props.num)}</td>
            </tr>
        );
    }

    update(value, field) {
        this.props.updatePlayer(this.props.num, field, value);
    }

    updateName(value) {
        this.update(value, "name");
    }

    updateClub(value) {
        this.update(value, "club");
    }
}


class PlayerTable extends React.Component {
    constructor() {
        super();
        this.state = {
            players: tournamentInfo.players
        };
    }

    render() {
        return (
            <table className="pt-table pt-condensed pt-bordered pt-interactive">
                <thead>
                    <tr>
                        <th>Бр.</th>
                        <th>Име</th>
                        <th>Клуб</th>
                        <th>Датум рођења</th>
                        <th>Ранг</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderPlayers()}
                </tbody>
            </table>
        );
    }

    updatePlayer = (num, field, value) => {
        // first check if this is multiple players copy/paste
        if (value && value.length > 20) {
            let playerTokens = value.split("\n");
            for (let i = 0, len = playerTokens.length; i < len; i++) {
                if (playerTokens[i]) {
                    let fields = playerTokens[i].split("\t");
                    // todo: should try to recognize fields by values
                    if (fields.length > 0) {
                        let player = new AppData.Player(fields[0], fields[1]);
                        player.update(field, value);
                        tournamentInfo.addPlayer(player);
                    }
                }
            }
            return;
        }


        let p = tournamentInfo.players;
        if (num <= p.length) {
            let player = p[num - 1];
            player.update(field, value);
        } else if (value && value !== "") {
            let player = new AppData.Player();
            player.update(field, value);
            tournamentInfo.addPlayer(player);
        }
        this.setState({players: p});
    };

    deletePlayer = (num) => {
        if (num >= 1 && num <= tournamentInfo.players.length) {
            tournamentInfo.removePlayer(num - 1);
            this.setState({players: tournamentInfo.players});
        }
    };

    renderPlayers() {
        let rows = [];
        let num = 0;
        for (let player of this.state.players) {
            let p = <PlayerRow num={++num} name={player.name} club={player.club} birth={player.birth} ranking={player.ranking} updatePlayer={this.updatePlayer} deletePlayer={this.deletePlayer} />
            rows.push(p);
        }

        // one more empty row for adding new players
        rows.push(<PlayerRow num={++num} name="" club="" birth="" ranking="" updatePlayer={this.updatePlayer}/>);

        return rows;
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));
