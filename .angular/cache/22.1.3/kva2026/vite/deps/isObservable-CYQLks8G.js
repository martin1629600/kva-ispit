import { Hl as Observable, Ql as isFunction } from "./core-Cz0Y9r6B.js";
//#region node_modules/rxjs/dist/esm5/internal/util/isObservable.js
function isObservable(obj) {
	return !!obj && (obj instanceof Observable || isFunction(obj.lift) && isFunction(obj.subscribe));
}
//#endregion
export { isObservable as t };
