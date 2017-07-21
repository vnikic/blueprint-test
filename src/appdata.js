export class TournamentStageInfo {
    static INFO = new TournamentStageInfo("Turnir info");
    static PLAYERS = new TournamentStageInfo("Igrači");
    static GROUPS_DRAW = new TournamentStageInfo("Žreb grupa");
    static GROUPS_RESULTS = new TournamentStageInfo("Rezultati grupa");
    static GOLD_DRAW = new TournamentStageInfo("Glavni - žreb");
    static SILVER_DRAW = new TournamentStageInfo("Utešni - žreb");
    static GOLD_RESULTS = new TournamentStageInfo("Glavni - rezultat");
    static SILVER_RESULTS = new TournamentStageInfo("Utešni - rezultati");

    constructor(name) {
        this.name = name;
    }
}

export class TournamentStage {
    constructor(stageInfo) {
        this.stageInfo = stageInfo;
        this.enabled = false;
    }
}


export class Tournament {
    constructor() {
        this.players = [];
        this.stages = [
            new TournamentStage(TournamentStageInfo.INFO),
            new TournamentStage(TournamentStageInfo.PLAYERS),
            new TournamentStage(TournamentStageInfo.GROUPS_DRAW),
            new TournamentStage(TournamentStageInfo.GROUPS_RESULTS),
            new TournamentStage(TournamentStageInfo.GOLD_DRAW),
            new TournamentStage(TournamentStageInfo.SILVER_DRAW),
            new TournamentStage(TournamentStageInfo.GOLD_RESULTS),
            new TournamentStage(TournamentStageInfo.SILVER_RESULTS),
        ];
        this.activeStage = this.stages[0];
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


