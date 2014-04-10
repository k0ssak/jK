/* 
 * Module that inherits from Slider Module
*/
(function () {
    'use strict';

    jK.Classes.MiniSlider = function () {
        jK.MiniSlider = new jK.Class({
            name: 'MiniSlider Module'
        }, jK.Slider);
    };

    jK.Tools.registerClass('MiniSlider', {
        condition: true,
        autoInitialize: false,
        singleton: false
    });
}());