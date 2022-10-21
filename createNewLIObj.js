function createNewLIObj(liInputVal) {
	function LIObject(pValue, radioValue, urlValue, objStatus, priority) {
		this.pValue = pValue;
		this.radioValue = radioValue;
		this.urlValue = urlValue;
		this.objStatus = objStatus;
		this.priority = priority;
	}
	const liObject = new LIObject(liInputVal, "block", null, "On", 1);

	return liObject;
}

export { createNewLIObj };
