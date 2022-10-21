// should change this to setObjPropertyValue
function setObjectPropertyValue(arr) {
	return function (index) {
		return function (prop) {
			return function (val) {
				return (arr[index][prop] = val);
			};
		};
	};
}

export { setObjectPropertyValue };
