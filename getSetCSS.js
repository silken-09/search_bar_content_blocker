import { closestLI } from "./closestLI.js";

/* function getCSSPropertyValue(elem, propertyStr) {
	return window.getComputedStyle(elem).getPropertyValue(propertyStr);
} */
/* function setCSSProperty(elem, propertyStr, valueStr) {
	elem.style.setProperty(propertyStr, valueStr);
} */

function getCSSProperty(e) {
	return function (selector, propertyStr) {
		return window
			.getComputedStyle(closestLI(e)(selector))
			.getPropertyValue(propertyStr);
	};
}

function setCSSProperty(e) {
	return function (selector, propertyStr, valueStr) {
		closestLI(e)(selector).style.setProperty(propertyStr, valueStr);
	};
}

export { getCSSProperty, setCSSProperty };
