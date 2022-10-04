function removeClass(element, classSelector) {
	if (!element.classList.contains(classSelector)) return;
	element.classList.remove(classSelector);
}
function addClass(element, classSelector) {
	if (element.classList.contains(classSelector)) return;
	element.classList.add(classSelector);
}

export { removeClass, addClass };
