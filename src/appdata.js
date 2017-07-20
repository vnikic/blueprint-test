export class TournamentStage {
    static INFO = new TournamentStage("Turnir info");
    static PLAYERS = new TournamentStage("Igrači");
    static GROUPS_DRAW = new TournamentStage("Žreb grupa");
    static GROUPS_RESULTS = new TournamentStage("Rezultati grupa");
    static GOLD_DRAW = new TournamentStage("Glavni - žreb");
    static SILVER_DRAW = new TournamentStage("Utešni - žreb");
    static GOLD_RESULTS = new TournamentStage("Glavni - rezultat");
    static SILVER_RESULTS = new TournamentStage("Utešni - rezultati");

    constructor(name) {
        this.name = name;
        this.enabled = false;
    }
}


export class Tournament {
    constructor() {
        this.players = [];
        this.stages = [
            TournamentStage.INFO,
            TournamentStage.PLAYERS,
            TournamentStage.GROUPS_DRAW,
            TournamentStage.GROUPS_RESULTS,
            TournamentStage.GOLD_DRAW,
            TournamentStage.SILVER_DRAW,
            TournamentStage.GOLD_RESULTS,
            TournamentStage.SILVER_RESULTS,
        ];
        this.activeStage = TournamentStage.INFO;
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


