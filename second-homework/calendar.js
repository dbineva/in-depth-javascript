var lib = new DOMLib();
var selectedDate = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];


//Adding the event handlers
lib.get('#selected-month').on('change', selectNewMonth);
lib.get('#previous-month-button').on('click', getPreviousMonth);
lib.get('#next-month-button').on('click', getNextMonth);
lib.get('#previous-year-button').on('click', getPreviousYear);
lib.get('#next-year-button').on('click', getNextYear);

//Main functions for drawing the calendar and displaying its information
function drawCalendar() {
    drawHeader();
    drawBody();
    populateMonthsList();
}

function drawHeader() {
    var selectedMonth = getMonth();
    var selectedYear = selectedDate.getFullYear();

    lib.get('#current-month').text(selectedMonth);
    lib.get('#current-year').text(selectedYear);
}

function drawBody() {
    lib.get('#calendar-body').html('');

    var numberOfDays = getNumberOfDaysInSelectedMonth();

    var attribute = 'class';
    var attributeValue = 'day-of-month';

    var currentDate = new Date();

    for (let index = 1; index <= numberOfDays; index++) {
        if (index === currentDate.getDate() &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() == currentDate.getFullYear())
            attributeValue += ' current-date';
        else
            attributeValue = 'day-of-month';

        lib.get('#calendar-body').append('div', index).attr(attribute, attributeValue);
    }
}

function populateMonthsList() {
    if (lib.getSpecific('#selected-month').innerHTML === '') {
        for (let index = 0; index < months.length; index++) {
            lib.get('#selected-month').append('option', months[index]).attr('value', index);
        }
    }

    setSelectedMonth();
}

function selectNewMonth() {
    var newMonth = lib.getSpecific('#selected-month');
    var newMonthIndex = newMonth[newMonth.selectedIndex].value;

    selectedDate.setMonth(newMonthIndex);
    drawCalendar();
}

function getNextMonth() {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    drawCalendar();
}

function getPreviousMonth() {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    drawCalendar();
}

function getNextYear() {
    selectedDate.setFullYear(selectedDate.getFullYear() + 1);
    drawCalendar();
}

function getPreviousYear() {
    selectedDate.setFullYear(selectedDate.getFullYear() - 1);
    drawCalendar();
}

function setSelectedMonth() {
    var selectedMonth = lib.getSpecific('#selected-month');
    selectedMonth.selectedIndex = selectedDate.getMonth();
}

//Helper functions

function getMonth() {
    var monthIndex = selectedDate.getMonth();

    return months[monthIndex];
}

function getNumberOfDaysInSelectedMonth() {
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
}