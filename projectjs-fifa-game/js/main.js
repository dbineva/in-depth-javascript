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
            changeView(matchInfoView);
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
    
    fillMatchInfoHeadings(currentMatch);

    let table = dom.get('#match-info table');
    initializeMatchInfoTable(table);

    let homeTeamStats = currentMatch.home_team_statistics;
    let awayTeamStats = currentMatch.away_team_statistics;
    fillMatchInfoTable(homeTeamStats, awayTeamStats, table);
}

function fillMatchInfoHeadings(currentMatch) {
    dom.setText('#home-team-heading', currentMatch.home_team.country);
    
    let result = currentMatch.home_team.goals + ' - ' + currentMatch.home_team.goals;
    dom.setText('#result-heading', result);

    dom.setText('#away-team-heading', currentMatch.away_team.country);
    dom.setText('#venue', currentMatch.venue);
}

function fillMatchInfoTable(homeTeamStats, awayTeamStats, table) {
    for (const key in homeTeamStats) {
        if (!Array.isArray(homeTeamStats[key]) && key !== 'country') {
            let currentRow = dom.create('tr');
            let homeTeamStat = dom.create('td', homeTeamStats[key]);

            let stat = dom.create('td', beautifyKey(key));
            stat.className = 'text-center';

            let awayTeamStat = dom.create('td', awayTeamStats[key]);
            awayTeamStat.className = 'text-right';

            dom.append(currentRow, [homeTeamStat, stat, awayTeamStat]);
            dom.append(table, currentRow);
        }
    }
}

function initializeMatchInfoTable(table) {
    let headingRow = 
        `<thead>` +
            `<tr>` +
                `<th class="text-center" colspan="3">Team Stats</th>` +
            `</tr>` +
        `</thead>`;
    table.innerHTML = headingRow;
}

function beautifyKey(key) {
    key = key.replace(/\_/g, ' ');
    key = key[0].toUpperCase() + key.substr(1);

    return key;
}