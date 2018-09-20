"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objects_1 = require("@src/util/objects");
exports.copyWith = objects_1.copyWith;
exports.splitEvery = objects_1.splitEvery;
var type_level_1 = require("@src/util/type-level");
exports.absurd = type_level_1.absurd;
var promises_1 = require("@src/util/promises");
exports.delay = promises_1.delay;
exports.timeout = promises_1.timeout;
exports.withRetry = promises_1.withRetry;
var iphonex_1 = require("@src/util/iphonex");
exports.isIphoneX = iphonex_1.isIphoneX;
var mutref_1 = require("@src/util/mutref");
exports.MutRef = mutref_1.MutRef;
const perf_tracer_1 = require("@src/util/perf-tracer");
exports.PerfTracer = new perf_tracer_1.PerfTracer();
exports.VuforiaPerfTracer = new perf_tracer_1.PerfTracer();
function isEmptyString(s) {
    if (typeof s === 'string') {
        if (s.trim().length > 0) {
            return false;
        }
    }
    return true;
}
exports.isEmptyString = isEmptyString;
