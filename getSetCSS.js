function getCSSPropertyValue(elem, propertyStr) {
	const computedStyle = window
		.getComputedStyle(elem)
		.getPropertyValue(propertyStr);
	return computedStyle;
}

function setCSSProperty(elem, propertyStr, valueStr) {
	elem.style.setProperty(propertyStr, valueStr);
}

export { getCSSPropertyValue, setCSSProperty };
