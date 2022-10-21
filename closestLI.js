function closestLI(e) {
	return function (selector) {
		if (selector !== undefined) {
			return e.target.closest("li").querySelector(selector);
		} else {
			return e.target.closest("li");
		}
	};
}

// ALSO WORKS:
/* const closest = (function () {
	function getLI(e) {
		return function (selector) {
			if (selector !== undefined) {
				return e.target.closest("li").querySelector(selector);
			} else {
				return e.target.closest("li");
			}
		};
	}

	function li(e) {
		return getLI(e);
	}

	return {
		li: li,
	};
})();
console.log(closest.li(e)());
console.log(closest.li(e)(".block")); */

// COULD ALSO TRY TO ADD:
/* function liObjArrIndex(e) {
	return findIndexOf(liObjArr)(isEqualTo(closestLI(e)(".blocked-string")));
}

function findIndexOf(arr) {
	return function (func) {
		return arr.findIndex(func);
	};
}

function isEqualTo(elem) {
	return function (item) {
		return item.pValue === elem.textContent;
	};
} */

export { closestLI };
