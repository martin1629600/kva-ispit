import { t as EMPTY } from "./empty-BlnH25o_.js";
import { t as innerFrom } from "./innerFrom-DTOf5TM2.js";
import { a as popScheduler, r as popNumber, t as from } from "./from-B-NQ0IDr.js";
import { i as mergeAll } from "./takeUntil-CvikSTrs.js";
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
export { merge as t };
