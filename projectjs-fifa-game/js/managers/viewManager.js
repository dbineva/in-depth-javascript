let matchesView = dom.get('#matches');
let matchInfoView = dom.get('#match-info');

let viewList = [matchesView, matchInfoView];

let currentView = matchesView;

function changeView(view) {
    currentView = view;

    viewList.filter(v => v !== currentView).forEach(v => v.style.display = 'none');
}