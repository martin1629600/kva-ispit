import { r as EMPTY } from "./take-DrpgF7TY.js";
import { i as popNumber, o as popScheduler, r as innerFrom, t as from } from "./from-BBpehZQ-.js";
import { i as mergeAll } from "./takeUntil-Dr__hVNk.js";
//#region node_modules/rxjs/dist/esm5/internal/observable/merge.js
function merge() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	var scheduler = popScheduler(args);
	var concurrent = popNumber(args, Infinity);
	var sources = args;
	return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/keycodes.mjs
function hasModifierKey(event, ...modifiers) {
	if (modifiers.length) return modifiers.some((modifier) => event[modifier]);
	return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
//#endregion
export { merge as n, hasModifierKey as t };
