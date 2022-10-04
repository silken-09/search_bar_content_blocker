// function addEventListener(el, eventName, eventHandler, selector) {
// 	if (selector) {
// 		const wrappedHandler = (e) => {
// 			if (e.target && e.target.matches(selector)) {
// 				eventHandler(e);
// 			}
// 		};
// 		el.addEventListener(eventName, wrappedHandler);
// 		return wrappedHandler;
// 	} else {
// 		el.addEventListener(eventName, eventHandler);
// 		return eventHandler;
// 	}
// }

/* function addEventListener(el, eventName, eventHandler, param, selector) {
	if (selector) {
		const wrappedHandler = (e) => {
			if (e.target && e.target.matches(selector)) {
				eventHandler(e, param);
			}
		};
		el.addEventListener(eventName, wrappedHandler);
		return wrappedHandler;
	} else {
		el.addEventListener(eventName, eventHandler);
		return eventHandler;
	}
} */

// COULDN'T KEEP THE else {} PART OF THE FUNCTION BECAUSE BOTH selector AND param HAVE TO BE ON THE END FOR THEM TO BE OPTIONAL
// MAYBE: addEventDelegationListener() {}
function addEventListener(eventName, selector, eventHandler, param) {
	const wrappedHandler = (e) => {
		if (e.target && e.target.matches(selector)) {
			eventHandler(e, param);
		}
	};
	document.addEventListener(eventName, wrappedHandler);
	return wrappedHandler;
}

function getClosestEl(selector, fn) {
	document.addEventListener("click", (e) => {
		if (!e.target.closest(selector)) return;
		fn.call(e.target, e);
	});
}
// getClosestEl(".redirect", returnClosestEl);

function getClosest(selector) {
	document.addEventListener("click", (e) => {
		if (!e.target.closest(selector)) return;
		returnClosestEl.call(e.target, e);
	});
}
// getClosest(".collapsible-label");
function returnClosestEl() {
	console.log(this);
	return this;
}

function getClosest3(gcselector, rcSelector) {
	document.addEventListener("click", (e) => {
		if (!e.target.closest(gcselector)) return;
		returnClosestEl3(rcSelector).call(e.target, e);
	});
}
// getClosest3(".collapsible", ".redirect");
function returnClosestEl3(rcSelector) {
	return function () {
		console.log(this.closest("li").querySelector(rcSelector));
		// return;
	};
}

function getClosestVar(e, selector) {
	console.log("GET CLOSEST VAR");
	console.log(e.target.closest("li").querySelector(selector));
	return e.target.closest("li").querySelector(selector);
}

export { addEventListener };
