function scrollLIIntoView(elem) {
	const CONTAINER_CENTER_HEIGHT = 290;
	if (elem.getBoundingClientRect().y < CONTAINER_CENTER_HEIGHT) {
		scrollLIToTop(elem);
	} else {
		scrollLIToBottom(elem);
	}
}
function scrollLIToTop(elem) {
	elem.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest",
	});
}
function scrollLIToBottom(elem) {
	elem.scrollIntoView({
		behavior: "smooth",
		block: "end",
		inline: "nearest",
	});
}
export { scrollLIIntoView };
