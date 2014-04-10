$(document).ready(function () {
    'use strict';

    //var t0 = performance.now();
    var mTools = this.Tools,
        Slider,
        Slider2;

    Slider = mTools.createInstance('Slider', {
        name: 'Jan'
    });

    Slider2 = mTools.createInstance('Slider');

    Slider.set('name', 'Karol');
    console.log(Slider);
    console.log(Slider2);
    //jK.fireEvent('elements.add');

    //var t1 = performance.now();
    //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
}.bind(jK));

// TODO: Setter and getters + Events with chain properties (prototype problem): (name.surname.bla, 'cos')
// TODO: fireEvent on Class