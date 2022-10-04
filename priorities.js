// PROBLEM:
//  example:
/* 
    hi: priority = 1
    his: priority = 2
    historical: priority = 3
    historic: priority = 3

    when 'historical' is getting its priority, 'historic' still has a priority of 1.

    maybe need to change the order. instead of going chronologically (i.e., 1, 2, 3...), maybe sort the entries by length from shortest to longest and then add priorities based off of the order of that array.

    function compareNumbers(a, b) {
        return a.length - b.length;
    }
    arr.sort(compareNumbers)

    not sure if this fully solves it (it may though)
    too tired to tell if i need to do it for currentObjs, includedObjs, and/or both.
    pretty sure I'll need to at least do it for currentObjs first

    maybe just sort all list items at the beginning

    but what if there is a space in the string?
*/

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
	// console.log(arr);
}

export { updateObjPriorities };

/* 
1. slice/map arr
2. sort arr
3. at end of function, return OG arr with priorities from sliced arr:

arr.forEach((obj) => {
    if
})
*/
