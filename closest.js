const closest = {
	li(e) {
		return e.target.closest("li");
	},
	listItem(e) {
		return e.target.closest(".list-item");
	},
	getClosest(e) {
		return function (selector) {
			return closest.li(e).querySelector(selector);
		};
	},
	collapsibleLabel(e) {
		return this.getClosest(e)(".collapsible-label");
	},
	span(e) {
		return this.getClosest(e)(".collapsible-label-span");
	},
	blockButton(e) {
		return this.getClosest(e)(".block");
	},
	redirectButton(e) {
		return this.getClosest(e)(".redirect");
	},
	redirectURL(e) {
		return this.getClosest(e)(".redirect-url");
	},
	pURL(e) {
		return this.getClosest(e)(".pURL");
	},
	redirectDiv1(e) {
		return this.getClosest(e)(".rdc1");
	},
	redirectDiv2(e) {
		return this.getClosest(e)(".rdc2");
	},
};

export { closest };
