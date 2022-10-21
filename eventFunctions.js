/* function addEventListener(parent) {
	return function (eventName) {
		return function (eventHandler) {
			return function (selector) {
				if (selector) {
					const wrappedHandler = (e) => {
						if (e.target && e.target.matches(selector)) {
							eventHandler(e);
						}
					};
					parent.addEventListener(eventName, wrappedHandler);
					return wrappedHandler;
				} else {
					parent.addEventListener(eventName, eventHandler);
					return eventHandler;
				}
			};
		};
	};
} */
function addEventListener(parent) {
	return function (eventName) {
		return function (selector) {
			return function (eventHandler) {
				if (selector) {
					const wrappedHandler = (e) => {
						if (e.target && e.target.matches(selector)) {
							eventHandler(e);
						}
					};
					parent.addEventListener(eventName, wrappedHandler);
					return wrappedHandler;
				} else {
					parent.addEventListener(eventName, eventHandler);
					return eventHandler;
				}
			};
		};
	};
}

const onClick = addEventListener(document)("click");
const onKeydown = addEventListener(document)("keydown");
const onChange = addEventListener(document)("change");
const onTransitionEnd = addEventListener(document)("transitionend");
const onLoad = addEventListener(window)("load");

export { onClick, onKeydown, onChange, onTransitionEnd, onLoad };
