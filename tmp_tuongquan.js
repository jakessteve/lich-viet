"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var tuviEngine_1 = require("./src/services/tuvi/tuviEngine");
var input = {
    dateType: 'solar',
    solarDate: '1983-11-13',
    timeIndex: 9,
    gender: 'male',
    name: 'Test',
    school: 'vi'
};
var chart = (0, tuviEngine_1.generateChart)(input);
chart.palaces.forEach(function (p, i) {
    var allNames = __spreadArray(__spreadArray(__spreadArray([], p.majorStars.map(function (s) { return s.name; }), true), p.minorStars.map(function (s) { return s.name; }), true), p.adjectiveStars.map(function (s) { return s.name; }), true);
    if (allNames.includes('Tướng Quân')) {
        console.log("T\u01B0\u1EDBng Qu\u00E2n found in Palace ".concat(i, " (").concat(p.earthlyBranch, ")"));
    }
});
