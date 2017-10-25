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

    var changeColor = function changeColor(numberOfCells) {
        setInterval(function () {
            var box = getElement('box', Math.floor(Math.random() * numberOfCells));
            console.log('children: ' + numberOfCells);
            console.log(Math.floor(Math.random() * numberOfCells));
            setBackgroundColor(box, getRandomColor());
        }, 1000);
    };

    return {
        createElement: createElement,
        setClass: setClass,
        setAttributes: setAttributes,
        append: append,
        getElement: getElement,
        changeColor: changeColor,
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

createBox(2);
dom.changeColor(container.children.length);

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

// SLIDER //
var slider = function () {

    // create slider-container-div //
    var slider = dom.createElement('div');
    dom.setClass(slider, 'settings__container__slider');
    dom.append(settings, slider);

    // create slider-title //
    var createSliderTitle = function createSliderTitle() {
        var sliderTitle = dom.createElement('h2');
        sliderTitle.textContent = "Transition";
        dom.setClass(sliderTitle, 'settings__container__slider__title');
        dom.append(slider, sliderTitle);
    };

    // create slider-input //
    var createSliderInput = function createSliderInput() {
        var sliderInput = dom.createElement('input');
        var sliderAttrs = {
            class: 'settings__container__slider__input',
            type: 'range',
            min: 1,
            max: 100,
            value: 10
        };
        dom.setAttributes(sliderInput, sliderAttrs);
        dom.append(slider, sliderInput);
    };

    // show current value //
    var showValue = function showValue() {

        var sliderInput = dom.getElement('settings__container__slider__input', 0);

        var showValue = dom.createElement('p');
        showValue.textContent = 'value: ' + sliderInput.value;

        dom.setClass(showValue, 'settings__container__slider__value');
        dom.append(slider, showValue);

        sliderInput.addEventListener('input', function () {
            showValue.textContent = 'value: ' + this.value;
            document.styleSheets[0].rules[1].style.transition = 'all ' + this.value / 100 + 's';
        });
    };

    return {
        createSliderTitle: createSliderTitle,
        createSliderInput: createSliderInput,
        showValue: showValue
    };
}();

slider.createSliderTitle();
slider.createSliderInput();
slider.showValue();

// CREATE INPUT FOR NUMBER OF CELLS //
var numberOfCells = function () {

    // create input-cell-container-div //
    var cell = dom.createElement('div');
    dom.setClass(cell, 'settings__container__cell');
    dom.append(settings, cell);

    // create input-cell-title //
    var createCellTitle = function createCellTitle() {
        var cellTitle = dom.createElement('h2');
        cellTitle.textContent = "Number of Cells";
        dom.setClass(cellTitle, 'settings__container__cell__title');
        dom.append(cell, cellTitle);
    };

    // create input-cell-input //
    var createCellInput = function createCellInput() {
        var cellInput = dom.createElement('input');
        var cellInputAttrs = {
            class: 'settings__container__cell__input',
            value: 50
        };
        dom.setAttributes(cellInput, cellInputAttrs);
        dom.append(cell, cellInput);
    };

    var createSubmitButton = function createSubmitButton() {
        var cellButton = dom.createElement('input');
        var cellButtonAttrs = {
            class: 'settings__container__cell__submit',
            value: 'Set Value',
            type: 'submit'
        };
        dom.setAttributes(cellButton, cellButtonAttrs);
        dom.append(cell, cellButton);
    };

    var setNumberOfCells = function setNumberOfCells() {

        var cellInput = dom.getElement('settings__container__cell__input', 0),
            cellButton = dom.getElement('settings__container__cell__submit', 0);

        cellButton.addEventListener('click', function () {
            dom.removeAllChildren(container);
            createBox(cellInput.value);
            dom.changeColor(cellInput.value);
        });
    };

    return {
        createCellTitle: createCellTitle,
        createCellInput: createCellInput,
        createSubmitButton: createSubmitButton,
        setNumberOfCells: setNumberOfCells
    };
}();

numberOfCells.createCellTitle();
numberOfCells.createCellInput();
numberOfCells.createSubmitButton();
numberOfCells.setNumberOfCells();

//to do list//
// decide how many cells there will be 
// change grid gap
// change speed
// change border radius