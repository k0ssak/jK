var jK = {
    fireEvent: function (eventName) {
        'use strict';

        var mOptions = jK.Options,
            object;

        for (object in mOptions.Events[eventName]) {
            if (mOptions.Events[eventName].hasOwnProperty(object)) {
                mOptions.Events[eventName][object].listeners[eventName].call(mOptions.Events[eventName][object]);
            }
        }
    }
};

jK.Options = {
    DOMReady: false,
    DOMLoaded: false,
    Events: { }
};

jK.preInit = (function () {
    'use strict';

    var mOptions = jK.Options;

    $(document).ready(function () {
        mOptions.DOMReady = true;
    });

    $(window).load(function () {
        mOptions.DOMLoaded = true;
    });

    jK.Classes = {};

    return true;
}());

jK.Tools = (function () {
    'use strict';

    var isObject,
        registerClass,
        createInstance,
        getInstance,
        mapOptions;

    isObject = function (object) {
        if (object !== null && object.length === undefined && typeof object === 'object') {
            return true;
        }

        return false;
    };

    registerClass = function (className, options) {
        var moduleName = jK.Classes[className];

        if (moduleName.registred !== true) {
            moduleName.registred = true;
            moduleName.Instances = [];

            if (options.singleton === true) {
                moduleName.Instances.Singleton = options.singleton;
            }

            if (options.condition === true) {
                moduleName.call();

                if (options.autoInitialize === true) {
                    createInstance(className);
                }
            }
        }
    };

    createInstance = function (className, options) {
        var moduleName = jK.Classes[className];

        if ((moduleName.Instances.Singleton && moduleName.Instances[0] === undefined) || !moduleName.Instances.Singleton) {
            moduleName.Instances.push(new jK[className](options));
        }

        return moduleName.Instances[moduleName.Instances.length - 1];
    };

    getInstance = function (className) {
        return jK.Classes[className].Instances[0];
    };

    mapOptions = function(obj, path) {
        var option;

        for (option in obj) {
            if (obj.hasOwnProperty(option) && !isObject(obj[option])) {  
                path[option] = obj[option];
            } else {
                if (path[option] === undefined) {
                    path[option] = {};
                }

                mapOptions(obj[option], path[option]);
            }
        }
    };

    return {
        isObject : isObject,
        registerClass : registerClass,
        createInstance : createInstance,
        getInstance : getInstance,
        mapOptions : mapOptions
    };
}());

jK.Class = function (classPrototype, uber) {
    'use strict';

    var mTools = jK.Tools,
        mOptions = jK.Options,
        parentOption,
        _class;

    _class = function (initOptions) {
        var option,
            initialize,
            listener;

        this.options = {};

        // Merging prototype options with "_class" options. Providing unique set of options for every instance of "_class"
        mTools.mapOptions(_class.prototype.options, this.options);

        if (initOptions) {
            if (mTools.isObject(initOptions)) {
                // Addind options to "_class" provided on init.
                mTools.mapOptions(initOptions, this.options);
            } else {
                console.error('Error occured whilte creating ' + this.name + ' object. Initializing object with not object value! "' + initOptions + '" is not an object');
                return false;
            }
        }

        // Add Event listeners on Object
        if (classPrototype.listeners) {
            for (listener in classPrototype.listeners) {
                if (classPrototype.listeners.hasOwnProperty(listener)) {
                    if (!mOptions.Events[listener]) {
                        mOptions.Events[listener] = [];
                    }

                    mOptions.Events[listener].push(this);
                }
            }
        }

        this.set = function (propertyName, propertyValue) {
            var properties = propertyName.split('.'),
                propLength = properties.length,
                propNext = this.options,
                i;

            for (i = 0; i < propLength; i++) {
                if (propNext[properties[i]] === undefined) {
                    propNext[properties[i]] = { };
                }

                if (i === (propLength - 1)) {
                    propNext[properties[i]] = propertyValue;
                }

                propNext = propNext[properties[i]];
            }

            if (this.listeners.change !== undefined) {
                this.listeners.change.call(this);
            }

            if (this.listeners['change:' + propertyName.replace(/\./g, ':')] !== undefined) {
                this.listeners['change:' + propertyName.replace(/\./g, ':')].call(this);
            }
        }.bind(this);

        this.get = function (propertyName) {
            return this.options[propertyName];
        }.bind(this);

        // Auto initializing object only if DOMReady
        initialize = function (DOMReady) {
            if (DOMReady === true) {
                this.initialize.apply(this, arguments);
                return true;
            }

            setTimeout(function () {
                initialize(mOptions.DOMReady);
            }.bind(this), 1);
        }.bind(this);

        initialize(mOptions.DOMReady);
    };

    _class.fn = _class.prototype;

    // Inheritance. You can access parent object by calling *this.uber*.
    if (typeof uber === 'function') {
        for (parentOption in uber.prototype) {
            if (uber.prototype.hasOwnProperty(parentOption)) {
                _class.fn[parentOption] = uber.prototype[parentOption];
            }
        }

        _class.fn.uber = _class;
        _class.fn.uber = uber.prototype;
    }

    // Every method provided in constructor function is added to the prototype.
    if (classPrototype) {
        _class.extendPrototype = (function (cPrototype) {
            var cProperty;
            for (cProperty in cPrototype) {
                if (cPrototype.hasOwnProperty(cProperty)) {
                    _class.fn[cProperty] = cPrototype[cProperty];
                }
            }
        }(classPrototype));
    }

    return _class;
};