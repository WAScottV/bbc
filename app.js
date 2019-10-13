const { Client } = require('espn-fantasy-football-api/node');
const bbc = new Client({ leagueId: 181586 });
const fs = require('fs');

const seasonId = 2019;
const scoringPeriodId = 5;
const matchupPeriodId = 5;
const params = { seasonId, scoringPeriodId, matchupPeriodId }
const main = () => {
  bbc.getBoxscoreForWeek(params).then(obj => {
    const result = obj.map(game => ({
      homeId: game.homeTeamId,
      homeRoster: game.homeRoster
        .filter(rosterSpot => rosterSpot.position !== 'Bench')
        .map(rosterSpot => {
          return {
            pos: rosterSpot.position,
            name: rosterSpot.player.fullName,
            score: rosterSpot.totalPoints
          };
        })
    }));
    console.log(JSON.stringify(result, null, 2));
  })
    .catch(console.error);
}

main();