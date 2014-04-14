/* 
 * Module that inherits from Slider Module
*/
(function () {
    'use strict';

    jK._Classes.MiniSlider = function () {
        jK.MiniSlider = new jK._Class({
            name: 'MiniSlider Module'
        }, jK.Slider);
    };

    jK._Tools.registerClass('MiniSlider', {
        condition: true,
        autoInitialize: false,
        singleton: false
    });
}());