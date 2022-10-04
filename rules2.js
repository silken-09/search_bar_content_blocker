/* function getRuleIDs() {
	const getRules = chrome.declarativeNetRequest.getDynamicRules();
	return getRules.then((rules) => {
		const ruleIDs = rules.map((rule) => rule.id);
		return ruleIDs;
	});
} */
/* const getRuleIDs = () => {
	const getRules = chrome.declarativeNetRequest.getDynamicRules();
	return getRules.then((rules) => {
		const ruleIDs = rules.map((rule) => rule.id);
		return ruleIDs;
	});
}; */

/* function rRules() {
	return getRuleIDs().then((ruleIDs) => {
		return chrome.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: [...ruleIDs],
			addRules: [],
		});
	});
} */
/* const rRules = () => {
	return getRuleIDs().then((ruleIDs) => {
		return chrome.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: [...ruleIDs],
			addRules: [],
		});
	});
}; */

/* function viewRules1() {
	return rRules().then(() => {
		const getRules = chrome.declarativeNetRequest.getDynamicRules();
		return getRules.then((rules) => {
			console.log(rules);
		});
		// console.log(rules);
		// return rules;
	});
} */
/* const viewRules1 = () => {
	return rRules().then(() => {
		const getRules = chrome.declarativeNetRequest.getDynamicRules();
		return getRules.then((rules) => {
			console.log(rules);
		});
		// console.log(rules);
		// return rules;
	});
}; */

/* function addRedirectRule2(id, priority, url, urlFilter) {
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
} */
/* const addRedirectRule2 = (id, priority, url, urlFilter) => {
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
}; */

/* function addBlockRule2(id, priority, urlFilter) {
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
} */
/* const addBlockRule2 = (id, priority, urlFilter) => {
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
}; */

/* function addAllowRule2(id, priority, urlFilter) {
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
} */
/* const addAllowRule2 = (id, priority, urlFilter) => {
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
}; */

/* function addDynamicRules2(arr) {
	return rRules().then(() => {
		arr.forEach((obj, index) => {
			const id = index + 1;
			if (obj.objStatus === "On") {
				if (obj.radioValue === "redirect") {
					addRedirectRule2(id, obj.priority, obj.urlValue, obj.pValue);
				} else {
					addBlockRule2(id, obj.priority, obj.pValue);
				}
			} else {
				addAllowRule2(id, obj.priority, obj.pValue);
			}
		});
		console.log("RULES ADDED");
		return arr;
	});
} */
/* const addDynamicRules2 = (arr) => { 
    return rRules().then(() => {
		arr.forEach((obj, index) => {
			const id = index + 1;
			if (obj.objStatus === "On") {
				if (obj.radioValue === "redirect") {
					addRedirectRule2(id, obj.priority, obj.urlValue, obj.pValue);
				} else {
					addBlockRule2(id, obj.priority, obj.pValue);
				}
			} else {
				addAllowRule2(id, obj.priority, obj.pValue);
			}
		});
		console.log("RULES ADDED");
		return arr;
	});
}; */

/* function viewRules(arr) {
	return addDynamicRules2(arr).then((rules) => {
		console.log(rules);
	});
} */
/* const viewRules = (arr) => {
	return addDynamicRules2(arr).then((rules) => {
		console.log(rules);
	});
}; */

/* const getRuleIDs = () => {
	const getRules = chrome.declarativeNetRequest.getDynamicRules();
	return getRules.then((rules) => {
		const ruleIDs = rules.map((rule) => rule.id);
		return ruleIDs;
	});
};
const removeDynamicRules2 = () => {
	return getRuleIDs().then((ruleIDs) => {
		return chrome.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: [...ruleIDs],
			addRules: [],
		});
	});
};
const addRedirectRule2 = (id, priority, url, urlFilter) => {
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
const addBlockRule2 = (id, priority, urlFilter) => {
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
const addAllowRule2 = (id, priority, urlFilter) => {
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
const addDynamicRules2 = (arr) => {
	return rRules().then(() => {
		arr.forEach((obj, index) => {
			const id = index + 1;
			if (obj.objStatus === "On") {
				if (obj.radioValue === "redirect") {
					addRedirectRule2(id, obj.priority, obj.urlValue, obj.pValue);
				} else {
					addBlockRule2(id, obj.priority, obj.pValue);
				}
			} else {
				addAllowRule2(id, obj.priority, obj.pValue);
			}
		});
		console.log("RULES ADDED");
		return arr;
	});
};
const viewRules = (arr) => {
	return addDynamicRules2(arr).then((rules) => {
		console.log(rules);
	});
}; */

// const getRuleIDs = () => {
// 	const getRules = chrome.declarativeNetRequest.getDynamicRules();
// 	return getRules.then((rules) => {
// 		const ruleIDs = rules.map((rule) => rule.id);
// 		return ruleIDs;
// 	});
// };
// // console.log(getRuleIDs());

// const removeDynamicRules2 = (ruleIDs) => {
// 	// console.log(ruleIDs);
// 	return chrome.declarativeNetRequest.updateDynamicRules({
// 		removeRuleIds: [...ruleIDs],
// 		addRules: [],
// 	});
// 	/* .then(() => {
// 			const rs = chrome.declarativeNetRequest.getDynamicRules();
// 			rs.then((rules) => {
// 				console.log(rules);
// 			});
// 		}); */
// };

// const addRedirectRule2 = (id, priority, url, urlFilter) => {
// 	return chrome.declarativeNetRequest.updateDynamicRules({
// 		removeRuleIds: [],
// 		addRules: [
// 			{
// 				"id": id,
// 				"priority": priority,
// 				"action": {
// 					"type": "redirect",
// 					"redirect": {
// 						"url": url,
// 					},
// 				},
// 				"condition": {
// 					"urlFilter": urlFilter,
// 					"isUrlFilterCaseSensitive": false,
// 					"resourceTypes": ["main_frame"],
// 				},
// 			},
// 		],
// 	});
// };
// const addBlockRule2 = (id, priority, urlFilter) => {
// 	return chrome.declarativeNetRequest.updateDynamicRules({
// 		removeRuleIds: [],
// 		addRules: [
// 			{
// 				"id": id,
// 				"priority": priority,
// 				"action": {
// 					"type": "block",
// 				},
// 				"condition": {
// 					"urlFilter": urlFilter,
// 					"isUrlFilterCaseSensitive": false,
// 					"resourceTypes": ["main_frame"],
// 				},
// 			},
// 		],
// 	});
// };
// const addAllowRule2 = (id, priority, urlFilter) => {
// 	return chrome.declarativeNetRequest.updateDynamicRules({
// 		removeRuleIds: [],
// 		addRules: [
// 			{
// 				"id": id,
// 				"priority": priority,
// 				"action": {
// 					"type": "allow",
// 				},
// 				"condition": {
// 					"urlFilter": urlFilter,
// 					"isUrlFilterCaseSensitive": false,
// 					"resourceTypes": ["main_frame"],
// 				},
// 			},
// 		],
// 	});
// };
// const addDynamicRules2 = (arr) => {
// 	// console.log(arr);
// 	arr.forEach((obj, index) => {
// 		const id = index + 1;
// 		if (obj.objStatus === "On") {
// 			if (obj.radioValue === "redirect") {
// 				addRedirectRule2(id, obj.priority, obj.urlValue, obj.pValue);
// 			} else {
// 				addBlockRule2(id, obj.priority, obj.pValue);
// 			}
// 		} else {
// 			addAllowRule2(id, obj.priority, obj.pValue);
// 		}
// 	});
// 	console.log("RULES ADDED");
// 	return arr;
// };

// /* const updateRules2 = async (arr) => {
// 	const ruleIDs = await getRuleIDs();
// 	console.log(ruleIDs);
// 	const removeRules = await removeDynamicRules2(ruleIDs);
// 	console.log(removeRules);
// 	const addRules = await addDynamicRules2(arr);
// 	console.log(addRules);

// 	// console.log(addRules) seems to work but nothing after that

// 	// const viewRules2 = await chrome.declarativeNetRequest.getDynamicRules();
// 	// const viewRules2 = chrome.declarativeNetRequest.getDynamicRules();
// 	// console.log(viewRules);
// 	// const st = () => {
// 	// 	setTimeout(() => {
// 	// 		viewRules2.then((rules) => {
// 	// 			console.log(rules);
// 	// 		});
// 	// 	}, 499);
// 	// };
// 	// viewRules;
// 	// const viewRules3 = await st();
// 	// console.log(viewRules3);
// }; */

// // const viewRules = (rules) => {
// // 	console.log(rules);
// // };
// // const viewRules = (arr) => {
// const viewRules = () => {
// 	// console.log(arr);
// 	const getRules = chrome.declarativeNetRequest.getDynamicRules();
// 	getRules.then((rules) => {
// 		console.log(rules);
// 	});
// };
// const updateRules = (arr) => {
// 	// updateRules2(arr);

// 	getRuleIDs()
// 		.then((ruleIDs) => removeDynamicRules2(ruleIDs))
// 		.then(() => addDynamicRules2(arr))
// 		.then((arr) =>
// 			setTimeout(() => {
// 				viewRules(arr);
// 			}, 500)
// 		);
// };

// /* const updateRules = async (arr) => {
// 	const ruleIDs = await getRuleIDs();
// 	console.log(ruleIDs);
// 	const removeRules = await removeDynamicRules2(ruleIDs);
// 	console.log(removeRules);
// 	const addRules = await addDynamicRules2(arr);
// 	console.log(addRules);
// 	setTimeout(() => {
// 		viewRules();
// 	}, 500);
// 	// });
// }; */

// export { updateRules };

// /* const updateRules2 = async (arr) => {
// 	const ruleIDs = await getRuleIDs();
// 	console.log(ruleIDs);
// 	// const removeRules = await removeDynamicRules2(ruleIDs);
// 	// const addRules = await addDynamicRules2(arr);
// 	// const viewRules = await chrome.declarativeNetRequest.getDynamicRules();
// }; */

const getRuleIDs = () => {
	const getRules = chrome.declarativeNetRequest.getDynamicRules();
	// console.log(getRules);
	return getRules.then((rules) => {
		const ruleIDs = rules.map((rule) => rule.id);
		// console.log(ruleIDs);
		return ruleIDs;
	});
};
const removeDynamicRules2 = (ruleIDs) => {
	console.log(ruleIDs);
	return chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [...ruleIDs],
		addRules: [],
	});
	/* .then(() => {
			const rs = chrome.declarativeNetRequest.getDynamicRules();
			rs.then((rules) => {
				console.log(rules);
			});
		}); */
};
const addRedirectRule2 = (id, priority, url, urlFilter) => {
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
const addBlockRule2 = (id, priority, urlFilter) => {
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
const addAllowRule2 = (id, priority, urlFilter) => {
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
const addDynamicRules2 = (arr) => {
	// console.log(arr);
	arr.forEach((obj, index) => {
		const id = index + 1;
		if (obj.objStatus === "On") {
			if (obj.radioValue === "redirect") {
				addRedirectRule2(id, obj.priority, obj.urlValue, obj.pValue);
			} else {
				addBlockRule2(id, obj.priority, obj.pValue);
			}
		} else {
			addAllowRule2(id, obj.priority, obj.pValue);
		}
	});
	console.log("RULES ADDED");
	return arr;
};
// const viewRules = (rules) => {
// 	console.log(rules);
// };
const viewRules = (arr) => {
	console.log(arr);
	const getRules = chrome.declarativeNetRequest.getDynamicRules();
	getRules.then((rules) => {
		console.log(rules);
	});
};
const updateRules = (arr) => {
	getRuleIDs()
		.then((ruleIDs) => removeDynamicRules2(ruleIDs))
		.then(() => addDynamicRules2(arr))
		.then((arr) =>
			setTimeout(() => {
				viewRules(arr);
			}, 750)
		);
};
// need to make the 500 longer. it's not getting all the rules
export { updateRules };
