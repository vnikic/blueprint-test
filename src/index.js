import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Navbar, EditableText, NumericInput } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import './../node_modules/normalize.css/normalize.css';
import './../node_modules/@blueprintjs/core/dist/blueprint.css';
import './../node_modules/@blueprintjs/datetime/dist/blueprint-datetime.css';



class Tournament {
    constructor() {
        this.players = [];
    }

    sayName() {
    }

    sayHistory() {
    }
}


let tournamentInfo = new Tournament();

// let appStore = {
//     players: [
//         {name:"Милован Дрецун", club: "SLI", birth: null, ranking: 1},
//         {name:"Божа звани Пуб", club: "TIP", birth: null, ranking: 3},
//         {name:"Милић од Мачве", club: "PUM", birth: null, ranking: 1},
//         {name:"Дане Корица", club: "REK", birth: null, ranking: 2},
//         {name:"Ник Ћулибрк", club: "ADV", birth: null, ranking: 4},
//     ]
// };


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
    render() {
        return (
            <tr>
                <td>{this.props.num}</td>
                <td><EditableText selectAllOnFocus="true" defaultValue={this.props.name} placeholder="Унеси име" onConfirm={s=>this.props.updatePlayer(this.props.num, "name", s)}/></td>
                <td><EditableText selectAllOnFocus="true" defaultValue={this.props.club} placeholder="Клуб" onConfirm={s=>this.props.updatePlayer(this.props.num, "club", s)}/></td>
                <td><DateInput format="DD.MM.YYYY" value={this.props.birth} onChange={d=>this.props.updatePlayer(this.props.num, "birth", d)}/></td>
                <td><NumericInput min="-10" max="10000" selectAllOnFocus="true" selectAllOnIncrement="true" format="DD.MM.YYYY" value={this.props.ranking} onValueChange={v=>this.props.updatePlayer(this.props.num, "ranking", v)}/></td>
            </tr>
        );
    }
}

class PlayerTable extends React.Component {
    constructor() {
        super();
        this.state = tournamentInfo;
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
