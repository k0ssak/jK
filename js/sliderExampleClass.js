(function () {
    'use strict';

    jK.Classes.Slider = function () {
        /*
        *  Slider private methods and variables
        *  Private methods has to be called with 'this'. This allows access to object public methods and vars.  * privateFunction.call(this) * 
        */

        var privFunc = function () {
            this.options.name = 'Janek';
        };

        /*
        *  Slider public (prototype) methods and variables. 
        */

        jK.Slider = new jK.Class({
            name: 'SliderModule',
            version: '5.5.0',

            /*
            * Everything in options is specific for instance of this Class. 
            * Everything else is added to prototype, meaning changes will be made for all objects of provided Class
            */

            options: {
                name: 'Marek',
                addr: {
                    street: 'cos',
                    home: 31
                }
            },

            /*
             * Listeners are not inherited!
            */

            listeners: {
                'elements.add' : function () {
                    this.assign();
                },

                'elements.set' : function () {
                    this.nameSay('Karol');
                },

                'change' : function () {
                    console.log('Some property changed');
                },

                'change:name' : function () {
                    console.log('Triggered ' + this.options.name);
                },

                'change:addr:a:d:s' : function () {
                    console.log('some crazy shit happened');
                }
            },

            initialize: function () {
                //console.log(this);
                //privFunc.call(this);
            },

            nameSay: function (s) {
                this.options.name = s;
            },

            assign: function () {
                console.log(this.options.name);
            }
        });
    };

    jK.Tools.registerClass('Slider', {
        condition: true,
        autoInitialize: false,
        singleton: false
    });
}());