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

/* 
LIKE THE CREATIVITY OF USING SETINTERVAL, BUT MOST LIKELY BAD PRACTICE. IF YOU STILL CAN'T FIGURE OUT WHY MARGIN-TOP TRANSITION WON'T WORK, THINK OF MORE PRACTICAL SOLUTIONS. E.G., 
	SET MARGIN ON .collapsible-label INSTEAD
		(ISSUE IS THAT CLICKING THE MARGIN WOULD BE CLICKING closest.li(e))
		COULD TRY TO KEEP MAXHEIGHT AT 40 AND HAVE MARGIN OF COLLAPSIBLE-LABEL OVERFLOW THE LI
	SET POSITION TO ABSOLUTE

*/

// document.addEventListener("click", minimizeMarginTop);
// document.addEventListener("transitionend", minimizeMarginTop);
/* function minimizeMarginTop(e) {
	if (e.target.matches(".new-list-item.max-height-zero")) {
		let currentMarginTop = 8;
		let marginTopStr;

		let setIntervalFunction = setInterval(() => {
			marginTopStr = `${currentMarginTop}px`;
			currentMarginTop = currentMarginTop - 1;

			console.log(currentMarginTop);
			console.log(marginTopStr);

			closest.li(e).style.marginTop = marginTopStr;
			clearIntervalFunction(marginTopStr);
		}, 30);
		let clearIntervalFunction = (val) => {
			if (val == "0px") {
				clearInterval(setIntervalFunction);
			}
		};
	}
} */
