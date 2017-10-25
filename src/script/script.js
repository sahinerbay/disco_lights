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

    let changeColor = (numberOfCells) => {
        setInterval(() => {
            let box = getElement('box', Math.floor(Math.random() * numberOfCells));
            console.log(`children: ${numberOfCells}`);
            console.log(Math.floor(Math.random() * numberOfCells))
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

createBox(2);
dom.changeColor(container.children.length);

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







// SLIDER //
let slider = function () {

    // create slider-container-div //
    let slider = dom.createElement('div');
    dom.setClass(slider, 'settings__container__slider');
    dom.append(settings, slider);

    // create slider-title //
    let createSliderTitle = () => {
        let sliderTitle = dom.createElement('h2');
        sliderTitle.textContent = "Transition";
        dom.setClass(sliderTitle, 'settings__container__slider__title')
        dom.append(slider, sliderTitle);
    };

    // create slider-input //
    let createSliderInput = () => {
        let sliderInput = dom.createElement('input');
        let sliderAttrs = {
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
    let showValue = () => {

        let sliderInput = dom.getElement('settings__container__slider__input', 0);

        let showValue = dom.createElement('p');
        showValue.textContent = `value: ${sliderInput.value}`;


        dom.setClass(showValue, 'settings__container__slider__value');
        dom.append(slider, showValue);


        sliderInput.addEventListener('input', function () {
            showValue.textContent = `value: ${this.value}`;
            document.styleSheets[0].rules[1].style.transition = `all ${this.value / 100}s`;
        });
    }

    return {
        createSliderTitle: createSliderTitle,
        createSliderInput: createSliderInput,
        showValue: showValue
    }
}();

slider.createSliderTitle();
slider.createSliderInput();
slider.showValue();


// CREATE INPUT FOR NUMBER OF CELLS //
let numberOfCells = function () {

    // create input-cell-container-div //
    let cell = dom.createElement('div');
    dom.setClass(cell, 'settings__container__cell');
    dom.append(settings, cell);

    // create input-cell-title //
    let createCellTitle = () => {
        let cellTitle = dom.createElement('h2');
        cellTitle.textContent = "Number of Cells";
        dom.setClass(cellTitle, 'settings__container__cell__title')
        dom.append(cell, cellTitle);
    };

    // create input-cell-input //
    let createCellInput = () => {
        let cellInput = dom.createElement('input');
        let cellInputAttrs = {
            class: 'settings__container__cell__input',
            value: 50
        };
        dom.setAttributes(cellInput, cellInputAttrs);
        dom.append(cell, cellInput);
    };

    let createSubmitButton = () => {
        let cellButton = dom.createElement('input');
        let cellButtonAttrs = {
            class: 'settings__container__cell__submit',
            value: 'Set Value',
            type: 'submit'
        };
        dom.setAttributes(cellButton, cellButtonAttrs);
        dom.append(cell, cellButton);


    }

    let setNumberOfCells = () => {

        let cellInput = dom.getElement('settings__container__cell__input', 0),
            cellButton = dom.getElement('settings__container__cell__submit', 0);

        cellButton.addEventListener('click', () => {
            dom.removeAllChildren(container);
            createBox(cellInput.value);
            dom.changeColor(cellInput.value);
        });

    }



    return {
        createCellTitle: createCellTitle,
        createCellInput: createCellInput,
        createSubmitButton: createSubmitButton,
        setNumberOfCells: setNumberOfCells
    }
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