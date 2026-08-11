import { El as ɵɵdefineInjector, Hl as Observable, Il as map, Pc as NgZone, Rl as Subject, Tc as InjectionToken, Ui as setClassMetadata, Vl as operate, cc as ANIMATION_MODULE_TYPE, dc as CSP_NONCE, dr as Service, io as ɵɵdefineService, no as ɵɵdefineNgModule, ol as inject, qn as NgModule, zl as createOperatorSubscriber } from "./core-Cz0Y9r6B.js";
import { n as asyncScheduler } from "./async-Dmu3bDRk.js";
import { t as combineLatest } from "./combineLatest-CCUY4sGq.js";
import { t as filter } from "./filter-CxXmYwQ3.js";
import { n as startWith, r as concat, t as takeUntil } from "./takeUntil-CvikSTrs.js";
import { t as take } from "./take-CtPHqG3M.js";
import "./common-Be9KhGNM.js";
import { t as Platform } from "./_platform-chunk-B3P0jqKZ.js";
//#region node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js
function debounceTime(dueTime, scheduler) {
	if (scheduler === void 0) scheduler = asyncScheduler;
	return operate(function(source, subscriber) {
		var activeTask = null;
		var lastValue = null;
		var lastTime = null;
		var emit = function() {
			if (activeTask) {
				activeTask.unsubscribe();
				activeTask = null;
				var value = lastValue;
				lastValue = null;
				subscriber.next(value);
			}
		};
		function emitWhenIdle() {
			var targetTime = lastTime + dueTime;
			var now = scheduler.now();
			if (now < targetTime) {
				activeTask = this.schedule(void 0, targetTime - now);
				subscriber.add(activeTask);
				return;
			}
			emit();
		}
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			lastValue = value;
			lastTime = scheduler.now();
			if (!activeTask) {
				activeTask = scheduler.schedule(emitWhenIdle, dueTime);
				subscriber.add(activeTask);
			}
		}, function() {
			emit();
			subscriber.complete();
		}, void 0, function() {
			lastValue = activeTask = null;
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/skip.js
function skip(count) {
	return filter(function(_, index) {
		return count <= index;
	});
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_array-chunk.mjs
function coerceArray(value) {
	return Array.isArray(value) ? value : [value];
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/_breakpoints-observer-chunk.mjs
var mediaQueriesForWebkitCompatibility = /* @__PURE__ */ new Set();
var mediaQueryStyleNode;
var MediaMatcher = class MediaMatcher {
	_platform = inject(Platform);
	_nonce = inject(CSP_NONCE, { optional: true });
	_matchMedia;
	constructor() {
		this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia;
	}
	matchMedia(query) {
		if (this._platform.WEBKIT || this._platform.BLINK) createEmptyStyleRule(query, this._nonce);
		return this._matchMedia(query);
	}
	static ɵfac = function MediaMatcher_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MediaMatcher)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: MediaMatcher,
		factory: MediaMatcher.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MediaMatcher, [{ type: Service }], () => [], null);
})();
function createEmptyStyleRule(query, nonce) {
	if (mediaQueriesForWebkitCompatibility.has(query)) return;
	try {
		if (!mediaQueryStyleNode) {
			mediaQueryStyleNode = document.createElement("style");
			if (nonce) mediaQueryStyleNode.setAttribute("nonce", nonce);
			mediaQueryStyleNode.setAttribute("type", "text/css");
			document.head.appendChild(mediaQueryStyleNode);
		}
		if (mediaQueryStyleNode.sheet) {
			mediaQueryStyleNode.sheet.insertRule(`@media ${query.replace(/[{}]/g, "")} {body{ }}`, 0);
			mediaQueriesForWebkitCompatibility.add(query);
		}
	} catch (e) {
		console.error(e);
	}
}
function noopMatchMedia(query) {
	return {
		matches: query === "all" || query === "",
		media: query,
		addListener: () => {},
		removeListener: () => {}
	};
}
var BreakpointObserver = class BreakpointObserver {
	_mediaMatcher = inject(MediaMatcher);
	_zone = inject(NgZone);
	_queries = /* @__PURE__ */ new Map();
	_destroySubject = new Subject();
	ngOnDestroy() {
		this._destroySubject.next();
		this._destroySubject.complete();
	}
	isMatched(value) {
		return splitQueries(coerceArray(value)).some((mediaQuery) => this._registerQuery(mediaQuery).mql.matches);
	}
	observe(value) {
		let stateObservable = combineLatest(splitQueries(coerceArray(value)).map((query) => this._registerQuery(query).observable));
		stateObservable = concat(stateObservable.pipe(take(1)), stateObservable.pipe(skip(1), debounceTime(0)));
		return stateObservable.pipe(map((breakpointStates) => {
			const response = {
				matches: false,
				breakpoints: {}
			};
			breakpointStates.forEach(({ matches, query }) => {
				response.matches = response.matches || matches;
				response.breakpoints[query] = matches;
			});
			return response;
		}));
	}
	_registerQuery(query) {
		if (this._queries.has(query)) return this._queries.get(query);
		const mql = this._mediaMatcher.matchMedia(query);
		const output = {
			observable: new Observable((observer) => {
				const handler = (e) => this._zone.run(() => observer.next(e));
				mql.addListener(handler);
				return () => {
					mql.removeListener(handler);
				};
			}).pipe(startWith(mql), map(({ matches }) => ({
				query,
				matches
			})), takeUntil(this._destroySubject)),
			mql
		};
		this._queries.set(query, output);
		return output;
	}
	static ɵfac = function BreakpointObserver_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BreakpointObserver)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: BreakpointObserver,
		factory: BreakpointObserver.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreakpointObserver, [{ type: Service }], null, null);
})();
function splitQueries(queries) {
	return queries.map((query) => query.split(",")).reduce((a1, a2) => a1.concat(a2)).map((query) => query.trim());
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/layout.mjs
var LayoutModule = class LayoutModule {
	static ɵfac = function LayoutModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || LayoutModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: LayoutModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutModule, [{
		type: NgModule,
		args: [{}]
	}], null, null);
})();
//#endregion
//#region node_modules/@angular/material/fesm2022/_animation-chunk.mjs
var MATERIAL_ANIMATIONS = new InjectionToken("MATERIAL_ANIMATIONS");
var reducedMotion = null;
function _getAnimationsState() {
	if (inject(MATERIAL_ANIMATIONS, { optional: true })?.animationsDisabled || inject(ANIMATION_MODULE_TYPE, { optional: true }) === "NoopAnimations") return "di-disabled";
	reducedMotion ??= inject(MediaMatcher).matchMedia("(prefers-reduced-motion)").matches;
	return reducedMotion ? "reduced-motion" : "enabled";
}
function _animationsDisabled() {
	return _getAnimationsState() !== "enabled";
}
//#endregion
export { skip as a, coerceArray as i, _getAnimationsState as n, debounceTime as o, BreakpointObserver as r, _animationsDisabled as t };
