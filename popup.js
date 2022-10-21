/* NOTES:
	think i've seen functions that account for if user inputs the wrong data type (e.g., supposed to enter string but doesn't have quotes). maybe look into doing that

	set plus button so it only adds to list if alphanumeric characters are entered

	user should probably be able to get rid of pURL. right now, i think it only lets you replace it with a new url.

	should convert multi-word entries from: "word1 word2" to: "word1+word2" 

	string.replace(/\w+\s+\w+/, \w+\\+\w+)

	should make an exclusion list
		e.g., dickssportinggoods,
			  hello
			  skill
			  fate


		if full word is in dictionary but not in profane dictionary, 

		could take regular dictionary and bad-word dictionary and if bad word appears in regular dictionary, remove it

	look for opportunities to add ternary operators

	could put password on it
		either make it necessary to see/change anything
		or just require it when the user tries to change an input value or add/delete an item

	PROBLEM:
		when redirect is checked on the last item of the list, and then block is clicked, the top of the list item comes down (instead of the bottom of the list item (redirect-div) going up), so the switch moves right where the block button was, and if you quickly toggle the switch, it produces an error because the rules begin updating the new switch value while still updating from the block button being checked.

		most foolproof way of dealing with these issues is probably to add a "Save Changes" button and only update when that's clicked. i don't want to undo everything, though.

		maybe add a setTimeout function on the switch when the block button is clicked

		just checked, and this happens with list items that aren't the last one too

	need to uniformly name event handlers
*/

("use strict");

import { updateObjPriorities } from "./priorities.js";
import { createNewLIObj } from "./createNewLIObj.js";
import { updateRules } from "./rules.js";
import { storeContent } from "./setStorageContent.js";
import { removeClass, addClass } from "./addRemoveClass.js";
import { setObjectPropertyValue } from "./setObjectPropertyValue.js";
import { observeIntersection } from "./observeIntersection.js";
import { getCSSProperty, setCSSProperty } from "./getSetCSS.js";
import { createLIFromTemplate } from "./createLIFromTemplate.js";
import {
	onClick,
	onKeydown,
	onChange,
	onTransitionEnd,
	onLoad,
} from "./eventFunctions.js";
import { closestLI } from "./closestLI.js";

/* // TESTING:
DO NOT USE "this"! THE "this" VALUE STAYS AT WHATEVER YOU CLICK ON FIRST. DON'T TRY THIS ANYMORE. YOU'RE WASTING TIME
// TESTING: */

// MIGHT WANT TO TRY TO GET RID OF GLOBAL VARIABLES
const liInput = document.querySelector(".li-input");
const liObjArr = [];

(() => liInput.focus())();

// onClick(handlePlusClick)(".add-li-button");
onClick(".add-li-button")(handlePlusClick);
function handlePlusClick() {
	addLI();
}

// onKeydown(handleKeydown)(".li-input");
onKeydown(".li-input")(handleKeydown);
function handleKeydown(e) {
	if (e.key === "Enter") {
		addLI();
	}
}

function addLI() {
	// maybe: const liInputValue = liInput.value.trim();
	// should maybe clear input here:
	// need error message too
	if (liInput.value.trim().length < 1) return;

	if (liInputDoesNotAlreadyExist()) {
		createNewLIObj(liInput.value.trim());
		console.log(createNewLIObj(liInput.value.trim()));
		addToLIObjArr(createNewLIObj(liInput.value.trim()));
		updateObjPriorities(liObjArr);
		storeContentUpdateRules(liObjArr);
		appendNewLI(createLIFromTemplate(liInput.value.trim()));

		clearInput(liInput);
		openNewLI();
		observeIntersection();
	} else {
		alert(`${liInput.value.trim()} already exists`);
		liInput.focus();
		liInput.setSelectionRange(0, liInput.value.trim().length);
		//MAYBE BETTER IF SHAKE ANIMATION AND TOOLTIP
		// LOOK AT mightnotneedjquery
	}
}

function addToLIObjArr(obj) {
	liObjArr.push(obj);
	console.log(liObjArr);
}

function appendNewLI(li) {
	document.querySelector(".list").append(li);
}
function openNewLI() {
	document
		.querySelector(".list")
		.lastChild.querySelector(".toggle")
		.setAttribute("checked", "");
	setTimeout(() => {
		document.querySelector(".list").lastChild.scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "nearest",
		});
	}, 150); // SEEMS TO HAVE FIXED PLUSCLICK. CAN'T GO BELOW 100.
	// MAYBE TRY TO MAKE THIS SO IT ONLY DOES setTimeout() IF PLUSCLICK BECAUSE KEYDOWN WORKS FINE
}

function liInputDoesNotAlreadyExist() {
	const allBlockedStrings = document.querySelectorAll(".blocked-string");
	const blockedStringsArr = [...allBlockedStrings].map((str) =>
		str.textContent.toLowerCase()
	);

	return !blockedStringsArr.includes(liInput.value.trim().toLowerCase());
}

/* onClick(handleCollapsibleClick)(".collapsible");
function handleCollapsibleClick(e) {
	// IF OPEN COLLAPSIBLE, REDIRECT WAS CHECKED
	// CAN PROB ADD ANOTHER GUARD CLAUSE HERE:
	// if (!(e.target.checked && closestLI(e)(".redirect").checked)) return
	if (e.target.checked && closestLI(e)(".redirect").checked) {
		// IF URL WASN'T ENTERED:
		if (!liHasURL(e)) {
			// MIGHT NOT NEED '... = false'
			// closestLI(e)(".redirect").checked = false;
			closestLI(e)(".block").checked = true;

			closestLI(e)(".redirect-url").value = "";
		} else {
			// IF HAS URL BUT EDIT BUTTON WAS CLICKED:
			if (!redirectDiv2IsVisible(e)) {
				toggleRedirectDivs(e);
			}
		}
	}
} */

// onClick(handleCollapsibleClick)(".collapsible");
onClick(".collapsible")(handleCollapsibleClick);
function handleCollapsibleClick(e) {
	// open collapsible that had redirect checked when it was last closed
	if (!(e.target.checked && closestLI(e)(".redirect").checked)) return;
	// if URL was not entered:
	if (!liHasURL(e)) {
		closestLI(e)(".block").checked = true;
		closestLI(e)(".redirect-url").value = "";
	} else {
		// if LI has URL, but the edit button was clicked:
		if (!redirectDiv2IsVisible(e)) {
			toggleRedirectDivs(e);
		}
	}
}

function redirectDiv2IsVisible(e) {
	return !closestLI(e)(".rdc2").classList.contains("display-none");
}

// onChange(handleSwitch)(".switch-input");
onChange(".switch-input")(handleSwitch);
function handleSwitch(e) {
	// should probably make values lowercase
	console.log(liObjArrIndex(e));
	if (!e.target.checked) {
		// maybe better idea to use jquery fade method (replace)
		addClass(closestLI(e)(), "off");
		e.target.setAttribute("value", "Off");

		setObjectStatus(e);
		console.log(liObjArr[liObjArrIndex(e)].objStatus);
	} else {
		removeClass(closestLI(e)(), "off");
		e.target.setAttribute("value", "On");

		setObjectStatus(e);
		console.log(liObjArr[liObjArrIndex(e)].objStatus);
	}
	storeContentUpdateRules(liObjArr);
	//SHOULD HAVE .4s TRANSITION FOR THESE TO SYNC UP WITH THE SLIDER'S TRANSITION
	// RIGHT NOW, OPACITY ONLY TRANSITIONS WHEN ".off" CLASS IS ADDED
	// (i.e., when toggled back on, there's no transition)
}

// onClick(handleDisableSwitch)(".switch-input");
onClick(".switch-input")(handleDisableSwitch);
function handleDisableSwitch(e) {
	e.target.disabled = true;
	setTimeout(() => {
		e.target.disabled = false;
	}, 410);
}

// onClick(disableLIChildTransitions)(".trash-button-span");
onClick(".trash-button-span")(disableLIChildTransitions);
function disableLIChildTransitions(e) {
	console.log(e.target.closest("li"));
	// caret
	setCSSProperty(e)(
		".caret",
		"transform",
		getCSSProperty(e)(".caret", "transform")
	);

	// options-container
	setCSSProperty(e)(
		".options-container",
		"max-height",
		getCSSProperty(e)(".options-container", "max-height")
	);
	setCSSProperty(e)(".options-container", "transition", "none");

	// redirect-div
	setCSSProperty(e)(
		".redirect-div",
		"max-height",
		getCSSProperty(e)(".redirect-div", "max-height")
	);
	setCSSProperty(e)(".redirect-div", "transition", "none");

	// this stuff should be in own function. think i'll need to add another event on ".trash-button-span", put this stuff in it, and use a promise to wait for child transitions to be disabled
	closestLI(e)().style.willChange = "margin-top";
	console.log(closestLI(e)().style.willChange);
	addClass(closestLI(e)(), "zero");
	console.log(closestLI(e)().matches(".new-list-item.zero"));
	console.log(closestLI(e)());
}
/* function initializeLITransition(e) {
	closestLI(e)().style.willChange = "margin-top";
	console.log(closestLI(e)().style.willChange);
	addClass(closestLI(e)(), "zero");
} */

// onTransitionEnd(removeLI)(".new-list-item.zero");
onTransitionEnd(".new-list-item.zero")(removeLI);
function removeLI(e) {
	// THINK THIS IS FIRING BEFORE margin-top TRANSITION HAS COMPLETED. DON'T KNOW IF YOU WANT TO WORK ON THAT AT ALL.
	// ALSO, WILL-CHANGE IS ON MARGIN-TOP BUT NOT MAX-HEIGHT. MIGHT WANT TO ADD IT TO MAX-HEIGHT
	console.log("DONE");
	console.log(e);
	console.log(e.target);

	spliceArrItem(liObjArr, liObjArrIndex(e));

	updateObjPriorities(liObjArr);
	storeContentUpdateRules(liObjArr);

	closestLI(e)().remove();

	liInput.focus();

	// should probably delete this:
	closestLI(e)().style.willChange = "auto";
	console.log(closestLI(e)().style.willChange);
}

function setRadioValue(e) {
	return function (val) {
		return setObjectPropertyValue(liObjArr)(liObjArrIndex(e))("radioValue")(
			val
		);
	};
}

function setURLValue(e) {
	return function (val) {
		return setObjectPropertyValue(liObjArr)(liObjArrIndex(e))("urlValue")(val);
	};
}

function setObjectStatus(e) {
	return setObjectPropertyValue(liObjArr)(liObjArrIndex(e))("objStatus")(
		e.target.value
	);
}

// MAYBE: onChange(setRadioValueToBlock)
// onChange(changeRadioValueToBlock)(".block.radio-input");
onChange(".block.radio-input")(changeRadioValueToBlock);
function changeRadioValueToBlock(e) {
	setRadioValue(e)(e.target.value);
	// COULD DO ANOTHER GUARD CLAUSE HERE:
	if (liHasURL(e)) {
		storeContentUpdateRules(liObjArr);
	} // NOT SURE IF ANY HARM IN DOING THIS WHEN NO pURL
	console.log(liObjArr);
}

// onChange(changeRadioValueToRedirect)(".redirect.radio-input");
onChange(".redirect.radio-input")(changeRadioValueToRedirect);
function changeRadioValueToRedirect(e) {
	// ERASE REDIRECTURL TEXT (MIGHT NOT NEED IN IF STATEMENT)
	closestLI(e)(".redirect-url").value = "";
	// COULD DO ANOTHER GUARD CLAUSE HERE:
	if (liHasURL(e)) {
		setRadioValue(e)(e.target.value);

		if (!redirectDiv2IsVisible(e)) {
			// TOGGLE RDC2 VISIBLE
			toggleRedirectDivs(e);
		}
		storeContentUpdateRules(liObjArr);
	}
	console.log(liObjArr);
}

function liHasURL(e) {
	// should probably add another safeguard here ( && urlIsValid(closestLI(e)(".pURL")))
	return closestLI(e)(".pURL").textContent.length >= 1;
}

// onClick(handleRedirectURLFocus)(".redirect.radio-input");
onClick(".redirect.radio-input")(handleRedirectURLFocus);
function handleRedirectURLFocus(e) {
	// COULD DO GUARD CLAUSE HERE:
	if (closestLI(e)(".rdc2").matches(".display-none")) {
		closestLI(e)(".redirect-url").focus({ preventScroll: true });
	}
}

function setRedirectURLFocus(urlInput) {
	urlInput.focus();
	urlInput.setSelectionRange(urlInput.value.length, urlInput.value.length);
}

function enterURL(e) {
	// should maybe set it so if nothing is entered, there's no alert
	if (closestLI(e)(".redirect-url").value.trim().length < 1) return;

	if (urlIsValid(closestLI(e)(".redirect-url").value)) {
		//IF URL IS VALID AND IT DOESN'T CONTAIN THE SEARCH WORD
		if (!urlInputIncludesBlockedString(e)) {
			// SET RADIO & URL VALUES
			setRadioValue(e)("redirect");
			setURLValue(e)(closestLI(e)(".redirect-url").value.trim());

			console.log(liObjArr);

			// SET pURL TEXT CONTENT
			closestLI(e)(".pURL").textContent =
				closestLI(e)(".redirect-url").value.trim();

			// TOGGLE RDC2 VISIBLE
			toggleRedirectDivs(e);

			storeContentUpdateRules(liObjArr);
		} else {
			// need to figure out how to phrase this because it could be multiple words
			onInvalidURL(e)("URL cannot contain blocked word");
		}
	} else {
		// this should be more specific
		onInvalidURL(e)("URL is invalid");
	}
}
function onInvalidURL(e) {
	return function (message) {
		alert(message);
		setRedirectURLFocus(closestLI(e)(".redirect-url"));
	};
}

function urlInputIncludesBlockedString(e) {
	return closestLI(e)(".redirect-url")
		.value.toLowerCase()
		.includes(closestLI(e)(".blocked-string").textContent.toLowerCase());
}

// onClick(handleURLEnterClick)(".url-button");
onClick(".url-button")(handleURLEnterClick);
function handleURLEnterClick(e) {
	enterURL(e);
}

// onKeydown(handleURLEnterKeydown)();
onKeydown()(handleURLEnterKeydown);
function handleURLEnterKeydown(e) {
	if (!document.activeElement.classList.contains("redirect-url")) return;
	if (e.key !== "Enter") return;
	enterURL(e);
}

// onClick(handleEditClick)(".edit-button");
onClick(".edit-button")(handleEditClick);
function handleEditClick(e) {
	closestLI(e)(".redirect-url").value = closestLI(e)(".pURL").textContent;
	toggleRedirectDivs(e);
	setRedirectURLFocus(closestLI(e)(".redirect-url"));
}

function urlIsValid(urlStr) {
	const urlPattern =
		/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	return urlPattern.test(urlStr);
}

function liObjArrIndex(e) {
	return findIndexOf(liObjArr)(isEqualTo(closestLI(e)(".blocked-string")));
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

// maybe better idea to use jquery fade method
function toggleRedirectDivs(e) {
	closestLI(e)(".rdc1").classList.toggle("display-none");
	closestLI(e)(".rdc1").classList.toggle("redirect-div-content");

	closestLI(e)(".rdc2").classList.toggle("display-none");
	closestLI(e)(".rdc2").classList.toggle("redirect-div-content");
} //NOT SURE YOU SHOULD USE TOGGLE. SEEMS LIKE COULD CAUSE ERROR.

function clearInput(elem) {
	elem.value = "";
	elem.focus();
}

function onGot(item) {
	item.objArr.map((obj) => liObjArr.push(obj));
	console.log(liObjArr);

	liObjArr.forEach((obj) => {
		const restoredLI = createLIFromTemplate(obj.pValue);
		restoredLI.querySelector(".pURL").textContent = obj.urlValue;

		if (obj.radioValue === "redirect") {
			restoredLI.querySelector(".redirect").setAttribute("checked", "");
		}

		if (obj.urlValue !== null) {
			restoredLI.querySelector(".rdc1").className = "rdc1 display-none";
			restoredLI.querySelector(".rdc2").className = "rdc2 redirect-div-content";
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

// SHOULD MAYBE PUT THESE IN IIFE
const gettingItem = new Promise((resolve) =>
	chrome.storage.sync.get(["objArr"], resolve)
);
gettingItem.then(onGot);

function storeContentUpdateRules(arr) {
	storeContent(arr);
	updateRules(arr);
}

// onLoad(observeIntersection)();
onLoad()(observeIntersection);
