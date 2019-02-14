function DOMLib() {
    //Inner collection for managing the selected html elements
    var elements = [];

    //Get html elements by selector
    this.get = function (selector) {
        if (typeof (selector) !== 'string') {
            console.log('The given selector should be of type \'string\'');
            elements = [];
            return;
        }

        var resultElements = Array.from(document.querySelectorAll(selector));

        if (resultElements.length === 0) {
            alert('There is no element in the DOM with the given selector.');
            elements = [];
            return;
        } else {
            elements = resultElements;
        }

        return this;
    }

    //Get specific html element (does not support method chaining)
    this.getSpecific = function(selector) {
        if (typeof (selector) !== 'string') {
            console.log('The given selector should be of type \'string\'');
            return;
        }

        return document.querySelector(selector);
    }

    //Create and append an element to the collection of elements
    this.append = function (selector, textValue) {
        var newElements = [];

        elements.forEach(function (element) {
            var newElement = document.createElement(selector);

            newElement.textContent = textValue;

            element.appendChild(newElement);

            newElements.push(newElement);
        });

        elements = newElements.slice(0);

        return this;
    }

    //Delete selected elements
    this.delete = function () {
        elements.forEach(function (element) {
            element.remove();
        });
    }

    //Made possible to change every attribute not only the id, class, data and name, so that I can change for example the value as I did in the populateMonthsList function in the calendar.js file
    this.attr = function (attribute, value) {
        //var attributesAllowed = ['id', 'class', 'data', 'name'];
        if (!attribute || value == null || value == undefined ||
            typeof (attribute) !== 'string') {
            console.log('Invalid input data!');
            return;
        }

        elements.forEach(function (element) {
            element.setAttribute(attribute, value);
        });

        return this;
    }

    //Alter the inner text of the elements
    this.text = function (content) {
        elements.forEach(function (el) {
            el.innerText = content;
        });

        return this;
    }

    //Alter the inner html of the elements
    this.html = function (content) {
        if (typeof (content) !== 'string') {
            console.log('Enter a valid html content.');
            return;
        }

        elements.forEach(function (el) {
            el.innerHTML = content;
        });

        return this;
    }

    //Alter the css of the elements
    this.css = function () {
        if (arguments.length < 1 || arguments.length > 2) {
            console.log('Enter a valid css.');
            return;
        }

        var cssString, cssObject, property, value;

        if (arguments.length === 1) {
            var data = arguments[0];

            if (typeof (data) === 'string') {
                // this.style = data;
                cssString = data;
            } else {
                // Object.assign(this.style, data);
                cssObject = data;
            }
        } else if (arguments.length === 2) {
            property = arguments[0];
            value = arguments[1];

            if (typeof (property) !== 'string' || typeof (value) !== 'string') {
                console.log('Invalid input data!');
                return;
            }

            // this.style[property] = value;
        }

        elements.forEach(function (element) {
            if (cssString) {
                element.style = cssString;
            } else if (cssObject) {
                Object.assign(element.style, data);
            } else {
                element.style[property] = value;
            }
        });

        return this;
    }

    //Get the parents elements of the elements
    this.parent = function () {
        var parents = [];

        elements.forEach(function (element) {
            parents.push(element.parentElement);
        });

        elements = parents.slice(0);

        return this;
    }

    //Get the children elements of the elements
    this.children = function () {
        var children = [];

        elements.forEach(function (element) {
            var currentChildren = Array.from(element.children);
            currentChildren.forEach(function (child) {
                children.push(child);
            })
        });

        elements = children.slice(0);

        return this;
    }

    //Get the next sibling elements of the elements
    this.nextSibling = function () {
        var nextSiblings = [];

        elements.forEach(function (element) {
            nextSiblings.push(element.nextElementSibling);
        });

        elements = nextSiblings.slice(0);

        return this;
    }

    //Get the previous sibling elements of the elements
    this.previousSibling = function () {
        var previousSiblings = [];

        elements.forEach(function (element) {
            previousSiblings.push(element.previousElementSibling);
        });

        elements = previousSiblings.slice(0);

        return this;
    }

    //Attach an event for all elements
    this.on = function (eventType, callback) {
        if (!eventType || !callback || typeof (callback) !== 'function') {
            console.log('Invalid input data!');
            return;
        }

        eventType = eventType.startsWith('on') ?
            eventType.substring(2) :
            eventType;

        elements.forEach(function (element) {
            element.addEventListener(eventType, callback);
        });
    }
}