let dom = {
    create(selector, text) {
        let el = document.createElement(selector);
        if (text !== null && text !== '') el.textContent = text;

        return el;
    },

    get(selector) {
        let el = document.querySelector(selector);

        return el;
    },

    append(parent, data) {
        if (Array.isArray(data)) {
            for (const element of data) {
                parent.appendChild(element);
            }
        } 
        else {
            parent.appendChild(data);
        }
    },

    setText(selector, text) {
        let el = document.querySelector(selector);
        el.textContent = text;

        return el;
    }
}