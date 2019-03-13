window.addEventListener('load', (data) => Ajax.get(matchesURL, loadMatches));
let matches;

function loadMatches(data) {
    matches = data;
   

    let tableBody = dom.get('#matches-table tbody');

    for (let i = 0; i < data.length; i++) {
        let currentRow = dom.create('tr');
        currentRow.setAttribute('data-fifa-id', data[i].fifa_id);
        

        let venue = dom.create('td', data[i].venue);
        let homeTeam = dom.create('td', data[i].home_team.country);

        let resultStr = data[i].home_team.goals + ' : ' + data[i].home_team.goals;
        let result = dom.create('td', resultStr);

        let awayTeam = dom.create('td',data[i].away_team.country);

        dom.append(currentRow, [venue, homeTeam, result, awayTeam]);

        dom.append(tableBody, currentRow);
    }
}

