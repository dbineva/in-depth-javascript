var itemsCounter = 0;

var events = [];

var isSystemOpen = true;
// var clients = [];

/*
Event
---ID, Name, Flag - is it under 18 years old

Client
---First Name, LastName, Gender, Age
*/

function createEvent(name, flag, price) {
    if(!isSystemOpen) {
        console.log('Event can\'t be added! System is closed!');
        return;
    }

    if(!validateEventData(name, flag)) return;

    var event = {
        id: ++itemsCounter,
        name: name,
        flag: flag ? flag : true,
        dateCreated: new Date(),
        price: price ? price : 0,
        clients: []
    };
    
    events.push(event);
}

function updateEvent(id, name, flag) {
    if(!validateEventData(name, flag)) return;    

    var event = findEvent(id);

    if(!event) return;

    event.name = name;
    event.flag = arguments.length == 3 ? flag : true;

    console.log('Event with the id: ' + id + ' was changed');
}

function printAllEvents() {
    printEvents(events);
}

function printEventsForNonAdults() {
    var eventsForNonAdults = events.filter(function(el) {
        return el.flag == false;
    });

    printEvents(eventsForNonAdults);
}

function printGroupedByFlagEvents() {
    printEvents(events, '*', '#');
}

function filterEventsByNameOrFlag(filter) {
    var collection;

    if(typeof(filter) === 'string') {
        collection =  events.filter(function(el) {
            return el.name === filter;
        });
    } else if(typeof(filter) === 'boolean') {
        collection =  events.filter(function(el) {
            return el.flag === filter;
        });
    }

    printEvents(collection);
}

function deleteEvent(id) {
    var event = findEvent(id);

    if(!event) return;
    
    var indexOfFoundEvent = events.indexOf(foundEvent);
    events.splice(indexOfFoundEvent, 1);

    console.log('The event with id: ' + id + ' was deleted');
}

function addClientToAnEvent(eventId, name, gender, age) {
    if(!isSystemOpen) {
        console.log('Client can\'t be added to the event!System is closed!');
        return;
    }

    if(typeof(eventId) !== 'number' || typeof(name) !== 'string' || typeof(age) !== 'number' || (gender !== 'male' && gender !== 'female')) {
        console.log("Invalid input data!");
        return;
    }

    var event = findEvent(eventId);

    if(!event) return;

    if(age < 18 && event.flag) {
        console.log('You are not allowed to join the event!');
        return;
    }
    
    var client = {
        name: name,
        gender: gender.toLowerCase(),
        age: age
    };

    event.clients.push(client);
}

function printClientsOfAnEvent(eventId, gender) {
    var event = findEvent(eventId);

    if(!event) return;

    var clientList = event.clients;

    if(gender) {
        clientList = event.clients.filter(function(el) {
            return el.gender == gender;
        });
    }
    
    clientList.forEach(function(el) {
        console.log(el.name);
    });
}

function removeClientFromAnEvent(eventId, name) {
    var event = findEvent(eventId);

    if(!event) return;

    var client = event.clients.find(function(el) {
        return el.name === name;
    });

    var clientIndex = event.clients.indexOf(client);
    console.log(event.clients);
    
    event.clients.splice(clientIndex, 1);
    console.log(event.clients);
    
}

// --- Helper functions --- 

function validateEventData(name, flag) {
    if(typeof(name) !== 'string' || (typeof(flag) !== 'boolean' && flag)) {
        console.log('Event could not be created! Incorrect input data!');
        return false;
    }

    return true;
}

function findEvent(id) {
    var foundEvent = events.find(function(event) {
        return event.id == id;
    });

    if(!foundEvent) {
        console.log("There is no event with the id : " + id);
        return null;
    }

    return foundEvent;
}

function printEvents(collection, adultsSymbol, nonAdultsSymbol) {
    for (var index = 0; index < collection.length; index++) {
        var isForbidden = collection[index].flag ? ' : 18+' : '';

        var pattern = collection[index].name + isForbidden;
        var result = pattern;

        if(adultsSymbol && nonAdultsSymbol)
            result = isForbidden ? adultsSymbol + pattern : nonAdultsSymbol + pattern;
            
        console.log(result);
    }
}

// ---Tests---

// createEvent('Gradn opening secrets', true);
// createEvent('Ivana v haskovo');
// createEvent('Koi e po po nai', false);
// createEvent('The voice tour', false);
// addClientToAnEvent(1, 'ivan ivanov', 'male', 21);
// addClientToAnEvent(1, 'pena peneva', 'female', 33);

// printClientsOfAnEvent(1);
// removeClientFromAnEvent(1, 'ivan ivanov');
// console.log(events);
// updateEvent(1, 'otivaite v megami', false);
// console.log(events);
// printEvents();
// deleteEvent(3);
