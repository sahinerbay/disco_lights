let dom = function () {
    let createElement = (el) => document.createElement(el);
    let setClass = (el, name) => {
        el.className = name;
    };

    let append = (parent, child) => {
        parent.appendChild(child);
    };

    let getElement = (classname, nth) => document.querySelectorAll(`.${classname}`)[nth];

    let getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    let setBackgroundColor = (el, color) => {
        el.style.background = color;
    };

    let changeColor = () => {
        setInterval(() => {
            let box = getElement('box', Math.floor(Math.random() * 50));
            setBackgroundColor(box, getRandomColor());
        }, 1);
    };


    return {
        createElement: createElement,
        setClass: setClass,
        append: append,
        getElement: getElement,
        changeColor: changeColor,
    }
}();

let container = dom.createElement('div');
dom.setClass(container, 'container');

dom.append(document.body, container);

let numberOfEl = 50;

for (let i = 0; i < 50; i++) {
    let box = dom.createElement('div');
    dom.setClass(box, 'box');
    dom.append(container, box);
}

dom.changeColor();