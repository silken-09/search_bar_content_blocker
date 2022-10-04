// should change this to setObjPropertyValue
function setPropertyValue(arr) {
	return function (index) {
		return function (prop) {
			return function (val) {
				return (arr[index][prop] = val);
			};
		};
	};
}

/* function setRadioValue(e) {
	return function (val) {
		return setPropertyValue(liObjArr)(namespace.liObjArrIndex(e))("radioValue")(
			val
		);
	};
} */

/* function setURLValue(e) {
	return function (val) {
		return setPropertyValue(liObjArr)(namespace.liObjArrIndex(e))("urlValue")(
			val
		);
	};
} */

/* function setObjectStatus(e) {
	return setPropertyValue(liObjArr)(namespace.liObjArrIndex(e))("objStatus")(
		e.target.value
	);
} */

export { setPropertyValue };
