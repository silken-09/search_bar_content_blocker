const getRuleIDs = () => {
	const getRules = chrome.declarativeNetRequest.getDynamicRules();
	return getRules.then((rules) => {
		const ruleIDs = rules.map((rule) => rule.id);
		return ruleIDs;
	});
};
const removeDynamicRules = (ruleIDs) => {
	return chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [...ruleIDs],
		addRules: [],
	});
};
const addRedirectRule = (id, priority, url, urlFilter) => {
	return chrome.declarativeNetRequest.updateDynamicRules({
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
};
const addBlockRule = (id, priority, urlFilter) => {
	return chrome.declarativeNetRequest.updateDynamicRules({
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
};
const addAllowRule = (id, priority, urlFilter) => {
	return chrome.declarativeNetRequest.updateDynamicRules({
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
};

// SHOULD MAKE SURE YOU NEED BOTH asyncs
const addDynamicRules = async (arr) => {
	const promises = arr.map(async (obj, index) => {
		const id = index + 1;
		if (obj.objStatus === "On") {
			if (obj.radioValue === "redirect") {
				const redirectRule = await addRedirectRule(
					id,
					obj.priority,
					obj.urlValue,
					// obj.pValue
					// obj.pValue.replaceAll(" ", "+")
					obj.pValue.replaceAll(" ", "*")
				);
				return redirectRule;
			} else {
				// const blockRule = await addBlockRule(id, obj.priority, obj.pValue);
				const blockRule = await addBlockRule(
					id,
					obj.priority,
					// obj.pValue.replaceAll(" ", "+")
					obj.pValue.replaceAll(" ", "*")
				);
				return blockRule;
			}
		} else {
			// const allowRule = await addAllowRule(id, obj.priority, obj.pValue);
			const allowRule = await addAllowRule(
				id,
				obj.priority,
				// obj.pValue.replaceAll(" ", "+")
				obj.pValue.replaceAll(" ", "*")
			);
			return allowRule;
		}
	});
	const proms = await Promise.all(promises);
	return proms;
	// NOT SURE I NEED RETURN STATEMENT (OR Promise.all) BECAUSE THE add___Rule2 FUNCTIONS HAVE RETURN STATEMENTS
};

const viewRules = () => {
	const getRules = chrome.declarativeNetRequest.getDynamicRules();
	getRules.then((rules) => {
		console.log(rules);
	});
};

const updateRules = (arr) => {
	getRuleIDs()
		.then((ruleIDs) => removeDynamicRules(ruleIDs))
		.then(() => addDynamicRules(arr))
		.then(() => viewRules());
};
// NEW updateRules SEEMS TO BE WORKING. MIGHT WANT TO TRY CONVERTING updateRules TO async...await ALSO
export { updateRules };
