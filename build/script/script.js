'use strict';

var dom = function () {

    var createElement = function createElement(el) {
        return document.createElement(el);
    };

    var setClass = function setClass(el, name) {
        return el.className = name;
    };

    var toggleClassName = function toggleClassName(el, name) {
        return el.classList.toggle(name);
    };

    var setAttributes = function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    };

    var setBackgroundColor = function setBackgroundColor(el, color) {
        return el.style.background = color;
    };

    var append = function append(parent, child) {
        return parent.appendChild(child);
    };

    var getElement = function getElement(classname, nth) {
        return document.querySelectorAll('.' + classname)[nth];
    };

    var getRandomColor = function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        var i = 0;
        while (i < 6) {
            color += letters[Math.floor(Math.random() * 16)];
            i++;
        }
        return color;
    };

    var removeAllChildren = function removeAllChildren(node) {
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
    };

    var interval = void 0;

    var changeColor = function changeColor(numberOfCells, speed) {
        interval = setInterval(function () {
            var box = getElement('box', Math.floor(Math.random() * numberOfCells));
            setBackgroundColor(box, getRandomColor());
        }, speed);
    };

    var clearInterval = function clearInterval() {
        return window.clearInterval(interval);
    };

    return {
        createElement: createElement,
        setClass: setClass,
        toggleClassName: toggleClassName,
        setAttributes: setAttributes,
        append: append,
        getElement: getElement,
        changeColor: changeColor,
        clearInterval: clearInterval,
        removeAllChildren: removeAllChildren
    };
}();

var create = function () {

    var container = function container() {
        var container = dom.createElement('div');
        dom.setClass(container, 'container');
        dom.append(document.body, container);
    };

    var cells = function cells(numberOfBoxes) {
        var container = dom.getElement('container', 0);
        var i = 0;
        while (i < numberOfBoxes) {
            var box = dom.createElement('div');
            dom.setClass(box, 'box');
            dom.append(container, box);
            i++;
        }
    };

    var settingsBar = function settingsBar() {
        // Create Setting Div //
        var settings = dom.createElement('div');
        dom.setClass(settings, 'settings');
        dom.append(document.body, settings);

        // Create Setting Container Div //
        var settingsContainer = dom.createElement('div');
        dom.setClass(settingsContainer, 'settings__container');
        dom.append(settings, settingsContainer);
    };

    var slider = function slider(obj) {

        // create slider-container-div //
        var slider = dom.createElement('div'),
            settings = dom.getElement('settings__container', 0),
            container = dom.getElement('container', 0);

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
                showValue.textContent = 'value: ' + this.value;
                var sliderSpeed = dom.getElement('settings__container__speed__input', 0);
                dom.clearInterval();
                dom.removeAllChildren(container);
                create.cells(this.value);
                dom.changeColor(this.value, sliderSpeed.value);
            });
        } else if (obj.classname === 'speed') {
            sliderInput.addEventListener('input', function () {
                showValue.textContent = 'value: ' + this.value;
                var sliderCells = dom.getElement('settings__container__cells__input', 0);
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
                        cssValue = this.value / 2 + '%';
                        break;
                }
                document.styleSheets[0].rules[obj.cssStyleRule].style[obj.classname] = cssValue;
            });
        }
    };

    var addShowButton = function addShowButton() {
        var btnContainer = dom.createElement('div'),
            showBtn = dom.createElement('span');

        dom.setClass(showBtn, 'btn-show');
        dom.setClass(btnContainer, 'settings settings-show');

        var txtNode = document.createTextNode('show settings');

        dom.append(showBtn, txtNode);
        dom.append(btnContainer, showBtn);
        dom.append(document.body, btnContainer);

        var settings = dom.getElement('settings', 0);
        settings.classList.add('settings-hidden');

        showBtn.addEventListener('click', function () {
            var content = showBtn.textContent;
            showBtn.textContent = (content.search(/show/i) === -1 ? 'show' : 'hide') + ' settings';
            dom.toggleClassName(settings, 'settings-hidden');
            dom.toggleClassName(btnContainer, 'btnContainer-hidden');
        });
    };

    var allSliders = function allSliders(obj) {
        for (var property in obj) {
            slider(obj[property]);
        }
        showColor();
    };

    var showColor = function showColor() {
        var container = dom.getElement('container', 0);
        container.addEventListener('click', function (e) {
            console.log(e.target.style.backgroundColor);
        });
    };

    return {
        container: container,
        cells: cells,
        settingsBar: settingsBar,
        allSliders: allSliders,
        addShowButton: addShowButton
    };
}();

var settings = {
    transition: {
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
    },
    cells: {
        classname: 'cells',
        title: 'number of cells',
        attrs: {
            class: 'settings__container__cells__input',
            type: 'range',
            min: 1,
            max: 150,
            value: 50
        }
    },
    gap: {
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
    },
    radius: {
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
    },
    speed: {
        classname: 'speed',
        title: 'Speed',
        attrs: {
            class: 'settings__container__speed__input',
            type: 'range',
            min: 1,
            max: 100,
            value: 50
        }
    }
};

var initialCells = 50,
    initialSpeed = 50;

create.container();
create.cells(initialCells);
create.settingsBar();

dom.changeColor(initialCells, initialSpeed);

create.allSliders(settings);
create.addShowButton();