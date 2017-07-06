import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Navbar, EditableText } from "@blueprintjs/core";
import './../node_modules/normalize.css/normalize.css';
import './../node_modules/@blueprintjs/core/dist/blueprint.css';


class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <NavBar/>
                </div>
                <div>
                    <h2>Списак играча</h2>
                    <PlayerTable/>
                </div>
            </div>
        );
    }
}


class NavBar extends React.Component {
    render() {
        return (
            <nav className="pt-navbar .pt-dark">
                <div className="pt-navbar-group pt-align-left">
                    <div className="pt-navbar-heading">Тениски турнири</div>
                    <input className="pt-input" placeholder="Search files..." type="text" />
                </div>
                <div className="pt-navbar-group pt-align-right">
                    <button className="pt-button pt-minimal pt-icon-home">Home</button>
                    <button className="pt-button pt-minimal pt-icon-document">Files</button>
                    <span className="pt-navbar-divider"></span>
                    <button className="pt-button pt-minimal pt-icon-user"></button>
                    <button className="pt-button pt-minimal pt-icon-notifications"></button>
                    <button className="pt-button pt-minimal pt-icon-cog"></button>
                </div>
            </nav>
        );
    }
}

class PlayerRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.num}</td>
                <td><EditableText defaultValue={this.props.name} placeholder="Унеси име" onConfirm={s=>this.props.updatePlayer(this.props.num, "name", s)}/></td>
                <td>{this.props.club}</td>
                <td>{this.props.birth}</td>
                <td>{this.props.ranking}</td>
            </tr>
        );
    }
}

class PlayerTable extends React.Component {
    constructor() {
        super();
        this.state = {
            players: [
                {name:"Милован Дрецун", club: "SLI", birth: "9.7.2007", ranking: 1},
                {name:"Божа звани Пуб", club: "TIP", birth: "11.1.2007", ranking: 3},
                {name:"Милић од Мачве", club: "PUM", birth: "23.6.2007", ranking: 1},
                {name:"Дане Корица", club: "REK", birth: "16.10.2007", ranking: 2},
                {name:"Ник Ћулибрк", club: "ADV", birth: "25.4.2007", ranking: 4},
            ]
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
                    </tr>
                </thead>
                <tbody>
                    {this.renderPlayers()}
                </tbody>
            </table>
        );
    }

    updatePlayer = (num, field, value) => {
        let p = this.state.players.slice();
        if (num <= p.length) {
            p[num - 1][field] = value;
        } else if (value && value !== "") {
            let pr = {};
            pr[field] = value;
            p.push(pr);
        }
        this.setState({players: p});
    };

    renderPlayers() {
        let rows = [];
        let num = 0;
        for (let player of this.state.players) {
            let p = <PlayerRow num={++num} name={player.name} club={player.club} birth={player.birth} ranking={player.ranking}  updatePlayer={this.updatePlayer}/>
            rows.push(p);
        }

        // one more empty row for adding new players
        rows.push(<PlayerRow num={++num} name="" club="" birth="" ranking="" updatePlayer={this.updatePlayer}/>);

        return rows;
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));
