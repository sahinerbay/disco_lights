'use strict';

var dom = function () {

    var createElement = function createElement(el) {
        return document.createElement(el);
    };

    var setClass = function setClass(el, name) {
        el.className = name;
    };

    var setAttributes = function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    };

    var setBackgroundColor = function setBackgroundColor(el, color) {
        el.style.background = color;
    };

    var append = function append(parent, child) {
        parent.appendChild(child);
    };

    var getElement = function getElement(classname, nth) {
        return document.querySelectorAll('.' + classname)[nth];
    };

    var getRandomColor = function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    var removeAllChildren = function removeAllChildren(node) {
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    };

    var interval = void 0;

    var changeColor = function changeColor(numberOfCells) {
        var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

        interval = setInterval(function () {
            var box = getElement('box', Math.floor(Math.random() * numberOfCells));
            setBackgroundColor(box, getRandomColor());
        }, speed);
    };

    var clearInterval = function clearInterval() {
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
    };
}();

var container = function () {
    var container = dom.createElement('div');
    dom.setClass(container, 'container');
    dom.append(document.body, container);
    return container;
}();

var createBox = function createBox(numberOfBoxes) {
    for (var i = 0; i < numberOfBoxes; i++) {
        var box = dom.createElement('div');
        dom.setClass(box, 'box');
        dom.append(container, box);
    }
};

var settings = function () {
    // Create Setting Div //
    var settings = dom.createElement('div');
    dom.setClass(settings, 'settings');
    dom.append(document.body, settings);

    // Create Setting Container Div //
    var settingsContainer = dom.createElement('div');
    dom.setClass(settingsContainer, 'settings__container');
    dom.append(settings, settingsContainer);

    return settingsContainer;
}();

var transition = {
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

var cells = {
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

var gap = {
    classname: 'gridGap',
    title: 'distance',
    attrs: {
        class: 'settings__container__gridGap__input',
        type: 'range',
        min: 1,
        max: 100,
        value: 10
    },
    cssStyleRule: 2
};

var radius = {
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

var speed = {
    classname: 'speed',
    title: 'Speed',
    attrs: {
        class: 'settings__container__speed__input',
        type: 'range',
        min: 1,
        max: 100,
        value: 10
    }
};

// SLIDER //
var slider = function slider(obj) {

    // create slider-container-div //
    var slider = dom.createElement('div');
    dom.setClass(slider, 'settings__container__' + obj.classname);
    dom.append(settings, slider);

    // create slider-title //
    var sliderTitle = dom.createElement('h2');
    sliderTitle.textContent = obj.title;
    dom.setClass(sliderTitle, 'settings__container__' + obj.classname + '__title');
    dom.append(slider, sliderTitle);

    // create slider-input //
    var sliderInput = dom.createElement('input');
    dom.setAttributes(sliderInput, obj.attrs);
    dom.append(slider, sliderInput);

    // show current value //
    var showValue = dom.createElement('p');
    showValue.textContent = 'value: ' + sliderInput.value;
    dom.setClass(showValue, 'settings__container__' + obj.classname + '__value');
    dom.append(slider, showValue);

    if (obj.classname === 'cells') {
        sliderInput.addEventListener('input', function () {

            var sliderSpeed = dom.getElement('settings__container__speed__input', 0);
            dom.clearInterval();
            dom.removeAllChildren(container);
            createBox(this.value);
            dom.changeColor(this.value, sliderSpeed.value);
        });
    } else if (obj.classname === 'speed') {
        sliderInput.addEventListener('input', function () {
            var sliderCells = dom.getElement('settings__container__cells__input', 0);
            console.log(sliderCells.value);
            dom.clearInterval();
            dom.changeColor(sliderCells.value, this.value);
        });
    } else {
        sliderInput.addEventListener('input', function () {
            showValue.textContent = 'value: ' + this.value;

            var cssValue = void 0;
            switch (obj.classname) {
                case 'transition':
                    cssValue = 'all ' + this.value / 100 + 's';
                    break;
                case 'gridGap':
                    cssValue = this.value + 'px ' + this.value + 'px';
                    break;
                case 'borderRadius':
                    cssValue = this.value + '%';
                    break;
            }
            document.styleSheets[0].rules[obj.cssStyleRule].style[obj.classname] = cssValue;
        });
    }
};

var initialCells = 50;
createBox(initialCells);
dom.changeColor(container.children.length, initialCells);

slider(transition);
slider(cells);
slider(gap);
slider(radius);
slider(speed);