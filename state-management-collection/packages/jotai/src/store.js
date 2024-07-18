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
exports.useStore = exports.createStore = void 0;
var hasInitialValue = function (atom) {
    return 'init' in atom;
};
// 判断两个atom状态是否一致
var isEqualAtomValue = function (a, b) {
    return 'v' in a && 'v' in b && Object.is(a.v, b.v);
};
// 返回 atom 对应的状态
var returnAtomValue = function (atomState) {
    return atomState.v;
};
var createStore = function () {
    // 维护atom和状态的映射
    var atomStateMap = new WeakMap();
    // 维护订阅atom，当sub atom时会将atom加入到mountedMap中
    var mountedMap = new WeakMap();
    // 维护需要更新状态的atom的集合
    var pendingMap = new Map();
    var mountedAtoms = new Set(); // 用于给 Jotai DevTools 使用
    var getAtomState = function (atom) {
        return atomStateMap.get(atom);
    }; // 从atomStateMap上获取状态
    var setAtomState = function (atom, atomState) {
        // 更新atom对应的状态，并将该atom和先前的状态加入到pendingMap中
        var prevAtomState = atomStateMap.get(atom);
        atomStateMap.set(atom, atomState);
        if (!pendingMap.has(atom)) {
            pendingMap.set(atom, prevAtomState);
        }
    };
    var setAtomValue = function (atom, value, nextDependencies) {
        var prevAtomState = getAtomState(atom);
        var nextAtomState = {
            d: nextDependencies || new Map(),
            v: value,
        };
        if (prevAtomState && isEqualAtomValue(prevAtomState, nextAtomState)) {
            // 这里会判断最新的状态和先前的状态是否一致，也就是判断v是否一致，不一致才需要更新状态
            return prevAtomState;
        }
        setAtomState(atom, nextAtomState);
        return nextAtomState;
    };
    var readAtomState = function (atom, force) {
        var atomState = getAtomState(atom);
        // 这里会判断缓存，如果不是强制重新读状态(force = true)，否则直接从Map中取回缓存的状态
        if (!force && atomState) {
            return atomState;
        }
        var nextDependencies = new Map();
        var getter = function (a) {
            // 这里需要判断是读当前的atom还是读的其他atom
            if (a === atom) {
                var aState_1 = getAtomState(a);
                if (aState_1) {
                    // 记录atom依赖了哪些其他atom，也就是说get了哪个就将哪个atom加入到nextDependencies
                    nextDependencies.set(a, aState_1);
                    return returnAtomValue(aState_1);
                }
                if (hasInitialValue(a)) {
                    nextDependencies.set(a, undefined);
                    return a.init;
                }
                throw new Error('no atom init');
            }
            // 如果不是读的自己，则递归调用readAtomState去读，并加入到依赖项nextDependencies中
            var aState = readAtomState(a);
            nextDependencies.set(a, aState);
            return returnAtomValue(aState);
        };
        // 这里其实就是构造了一个getter函数，并传入到read函数中来得到value
        var value = atom.read(getter);
        // 然后将最新的值更新到atomStateMap中
        return setAtomValue(atom, value, nextDependencies);
    };
    var readAtom = function (atom) {
        return returnAtomValue(readAtomState(atom));
    };
    var recomputeDependents = function (atom) {
        var _a;
        // t上记录了哪些其他atom依赖了这个atom
        var dependents = new Set((_a = mountedMap.get(atom)) === null || _a === void 0 ? void 0 : _a.t);
        dependents.forEach(function (dependent) {
            if (dependent !== atom) {
                // 因为要重新计算状态，所以这里第二个参数force = true，并且这个过程会将变化的atom加入到pendingMap中
                readAtomState(dependent, true);
            }
            recomputeDependents(dependent);
        });
    };
    var writeAtomState = function (atom) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var getter = function (a) {
            return returnAtomValue(readAtomState(a));
        };
        var setter = function (a) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var r;
            if (a === atom) {
                var prevAtomState = getAtomState(a);
                var nextAtomState = setAtomValue(a, args[0]);
                if (!prevAtomState || !isEqualAtomValue(prevAtomState, nextAtomState)) {
                    // 这里判断状态是否真的发生了变化，如果改变则需要重新去计算依赖的atom的状态
                    recomputeDependents(a);
                }
            }
            else {
                // 如果不是set当前的atom，则需要递归来完成状态更新
                r = writeAtomState.apply(void 0, __spreadArray([a], args, false));
            }
            return r;
        };
        // 这里其实就是创建了getter和setter函数，并传入到atom.write而已
        var result = atom.write.apply(atom, __spreadArray([getter, setter], args, false));
        return result;
    };
    var flushPending = function () {
        while (pendingMap.size) {
            var pending_1 = Array.from(pendingMap);
            pendingMap.clear();
            pending_1.forEach(function (_a) {
                var atom = _a[0], prevAtomState = _a[1];
                var atomState = getAtomState(atom);
                var mounted = mountedMap.get(atom);
                if (mounted &&
                    atomState &&
                    !(prevAtomState && isEqualAtomValue(prevAtomState, atomState))) {
                    mounted.l.forEach(function (listener) { return listener(); });
                }
            });
        }
    };
    var writeAtom = function (atom) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 更新atom状态
        var result = writeAtomState.apply(void 0, __spreadArray([atom], args, false));
        // 触发重新渲染
        flushPending();
        return result;
    };
    var mountAtom = function (atom, initialDependent) {
        var _a;
        // 分析atom依赖了哪些其他atom，然后逐个加入到mountedMap中
        (_a = getAtomState(atom)) === null || _a === void 0 ? void 0 : _a.d.forEach(function (_, a) {
            // 寻找依赖的方式是通过getAtomState(atom)，上面的d参数就是atom依赖的其他atom。这个过程是记录atom的依赖项，这样当状态变化时就知道要去重新计算哪些atom的状态。
            var aMounted = mountedMap.get(a);
            if (aMounted) {
                aMounted.t.add(atom);
            }
            else {
                if (a !== atom) {
                    // 递归，确保直接或间接依赖都加入到mountedMap中
                    mountAtom(a, atom);
                }
            }
        });
        var mounted = {
            t: new Set(initialDependent && [initialDependent]),
            l: new Set(),
        };
        mountedMap.set(atom, mounted);
        // 将atom加入到mountedMap中
        mountedAtoms.add(atom);
        return mounted;
    };
    var addAtom = function (atom) {
        var mounted = mountedMap.get(atom);
        if (!mounted) {
            mounted = mountAtom(atom);
        }
        return mounted;
    };
    var unmountAtom = function (atom) {
        // 卸载atom
        mountedMap.delete(atom);
        // 将atom从mountedMap中剔除
        var atomState = getAtomState(atom);
        if (atomState) {
            // 这里的作用是分析mountedMap中的所有atom中有哪些依赖了atom，也就是说把atom从t上删除
            atomState.d.forEach(function (_, a) {
                if (a !== atom) {
                    var mounted = mountedMap.get(a);
                    if (mounted === null || mounted === void 0 ? void 0 : mounted.t.has(atom)) {
                        mounted.t.delete(atom);
                    }
                }
            });
        }
    };
    // 完成对atom的订阅，listener的作用是当atom状态发生变化时调用listener来完成组件的重新渲染
    var subscribeAtom = function (atom, listener) {
        // 将当前atom加入到mountedMap中
        var mounted = addAtom(atom);
        var listeners = mounted.l;
        // 这里的listener就是useReducer返回的rerender函数，调用可以触发对应组件重新渲染
        listeners.add(listener);
        // 返回unsub函数，当组件卸载时调用
        return function () {
            unmountAtom(atom);
        };
    };
    return {
        get: readAtom,
        set: writeAtom,
        sub: subscribeAtom,
        get_mounted_atoms: function () { return mountedAtoms.values(); }, // 用于给 Jotai DevTools 使用
    };
};
exports.createStore = createStore;
var defaultStore = null;
var useStore = function () {
    if (!defaultStore) {
        defaultStore = (0, exports.createStore)();
    }
    return defaultStore;
};
exports.useStore = useStore;
