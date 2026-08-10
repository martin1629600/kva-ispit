import { Vl as operate, Wl as identity, ql as noop, zl as createOperatorSubscriber } from "./core-Cz0Y9r6B.js";
import { a as from, r as mergeMap, s as innerFrom, u as popScheduler } from "./switchMap-CUitNj_M.js";
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
function mergeAll(concurrent) {
	if (concurrent === void 0) concurrent = Infinity;
	return mergeMap(identity, concurrent);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/concatAll.js
function concatAll() {
	return mergeAll(1);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/concat.js
function concat() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	return concatAll()(from(args, popScheduler(args)));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/startWith.js
function startWith() {
	var values = [];
	for (var _i = 0; _i < arguments.length; _i++) values[_i] = arguments[_i];
	var scheduler = popScheduler(values);
	return operate(function(source, subscriber) {
		(scheduler ? concat(values, source, scheduler) : concat(values, source)).subscribe(subscriber);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js
function takeUntil(notifier) {
	return operate(function(source, subscriber) {
		innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
			return subscriber.complete();
		}, noop));
		!subscriber.closed && source.subscribe(subscriber);
	});
}
//#endregion
export { mergeAll as i, startWith as n, concat as r, takeUntil as t };
