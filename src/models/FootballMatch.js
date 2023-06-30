export class FootballMatch {
    constructor(id, lega, round, date, teamHome, teamAway, goalHome, goalAway, homeHT, awayHT, homeFT, awayFT, venue, status) {
        this.id = id;
        this.lega = lega;
        this.round = round;
        this.date = date;
        this.teamHome = teamHome;
        this.teamAway = teamAway;
        this.goalHome = goalHome;
        this.goalAway = goalAway;
        this.homeHT = homeHT;
        this.awayHT = awayHT;
        this.homeFT = homeFT;
        this.awayFT = awayFT;
        this.venue = venue;
        this.status = status; 
    }
}

export default FootballMatch;