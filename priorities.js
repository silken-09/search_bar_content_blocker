/* 
this is working how i want it to, but i'm not really sure why. i'm not sure why it sets the priorities how i want it to without changing the order of list items in liObjArr. 
*/

function compareStringLengths(a, b) {
	return a.pValue.length - b.pValue.length;
}

function updateObjPriorities(arr) {
	const sortedArr = arr.slice().sort(compareStringLengths);
	// console.log(sortedArr);

	sortedArr.forEach((currentObj) => {
		const otherObjs = sortedArr.filter(
			(obj) => sortedArr.indexOf(obj) !== sortedArr.indexOf(currentObj)
		);
		// console.log(otherObjs);

		const includedObjs = otherObjs.filter((otherObj) =>
			currentObj.pValue.toLowerCase().includes(otherObj.pValue.toLowerCase())
		);
		// guard clause?

		if (includedObjs.length > 0) {
			const includedObjPriorities = includedObjs.map(
				(includedObj) => includedObj.priority
			);
			const maxIncludedObjPriority = Math.max(...includedObjPriorities);
			const newCurrentPriority = maxIncludedObjPriority + 1;
			currentObj.priority = newCurrentPriority;
		} else {
			currentObj.priority = 1;
		}
	});
	console.log(arr);
}

export { updateObjPriorities };
