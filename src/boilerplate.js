if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        'use strict';
        function F() {}
        F.prototype = o;
        return new F();
    };
}