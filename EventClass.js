class Event {
	constructor(eventType, childSelector, eventHandler, ...eventHandlerParams) {
		// constructor(eventType, childSelector, eventHandler, eventHandlerParams) {
		this.eventType = eventType;
		this.childSelector = childSelector;
		this.eventHandler = eventHandler;
		// this.eventHandlerSetup = this.eventHandlerSetup;
		// fix args/params
		this.eventHandlerParams = eventHandlerParams;
		this.printDetails = () =>
			console.log(
				`eventType: ${this.eventType}, childSelector: ${this.childSelector}, eventHandler: ${this.eventHandler.name}, eventHandlerParams: ${this.eventHandlerParams}`
			);
		this.addEvent = document.addEventListener(this.eventType, (e) => {
			if (!e.target.matches(this.childSelector)) return;

			this.printDetails();
			// this.eventHandler(this.eventHandlerParams);
			console.log(typeof this.eventHandlerParams);
			console.log(Array.isArray(this.eventHandlerParams));

			// this.eventHandler(e, this.eventHandlerParams);

			this.eventHandlerSetup = (evParams) => (eParam) =>
				this.eventHandler(evParams)(eParam);
			this.eventHandlerSetup(this.eventHandlerParams)(e);

			// this.eventHandler = (eParam) => (evParams) =>
		});
	}
}

export { Event };

/* const switchChange = new Event("change", ".switch-input", handleSwitch2);

console.log(switchChange);
function handleSwitch2(e) {
	console.log(namespace.liObjArrIndex(e));
	if (switchIsOff(e)) {
		addClass(closest.li(e), "off");
		e.target.setAttribute("value", "Off");

		setObjectStatus(e);
		console.log(liObjArr[namespace.liObjArrIndex(e)].objStatus);
	} else {
		removeClass(closest.li(e), "off");
		e.target.setAttribute("value", "On");

		setObjectStatus(e);
		console.log(liObjArr[namespace.liObjArrIndex(e)].objStatus);
	}
} */
