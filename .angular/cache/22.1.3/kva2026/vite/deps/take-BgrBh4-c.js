import { Hl as Observable, Il as map, Vl as operate, Wl as identity, au as __read, ou as __spreadArray, zl as createOperatorSubscriber } from "./core-Cz0Y9r6B.js";
import { a as from, l as popResultSelector, o as executeSchedule, u as popScheduler } from "./switchMap-CUitNj_M.js";
//#region node_modules/rxjs/dist/esm5/internal/observable/empty.js
var EMPTY = new Observable(function(subscriber) {
	return subscriber.complete();
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
var isArray$1 = Array.isArray;
function callOrApply(fn, args) {
	return isArray$1(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
	return map(function(args) {
		return callOrApply(fn, args);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf;
var objectProto = Object.prototype;
var getKeys = Object.keys;
function argsArgArrayOrObject(args) {
	if (args.length === 1) {
		var first_1 = args[0];
		if (isArray(first_1)) return {
			args: first_1,
			keys: null
		};
		if (isPOJO(first_1)) {
			var keys = getKeys(first_1);
			return {
				args: keys.map(function(key) {
					return first_1[key];
				}),
				keys
			};
		}
	}
	return {
		args,
		keys: null
	};
}
function isPOJO(obj) {
	return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/createObject.js
function createObject(keys, values) {
	return keys.reduce(function(result, key, i) {
		return result[key] = values[i], result;
	}, {});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js
function combineLatest() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	var scheduler = popScheduler(args);
	var resultSelector = popResultSelector(args);
	var _a = argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
	if (observables.length === 0) return from([], scheduler);
	var result = new Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
		return createObject(keys, values);
	} : identity));
	return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
function combineLatestInit(observables, scheduler, valueTransform) {
	if (valueTransform === void 0) valueTransform = identity;
	return function(subscriber) {
		maybeSchedule(scheduler, function() {
			var length = observables.length;
			var values = new Array(length);
			var active = length;
			var remainingFirstValues = length;
			var _loop_1 = function(i) {
				maybeSchedule(scheduler, function() {
					var source = from(observables[i], scheduler);
					var hasFirstValue = false;
					source.subscribe(createOperatorSubscriber(subscriber, function(value) {
						values[i] = value;
						if (!hasFirstValue) {
							hasFirstValue = true;
							remainingFirstValues--;
						}
						if (!remainingFirstValues) subscriber.next(valueTransform(values.slice()));
					}, function() {
						if (!--active) subscriber.complete();
					}));
				}, subscriber);
			};
			for (var i = 0; i < length; i++) _loop_1(i);
		}, subscriber);
	};
}
function maybeSchedule(scheduler, execute, subscription) {
	if (scheduler) executeSchedule(subscription, scheduler, execute);
	else execute();
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/take.js
function take(count) {
	return count <= 0 ? function() {
		return EMPTY;
	} : operate(function(source, subscriber) {
		var seen = 0;
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			if (++seen <= count) {
				subscriber.next(value);
				if (count <= seen) subscriber.complete();
			}
		}));
	});
}
//#endregion
export { combineLatest as n, EMPTY as r, take as t };
