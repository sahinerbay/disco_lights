let dom = function () {

    let createElement = (el) => document.createElement(el);

    let setClass = (el, name) => {
        el.className = name;
    };

    let setAttributes = (el, attrs) => {
        for (let key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    };

    let setBackgroundColor = (el, color) => {
        el.style.background = color;
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

    let removeAllChildren = (node) => {
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    };

    let interval;

    let changeColor = (numberOfCells, speed) => {
        interval = setInterval(() => {
            let box = getElement('box', Math.floor(Math.random() * numberOfCells));
            setBackgroundColor(box, getRandomColor());
        }, speed);
    };

    let clearInterval = () => {
        window.clearInterval(interval);
    };

    return {
        createElement: createElement,
        setClass: setClass,
        setAttributes: setAttributes,
        append: append,
        getElement: getElement,
        changeColor: changeColor,
        clearInterval: clearInterval,
        removeAllChildren: removeAllChildren
    }
}();

let container = function () {
    let container = dom.createElement('div');
    dom.setClass(container, 'container');
    dom.append(document.body, container);
    return container;
}();

let createBox = (numberOfBoxes) => {
    for (let i = 0; i < numberOfBoxes; i++) {
        let box = dom.createElement('div');
        dom.setClass(box, 'box');
        dom.append(container, box);
    }
};

let settings = function () {
    // Create Setting Div //
    let settings = dom.createElement('div');
    dom.setClass(settings, 'settings');
    dom.append(document.body, settings);

    // Create Setting Container Div //
    let settingsContainer = dom.createElement('div');
    dom.setClass(settingsContainer, 'settings__container');
    dom.append(settings, settingsContainer);

    return settingsContainer;
}();


let transition = {
    classname: 'transition',
    title: 'transition',
    attrs: {
        class: 'settings__container__transition__input',
        type: 'range',
        min: 1,
        max: 100,
        value: 1
    },
    cssStyleRule: 3
};

let cells = {
    classname: 'cells',
    title: 'number of cells',
    attrs: {
        class: 'settings__container__cells__input',
        type: 'range',
        min: 1,
        max: 150,
        value: 50
    }
};

let gap = {
    classname: 'gridGap',
    title: 'distance',
    attrs: {
        class: 'settings__container__gridGap__input',
        type: 'range',
        min: 1,
        max: 100,
        value: 1
    },
    cssStyleRule: 2
};

let radius = {
    classname: 'borderRadius',
    title: 'Radius',
    attrs: {
        class: 'settings__container__borderRadius__input',
        type: 'range',
        min: 1,
        max: 100,
        value: 10
    },
    cssStyleRule: 3
};

let speed = {
    classname: 'speed',
    title: 'Speed',
    attrs: {
        class: 'settings__container__speed__input',
        type: 'range',
        min: 1,
        max: 100,
        value: 50
    }
};


// SLIDER //
let slider = function (obj) {

    // create slider-container-div //
    let slider = dom.createElement('div');
    dom.setClass(slider, `settings__container__${obj.classname}`);
    dom.append(settings, slider);

    // create slider-title //
    let sliderTitle = dom.createElement('h2');
    sliderTitle.textContent = obj.title;
    dom.setClass(sliderTitle, `settings__container__${obj.classname}__title`);
    dom.append(slider, sliderTitle);

    // create slider-input //
    let sliderInput = dom.createElement('input');
    dom.setAttributes(sliderInput, obj.attrs);
    dom.append(slider, sliderInput);

    // show current value //
    let showValue = dom.createElement('p');
    showValue.textContent = `value: ${sliderInput.value}`;
    dom.setClass(showValue, `settings__container__${obj.classname}__value`);
    dom.append(slider, showValue);

    if (obj.classname === 'cells') {
        sliderInput.addEventListener('input', function () {
            showValue.textContent = `value: ${this.value}`;
            let sliderSpeed = dom.getElement('settings__container__speed__input', 0);
            dom.clearInterval();
            dom.removeAllChildren(container);
            createBox(this.value);
            dom.changeColor(this.value, sliderSpeed.value);
        });
    } else if (obj.classname === 'speed') {
        sliderInput.addEventListener('input', function () {
            showValue.textContent = `value: ${this.value}`;
            let sliderCells = dom.getElement('settings__container__cells__input', 0);
            dom.clearInterval();
            dom.changeColor(sliderCells.value, this.value);
        });
    } else {
        sliderInput.addEventListener('input', function () {
            showValue.textContent = `value: ${this.value}`;

            let cssValue;
            switch (obj.classname) {
                case 'transition':
                    cssValue = `all ${this.value / 100}s`;
                    break;
                case 'gridGap':
                    cssValue = `${this.value}px ${this.value}px`;
                    break;
                case 'borderRadius':
                    cssValue = `${this.value/2}%`;
                    break;
            }
            document.styleSheets[0].rules[obj.cssStyleRule].style[obj.classname] = cssValue;
        });
    }
};

let initialCells = 50,
    initialSpeed = 50;
createBox(initialCells);
dom.changeColor(container.children.length, initialSpeed);

slider(transition);
slider(cells);
slider(gap);
slider(radius);
slider(speed);