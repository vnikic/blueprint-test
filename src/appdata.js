export class Tournament {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(index) {
        if (index >= 0 && index < this.players.length) {
            this.players.splice(index, 1);
        }
    }
}


export class Player {
    constructor(name, club, birth, ranking) {
        this.name = name;
        this.club = club;
        this.birth = birth;
        this.ranking = ranking;
    }

    update(fieldName, value) {
        if ("name" === fieldName) {
            this.name = value;
        } else if ("club" === fieldName) {
            this.club = value;
        } else if ("birth" === fieldName) {
            this.birth = value;
        } else if ("ranking" === fieldName) {
            this.ranking = value;
        }
    }
}


