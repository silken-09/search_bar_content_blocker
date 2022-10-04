function createNewLIObj(liInputVal) {
	// MAYBE USE ARROW FUNCTION
	function LIObjectConstructor(
		pValue,
		radioValue,
		urlValue,
		objStatus,
		priority
	) {
		this.pValue = pValue;
		this.radioValue = radioValue;
		this.urlValue = urlValue;
		this.objStatus = objStatus;
		this.priority = priority;
	}
	const liObjDefault = new LIObjectConstructor(
		liInputVal,
		"block",
		null,
		"On",
		1
	);

	return liObjDefault;
}

export { createNewLIObj };
