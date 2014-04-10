$(document).ready(function () {
    'use strict';

    //var t0 = performance.now();
    var mTools = this.Tools,
        Slider,
        Slider2;

    Slider = mTools.createInstance('Slider');
    Slider2 = mTools.createInstance('Slider', {
        addr: {
            home: 34
        }
    });

    Slider.set('name', 'Karol');
    Slider.set('addr.a.d.s', '1');

    Slider2.set('name', 'Piotr');
    Slider2.set('addr.street', 'krotka');
    console.log(Slider);
    console.log(Slider2);
    jK.fireEvent('elements.add');

    var mSlider = mTools.createInstance('MiniSlider');
    mSlider.set('name', 'Aleksander');
    mSlider.set('surname', 'Oleksy');
    console.log(mSlider);

    //var t1 = performance.now();
    //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
}.bind(jK));

// TODO: getters
// TODO: fireEvent on Class