'use strict';

var dom = function () {
    var createElement = function createElement(el) {
        return document.createElement(el);
    };
    var setClass = function setClass(el, name) {
        el.className = name;
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

    var setBackgroundColor = function setBackgroundColor(el, color) {
        el.style.background = color;
    };

    var changeColor = function changeColor() {
        setInterval(function () {
            var box = getElement('box', Math.floor(Math.random() * 50));
            setBackgroundColor(box, getRandomColor());
        }, 1);
    };

    return {
        createElement: createElement,
        setClass: setClass,
        append: append,
        getElement: getElement,
        changeColor: changeColor
    };
}();

var container = dom.createElement('div');
dom.setClass(container, 'container');

dom.append(document.body, container);

var numberOfEl = 50;

for (var i = 0; i < 50; i++) {
    var box = dom.createElement('div');
    dom.setClass(box, 'box');
    dom.append(container, box);
}

dom.changeColor();