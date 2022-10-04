function getUpdatedRules() {
	const updatedRules = chrome.declarativeNetRequest.getDynamicRules();
	updatedRules.then((items) => {
		console.log(items);
		console.log("RULES UPDATED");
	});
}

function removeDynamicRules(ruleIds) {
	chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [...ruleIds],
		addRules: [],
	});
}

function addDynamicRules(arr) {
	arr.forEach((obj, index) => {
		const id = index + 1;
		if (obj.objStatus === "On") {
			if (obj.radioValue === "redirect") {
				addRedirectRule(id, obj.priority, obj.urlValue, obj.pValue);
			} else {
				addBlockRule(id, obj.priority, obj.pValue);
			}
		} else {
			addAllowRule(id, obj.priority, obj.pValue);
		}
	});
	console.log("RULES ADDED");
}

function addRedirectRule(id, priority, url, urlFilter) {
	chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [],
		addRules: [
			{
				"id": id,
				"priority": priority,
				"action": {
					"type": "redirect",
					"redirect": {
						"url": url,
					},
				},
				"condition": {
					"urlFilter": urlFilter,
					"isUrlFilterCaseSensitive": false,
					"resourceTypes": ["main_frame"],
				},
			},
		],
	});
}

function addBlockRule(id, priority, urlFilter) {
	chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [],
		addRules: [
			{
				"id": id,
				"priority": priority,
				"action": {
					"type": "block",
				},
				"condition": {
					"urlFilter": urlFilter,
					"isUrlFilterCaseSensitive": false,
					"resourceTypes": ["main_frame"],
				},
			},
		],
	});
}

function addAllowRule(id, priority, urlFilter) {
	chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [],
		addRules: [
			{
				"id": id,
				"priority": priority,
				"action": {
					"type": "allow",
				},
				"condition": {
					"urlFilter": urlFilter,
					"isUrlFilterCaseSensitive": false,
					"resourceTypes": ["main_frame"],
				},
			},
		],
	});
}

function updateRules(rfArr) {
	//THIS IS GETTING THE RULES BEFORE THE NEW ONE HAS BEEN CREATED
	const rules = chrome.declarativeNetRequest.getDynamicRules();
	const rulesChainRemove = rules.then((items) => {
		const ruleIds = items.map((item) => item.id);
		removeDynamicRules(ruleIds);
		return;
	});
	// SHOULD PROB GET RID OF UNUSED VARIABLE
	const rulesChainAdd = rulesChainRemove.then(() => {
		addDynamicRules(rfArr);
	});
	setTimeout(() => {
		getUpdatedRules();
	}, 1000);
}

export { updateRules };
