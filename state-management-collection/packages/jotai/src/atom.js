"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atom = atom;
function atom(read, write) {
    var config = {}; // 其实就是一个对象，没有什么黑魔法
    if (typeof read === 'function') {
        config.read = read;
    }
    else {
        config.init = read;
        config.read = function (get) { return get(config); };
        config.write = (function (get, set, arg) {
            return set(config, typeof arg === 'function'
                ? arg(get(config))
                : arg);
        });
    }
    if (write) {
        config.write = write;
    }
    return config;
}
