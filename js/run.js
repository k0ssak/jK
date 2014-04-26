$(document).ready(function () {
    'use strict';

    //var t0 = performance.now();
    var mTools = this._Tools,
        Slider,
        Slider2;

    Slider = mTools.createInstance('Slider');
    Slider2 = mTools.createInstance('Slider', {
        addr: {
            home: 34
        }
    });

    //Slider.set('1.2.3', 'moj dom');
    /*Slider.set('name', 'Karol');
    console.log(Slider);
    console.log(Slider.get('1.2.3'));
    Slider.fireEvent('elements.add', ['argument1', 'argument2']);

    Slider2.set('name', 'Piotr');
    Slider2.set('addr.street', 'krotka');
    console.log(Slider);
    console.log(Slider2);
    jK.fireEvent('elements.add', ['argument2', 'argument3']);

    var mSlider = mTools.createInstance('MiniSlider');
    mSlider.set('name', 'Aleksander');
    mSlider.set('surname', 'Oleksy');
    console.log(mSlider);*/

    //var t1 = performance.now();
    //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
}.bind(jK));