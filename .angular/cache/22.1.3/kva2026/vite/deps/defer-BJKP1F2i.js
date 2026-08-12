import { Hl as Observable } from "./core-Cz0Y9r6B.js";
import { t as innerFrom } from "./innerFrom-DTOf5TM2.js";
//#region node_modules/rxjs/dist/esm5/internal/observable/defer.js
function defer(observableFactory) {
	return new Observable(function(subscriber) {
		innerFrom(observableFactory()).subscribe(subscriber);
	});
}
//#endregion
export { defer as t };
