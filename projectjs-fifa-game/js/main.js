window.addEventListener('load', (data) => Ajax.get(matchesURL, loadMatches));
let matches;



function loadMatches(data) {
    matches = data;
    // console.log(data);

    let tableBody = dom.get('#matches-table tbody');

    for (let i = 0; i < data.length; i++) {
        let currentRow = dom.create('tr');
        currentRow.setAttribute('data-fifa-id', data[i].fifa_id);

        currentRow.addEventListener('click', () => {
            let fifaId = currentRow.getAttribute('data-fifa-id');
            loadMatchInfo(fifaId);
        });

        let venue = dom.create('td', data[i].venue);
        let homeTeam = dom.create('td', data[i].home_team.country);

        let resultStr = data[i].home_team.goals + ' - ' + data[i].home_team.goals;
        let result = dom.create('td', resultStr);

        let awayTeam = dom.create('td', data[i].away_team.country);

        dom.append(currentRow, [venue, homeTeam, result, awayTeam]);

        dom.append(tableBody, currentRow);
    }
}

function loadMatchInfo(fifaId) {
    let currentMatch = matches.find((el) => el.fifa_id === fifaId);

    $('#home-team-heading').text(currentMatch.home_team.country);
    let result = currentMatch.home_team.goals + ' - ' + currentMatch.home_team.goals;
    $('#result-heading').text(result);
    $('#away-team-heading').text(currentMatch.away_team.country);

    let tableBody = dom.get('#match-info tbody');
    initializeMatchInfoTable(tableBody);
    let homeTeamStats = currentMatch.home_team_statistics;
    let awayTeamStats = currentMatch.away_team_statistics;

    for (const key in homeTeamStats) {
        if (!Array.isArray(homeTeamStats[key])) {
            let currentRow = dom.create('tr');
            let homeTeamStat = dom.create('td', homeTeamStats[key]);

            let stat = dom.create('td', beautifyKey(key));
            let awayTeamStat = dom.create('td', awayTeamStats[key]);

            dom.append(currentRow, [homeTeamStat, stat, awayTeamStat]);
            dom.append(tableBody, currentRow);
        }
    }


}

function initializeMatchInfoTable(tableBody) {
    let headingRow = 
        `<tr>` +
            `<th class="text-center" colspan="3">Team Stats</th>` +
        `</tr>`;
    tableBody.innerHTML = headingRow;
}

function beautifyKey(key) {
    key = key.replace(/\_/g, ' ');
    return key;
}