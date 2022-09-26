"use strict";

// MIGHT WANT TO TRY TO GET RID OF GLOBAL VARIABLES
const liInput = document.querySelector(".li-input");
const plusButton = document.querySelector(".plus-bttn");
const liObjArr = [];

(() => liInput.focus())();

const namespace = {
	list: document.querySelector(".list"),
	list2() {
		const list2 = document.querySelector(".list");
		return list2;
	},
	liInput: document.querySelector(".li-input"),
	plusButton: document.querySelector(".plus-bttn"),
	liObjArrIndex(e) {
		return findIndexOf(liObjArr)(isEqualTo(closest.span(e)));
	},
};

namespace.plusButton.addEventListener("click", handlePlusClick);
namespace.liInput.addEventListener("keydown", handleKeyPress);

const closest = {
	li(e) {
		return e.target.closest("li");
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

function inputHasText(elem) {
	return elem.value.length > 0;
}
function inputDoesNotAlreadyExist() {
	const allCollapsibleLabelSpans = document.querySelectorAll(
		".collapsible-label-span"
	);
	const labelSpansArr = [...allCollapsibleLabelSpans].map((span) =>
		span.textContent.toLowerCase()
	);

	return !labelSpansArr.includes(liInput.value.toLowerCase());
}

// DON'T KNOW IF SHOULD SPLIT addLI() UP. E.G., FNS FOR liObjArr & FNS FOR LIST
function addLI() {
	if (!inputHasText(liInput)) return;

	if (inputDoesNotAlreadyExist()) {
		createNewLIObj(liInput.value);
		console.log(createNewLIObj(liInput.value));
		addToLIObjArr();
		updateObjPriorities(liObjArr);

		storeContentUpdateRules(liObjArr);

		appendNewLI(createLiFromTemplate(liInput.value));

		clearInput(liInput);
		openNewLI();
		observeIntersection();
	} else {
		alert(`${liInput.value} already exists`);
		liInput.focus();
		liInput.setSelectionRange(0, liInput.value.length);
		//MAYBE BETTER IF SHAKE ANIMATION AND TOOLTIP
	}
}

function handlePlusClick() {
	addLI();
}
function handleKeyPress(e) {
	if (e.key === "Enter") {
		addLI();
	}
}

// SHOULD PROB BE 'LI'
function createLiFromTemplate(liInputVal) {
	const template = document.querySelector("template");
	const newLI = template.content.querySelector("li").cloneNode(true);

	const setCollapsibleInputID = () => {
		const allCollapsibles = document.querySelectorAll(".toggle");
		const collapsible = newLI.querySelector(".collapsible");
		collapsible.setAttribute("id", `collapsible-${allCollapsibles.length}`);
	};
	setCollapsibleInputID();

	// setCollapsibleLabelForAttribute
	const setCollapsibleLabelForValue = () => {
		const allCollapsibleLabels =
			document.querySelectorAll(".collapsible-label");
		const collapsibleLabel = newLI.querySelector(".collapsible-label");
		collapsibleLabel.setAttribute(
			"for",
			`collapsible-${allCollapsibleLabels.length}`
		);
	};
	setCollapsibleLabelForValue();

	const setCollapsibleLabelTextContent = (liInputVal) => {
		newLI.querySelector(".collapsible-label-span").textContent = liInputVal;
	};
	setCollapsibleLabelTextContent(liInputVal);

	// setBlockRadioInputValues
	// setBlockRadioValues
	// setBlockRadioAttributes
	const setBlockRadioInputValues = () => {
		const allBlockRadioInputs = document.querySelectorAll(".block");
		const blockRadioInput = newLI.querySelector(".block");
		blockRadioInput.setAttribute("id", `block-${allBlockRadioInputs.length}`);
		blockRadioInput.setAttribute(
			"name",
			`options-${allBlockRadioInputs.length}`
		);
	};
	setBlockRadioInputValues();

	// setBlockLabelRadioForValue
	// setBlockRadioLabelForValue
	// setBlockLabelRadioForAttribute
	// setBlockRadioLabelForAttribute
	const setBlockRadioLabelForValue = () => {
		const allBlockRadioLabels = document.querySelectorAll(".block-radio-label");
		const blockRadioLabel = newLI.querySelector(".block-radio-label");
		blockRadioLabel.setAttribute("for", `block-${allBlockRadioLabels.length}`);
	};
	setBlockRadioLabelForValue();

	// setRedirectRadioInputValues
	// setRedirectRadioValues
	// setRedirectRadioAttributes
	const setRedirectRadioInputValues = () => {
		const allRedirectRadioInputs = document.querySelectorAll(".redirect");
		const redirectRadioInput = newLI.querySelector(".redirect");
		redirectRadioInput.setAttribute(
			"id",
			`redirect-${allRedirectRadioInputs.length}`
		);
		redirectRadioInput.setAttribute(
			"name",
			`options-${allRedirectRadioInputs.length}`
		);
	};
	setRedirectRadioInputValues();

	// setRedirectRadioLabelForAttribute
	const setRedirectRadioLabelForValue = () => {
		const allRedirectRadioLabels = document.querySelectorAll(
			".redirect-radio-label"
		);
		const redirectRadioLabel = newLI.querySelector(".redirect-radio-label");
		redirectRadioLabel.setAttribute(
			"for",
			`redirect-${allRedirectRadioLabels.length}`
		);
	};
	setRedirectRadioLabelForValue();

	return newLI;
}

function appendNewLI(li) {
	document.querySelector(".list").append(li);
}
function openNewLI() {
	namespace.list.lastChild.querySelector(".toggle").setAttribute("checked", "");
	setTimeout(() => {
		document.querySelector(".list").lastChild.scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "nearest",
		});
	}, 150); // SEEMS TO HAVE FIXED PLUSCLICK. CAN'T GO BELOW 100.
	// MAYBE TRY TO MAKE THIS SO IT ONLY DOES setTimeout() IF PLUSCLICK BECAUSE KEYDOWN WORKS FINE
}

// handleClickCollapsible
document.addEventListener("click", handleCollapsibleClick);
function handleCollapsibleClick(e) {
	if (!e.target.matches(".collapsible")) return;
	// IF OPEN COLLAPSIBLE, REDIRECT WAS CHECKED
	// CAN PROB ADD ANOTHER GUARD CLAUSE HERE:
	if (e.target.checked && closest.redirectButton(e).checked) {
		// IF URL WASN'T ENTERED:
		if (!liHasURL(e)) {
			console.log("redirect: checked, pURL length: < 1");
			// MIGHT NOT NEED '... = false'
			closest.redirectButton(e).checked = false;
			closest.blockButton(e).checked = true;

			closest.redirectURL(e).value = "";
		} else {
			// IF HAS URL BUT EDIT BUTTON WAS CLICKED:
			if (!redirectDiv2IsVisible(e)) {
				console.log(closest.redirectDiv2(e).classList.contains("display-none"));
				console.log(!redirectDiv2IsVisible(e));
				toggleRedirectDivClasses(
					closest.redirectDiv1(e),
					closest.redirectDiv2(e)
				);
			}
		}
	}
}

function redirectDiv2IsVisible(e) {
	return !closest.redirectDiv2(e).classList.contains("display-none");
}

// handle changeSwitch
// handle changeOnOffSwitch
document.addEventListener("change", handleSwitch);
function handleSwitch(e) {
	if (!e.target.matches(".switch-input")) return;

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
	storeContentUpdateRules(liObjArr);
	//SHOULD HAVE .4s TRANSITION FOR THESE TO SYNC UP WITH THE SLIDER'S TRANSITION
	// RIGHT NOW, OPACITY ONLY TRANSITIONS WHEN ".off" CLASS IS ADDED
}

// handleCollapsibleClick(e) HAS AN "e.target.checked". DON'T KNOW IF MATTERS
function switchIsOff(e) {
	return !e.target.checked;
}

// handleClickDisableOnOffSwitch
document.addEventListener("click", handleDisableSwitch);
function handleDisableSwitch(e) {
	if (!e.target.matches(".switch-input")) return;

	e.target.disabled = true;
	setTimeout(() => {
		e.target.disabled = false;
	}, 410);
}

function removeClass(element, classSelector) {
	if (!element.classList.contains(classSelector)) return;
	element.classList.remove(classSelector);
}
function addClass(element, classSelector) {
	if (element.classList.contains(classSelector)) return;
	element.classList.add(classSelector);
}

// handleClickDeleteLI
// handleClickDeleteButton
// handleRemoveLI
// handleClickRemoveLI
document.addEventListener("click", handleRemoveLI);
function handleRemoveLI(e) {
	if (!e.target.matches(".trash-button-span")) return;

	spliceArrItem(liObjArr, namespace.liObjArrIndex(e));

	updateObjPriorities(liObjArr);
	storeContentUpdateRules(liObjArr);

	console.log(closest.li(e));
	closest.li(e).remove();

	liInput.focus();
}
function setPropertyValue(arr) {
	return function (index) {
		return function (prop) {
			return function (val) {
				return (arr[index][prop] = val);
			};
		};
	};
}

function setRadioValue(e) {
	return function (val) {
		return setPropertyValue(liObjArr)(namespace.liObjArrIndex(e))("radioValue")(
			val
		);
	};
}

function setURLValue(e) {
	return function (val) {
		return setPropertyValue(liObjArr)(namespace.liObjArrIndex(e))("urlValue")(
			val
		);
	};
}

function setObjectStatus(e) {
	return setPropertyValue(liObjArr)(namespace.liObjArrIndex(e))("objStatus")(
		e.target.value
	);
}

document.addEventListener("change", changeRadioValueToBlock);
// onChangeToBlock(e)
function changeRadioValueToBlock(e) {
	if (!e.target.matches(".block.radio-input")) return;

	setRadioValue(e)(e.target.value);
	// COULD DO ANOTHER GUARD CLAUSE HERE:
	if (liHasURL(e)) {
		storeContentUpdateRules(liObjArr);
	} // NOT SURE IF ANY HARM IN DOING THIS WHEN NO pURL
	console.log(liObjArr);
}

document.addEventListener("change", changeRadioValueToRedirect);
function changeRadioValueToRedirect(e) {
	if (!e.target.matches(".redirect.radio-input")) return;
	// ERASE REDIRECTURL TEXT (MIGHT NOT NEED IN IF STATEMENT)
	if (inputHasText(closest.redirectURL(e))) {
		closest.redirectURL(e).value = "";
	}
	// COULD DO ANOTHER GUARD CLAUSE HERE:
	if (liHasURL(e)) {
		setRadioValue(e)(e.target.value);

		if (!redirectDiv2IsVisible(e)) {
			// TOGGLE RDC2 VISIBLE
			toggleRedirectDivClasses(
				closest.redirectDiv1(e),
				closest.redirectDiv2(e)
			);
		}
		storeContentUpdateRules(liObjArr);
	}
	console.log(liObjArr);
}

function liHasURL(e) {
	return closest.pURL(e).textContent.length >= 1;
}

// handleURLFocus
// handleURLInputFocus
document.addEventListener("click", handleRedirectURLFocus);
function handleRedirectURLFocus(e) {
	if (!e.target.matches(".redirect.radio-input")) return;
	// COULD DO ANOTHER GUARD CLAUSE HERE:
	if (closest.redirectDiv2(e).matches(".display-none")) {
		closest.redirectURL(e).focus({ preventScroll: true });
	}
}
function setRedirectURLFocus(urlInput) {
	urlInput.focus();
	urlInput.setSelectionRange(urlInput.value.length, urlInput.value.length);
}

function enterURL(e) {
	if (urlIsValid(closest.redirectURL(e).value)) {
		//IF URL IS VALID AND IT DOESN'T CONTAIN THE SEARCH WORD
		if (!urlInputIncludesBlockedWord(e)) {
			// SET RADIO & URL VALUES
			setRadioValue(e)("redirect");
			setURLValue(e)(closest.redirectURL(e).value);
			console.log(liObjArr);

			// SET pURL TEXT CONTENT
			closest.pURL(e).textContent = closest.redirectURL(e).value;

			// TOGGLE RDC2 VISIBLE
			toggleRedirectDivClasses(
				closest.redirectDiv1(e),
				closest.redirectDiv2(e)
			);

			storeContentUpdateRules(liObjArr);
		} else {
			alert("URL cannot contain search term");
			setRedirectURLFocus(closest.redirectURL(e));
		}
	} else {
		alert("URL is invalid");
		setRedirectURLFocus(closest.redirectURL(e));
	}
}

function urlInputIncludesBlockedWord(e) {
	return closest
		.redirectURL(e)
		.value.toLowerCase()
		.includes(closest.span(e).textContent.toLowerCase());
}

// handleEnterURL
// handleClickEnterURL
document.addEventListener("click", handleURLEnterClick);
function handleURLEnterClick(e) {
	if (!e.target.matches(".url-button")) return;
	enterURL(e);
}
// handleKeydownEnterURL
document.addEventListener("keydown", handleURLEnterKeyPress);
function handleURLEnterKeyPress(e) {
	// MAYBE: if (!redirectURLIsActive)
	if (document.activeElement.className !== "redirect-url") return;
	if (e.key !== "Enter") return;
	enterURL(e);
}

// handleEditURL
// handleClickEditURL
document.addEventListener("click", handleEditClick);
function handleEditClick(e) {
	if (!e.target.matches(".edit-button")) return;

	closest.redirectURL(e).value = closest.pURL(e).textContent;
	toggleRedirectDivClasses(closest.redirectDiv1(e), closest.redirectDiv2(e));
	setRedirectURLFocus(closest.redirectURL(e));
}

function urlIsValid(urlStr) {
	const urlPattern =
		/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	return urlPattern.test(urlStr);
}

function findIndexOf(arr) {
	return function (func) {
		return arr.findIndex(func);
	};
}

function isEqualTo(elem) {
	return function (item) {
		return item.pValue === elem.textContent;
	};
}

function spliceArrItem(arr, index) {
	arr.splice(index, 1);
}

function toggleRedirectDivClasses(div1, div2) {
	div1.classList.toggle("display-none");
	div1.classList.toggle("redirect-div-content");

	div2.classList.toggle("display-none");
	div2.classList.toggle("redirect-div-content");
} //NOT SURE YOU SHOULD USE TOGGLE. SEEMS LIKE COULD CAUSE ERROR.

//THIS IS FOR THE ***INITIAL*** ENTRY (handlePlusClick(e))
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

// SHOULD MAYBE USE PARAMETERS FOR THIS:
function addToLIObjArr() {
	liObjArr.push(createNewLIObj(liInput.value));
	console.log(liObjArr);
}

function updateObjPriorities(liObjArr) {
	liObjArr.forEach((currentObj) => {
		const previousObjs = liObjArr.slice(0, liObjArr.indexOf(currentObj));
		const trailingObjs = liObjArr.slice(liObjArr.indexOf(currentObj) + 1);
		const otherObjs = previousObjs.concat(trailingObjs);

		const includedObjs = otherObjs.filter((otherObj) =>
			currentObj.pValue.toLowerCase().includes(otherObj.pValue.toLowerCase())
		);
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
	console.log(liObjArr);
}

function clearInput(elem) {
	elem.value = "";
	elem.focus();
}

function setObjArr() {
	console.log("liObjArr set");
}
function onError(error) {
	console.log(`Error: ${error}`);
}

function storeContent() {
	chrome.storage.sync.set({ objArr: liObjArr }, function () {
		console.log("objArr value is set to " + JSON.stringify(liObjArr));
	});
}

function onGot(item) {
	item.objArr.map((obj) => liObjArr.push(obj));
	console.log(liObjArr);

	liObjArr.forEach((obj) => {
		const restoredLI = createLiFromTemplate(obj.pValue);
		restoredLI.querySelector(".pURL").textContent = obj.urlValue;

		if (obj.radioValue === "redirect") {
			restoredLI.querySelector(".redirect").setAttribute("checked", "");
		}

		if (obj.urlValue !== null) {
			restoreRedirectDivs(restoredLI);
		}

		if (obj.objStatus === "Off") {
			restoredLI.querySelector(".switch input[type=checkbox]").checked = false;
			addClass(restoredLI, "off");
		}
		appendNewLI(restoredLI);
	});
	updateObjPriorities(liObjArr);
	updateRules(liObjArr);
}

function restoreRedirectDivs(li) {
	li.querySelector(".rdc1").className = "rdc1 display-none";
	li.querySelector(".rdc2").className = "rdc2 redirect-div-content";
}

// SHOULD MAYBE PUT THESE IN IIFE
const gettingItem = new Promise((resolve) =>
	chrome.storage.sync.get(["objArr"], resolve)
);
gettingItem.then(onGot);

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

function storeContentUpdateRules(rfArr) {
	storeContent();
	updateRules(rfArr);
}

window.addEventListener("load", observeIntersection);
function observeIntersection() {
	const list = document.querySelector(".list");
	const listItems = list.childNodes;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				entry.target.classList.toggle("is-intersecting", !entry.isIntersecting);
			});

			// NOT SURE IF BENEFIT TO USING "list" OVER document (PROB LESS ERROR-PRONE)
			list.addEventListener("click", focusOnEntry);
			// SHOULD MAYBE DO ARROW FUNCTION
			function focusOnEntry(e) {
				// THINK I COULD USE GUARD CLAUSE. NOT SURE I WANT TO
				if (
					e.target.matches(
						".collapsible, .block, .redirect, .redirect-url, .url-button"
					)
					// URL BUTTON ALREADY SCROLLS ON FOCUS, SO MAY WANT TO TAKE OUT
				) {
					setTimeout(() => {
						// IDEALLY WOULD LIKE TO DO WITHOUT USING A CLASS
						if (closest.li(e).classList.contains("is-intersecting")) {
							console.log(closest.li(e).getBoundingClientRect().y);
							scrollLIIntoView(closest.li(e));
						}
					}, 410);
				}
			}
		},
		{
			threshold: 1,
		}
	);
	listItems.forEach((li) => {
		observer.observe(li);
	});
}
function scrollLIIntoView(elem) {
	const CONTAINER_CENTER_HEIGHT = 290;
	if (elem.getBoundingClientRect().y < CONTAINER_CENTER_HEIGHT) {
		scrollLIToTop(elem);
	} else {
		scrollLIToBottom(elem);
	}
}
function scrollLIToTop(elem) {
	elem.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest",
	});
}
function scrollLIToBottom(elem) {
	elem.scrollIntoView({
		behavior: "smooth",
		block: "end",
		inline: "nearest",
	});
}
