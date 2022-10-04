/* NOTES:
	try to implement addEventListener function(s) (not classes)

	duplicate code in enterURL(): 
		alert("URL is invalid");
		setRedirectURLFocus(closest.redirectURL(e));
*/

("use strict");

// import { observeIntersection } from "./scroll.js";
import { closest } from "./closest.js";
import { updateObjPriorities } from "./priorities.js";
import { createNewLIObj } from "./createNewLIObj.js";
import { updateRules } from "./rules2.js";
import { storeContent } from "./setStorageContent.js";
import { removeClass, addClass } from "./addRemoveClass.js";
import { setPropertyValue } from "./setPropertyValue.js";
import { observeIntersection } from "./observeIntersection.js";
import { getCSSPropertyValue, setCSSProperty } from "./getSetCSS.js";
import { createLiFromTemplate } from "./createLIFromTemplate.js";
import { Event } from "./EventClass.js";
import { addEventListener } from "./eventFunctions.js";

/* // TESTING:
// addEventListener(document, "click", xyz, [11, vw], ".collapsible-label-span");
//  function xyzHandler(e, param) {
// 	console.log("XYZ");
// 	// console.log(param[1](param[0]));
// 	// console.log(vw());
// 	console.log(e.target);
// } 
//  function vw() {
// 	// return num * num;
// 	return 2 * 2;
// } 

// addEventListener("click", ".collapsible", xyzHandler, [15, vw]);
// addEventListener("click", ".collapsible", xyzHandler, vw);
// addEventListener("click", ".collapsible", xyzHandler);

//  function xy(x, y) {
// 	document.addEventListener("click", (e) => {
// 		if (e.target.matches(".collapsible")) {
// 			console.log(x + y);
// 		}
// 	});
// } 
// xy(2, 3);

//  function ab(e, params) {
// 	console.log(params);
// 	console.log(params[0]);
// 	console.log(params[0] + params[1]);
// 	console.log(e.target);
// } 

// const abEvent = new Event("click", ".collapsible", ab, 7, 8);

//  function cd(params) {
// 	return function (e) {
// 		console.log(e.target);
// 		console.log(params);
// 	};
// } 

// const curryEvent = new Event("click", ".collapsible", cd, 10, 11);
// TESTING: */

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

	return !labelSpansArr.includes(liInput.value.trim().toLowerCase());
}

// DON'T KNOW IF SHOULD SPLIT addLI() UP. E.G., FNS FOR liObjArr & FNS FOR LIST
function addLI() {
	if (!inputHasText(liInput)) return;

	if (inputDoesNotAlreadyExist()) {
		createNewLIObj(liInput.value.trim());
		console.log(createNewLIObj(liInput.value.trim()));
		addToLIObjArr();
		updateObjPriorities(liObjArr);

		storeContentUpdateRules(liObjArr);
		appendNewLI(createLiFromTemplate(liInput.value.trim()));

		clearInput(liInput);
		openNewLI();
		observeIntersection();
	} else {
		alert(`${liInput.value.trim()} already exists`);
		liInput.focus();
		liInput.setSelectionRange(0, liInput.value.trim().length);
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

document.addEventListener("click", handleDisableSwitch);
function handleDisableSwitch(e) {
	if (!e.target.matches(".switch-input")) return;

	e.target.disabled = true;
	setTimeout(() => {
		e.target.disabled = false;
	}, 410);
}

document.addEventListener("click", disableLIChildTransitions);
function disableLIChildTransitions(e) {
	// GUARD CLAUSE
	if (!e.target.matches(".trash-button-span")) return;

	// maybe put these in closest{}
	const [caret, optionsContainer, redirectDiv] = closest
		.li(e)
		.querySelectorAll(".caret, .options-grid-container, .redirect-div");

	[optionsContainer, redirectDiv].forEach((elem) => {
		const currentMaxHeight = getCSSPropertyValue(elem, "max-height");

		setCSSProperty(elem, "max-height", currentMaxHeight);
		console.log(elem);
		setCSSProperty(elem, "transition", "none");
	});

	const currentCaretOrientation = getCSSPropertyValue(caret, "transform");
	setCSSProperty(caret, "transform", currentCaretOrientation);

	hintBrowser(closest.li(e));
	addClass(closest.li(e), "zero");
}

document.addEventListener("transitionend", removeLI);
function removeLI(e) {
	// if (!e.target.matches(".new-list-item.zero")) return;
	if (!e.target.matches(".zero")) return;
	console.log("DONE");
	console.log(e);
	console.log(e.target);

	spliceArrItem(liObjArr, namespace.liObjArrIndex(e));

	updateObjPriorities(liObjArr);
	storeContentUpdateRules(liObjArr);

	closest.li(e).remove();

	liInput.focus();

	// removeHint(closest.li(e));
}

function hintBrowser(elem) {
	elem.style.willChange = "margin-top";
	console.log(elem.style.willChange);
}
function removeHint(elem) {
	elem.style.willChange = "auto";
	console.log(elem.style.willChange);
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
		// should put guard clause (else) up here
		//IF URL IS VALID AND IT DOESN'T CONTAIN THE SEARCH WORD
		if (!urlInputIncludesBlockedWord(e)) {
			// SET RADIO & URL VALUES
			// should maybe not set these values if:
			// 		url already exists
			// 		then edit button is clicked
			// 		and submitted url is the same as it was
			setRadioValue(e)("redirect");
			setURLValue(e)(closest.redirectURL(e).value.trim());
			console.log(closest.redirectURL(e).value);
			console.log(closest.redirectURL(e).value.trim());
			console.log(liObjArr);

			// SET pURL TEXT CONTENT
			closest.pURL(e).textContent = closest.redirectURL(e).value.trim();

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
	// setRedirectURLFocus = duplicate
}

function urlInputIncludesBlockedWord(e) {
	return closest
		.redirectURL(e)
		.value.toLowerCase()
		.includes(closest.span(e).textContent.toLowerCase());
}

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

// SHOULD MAYBE USE PARAMETERS FOR THIS:
function addToLIObjArr() {
	liObjArr.push(createNewLIObj(liInput.value.trim()));
	console.log(liObjArr);
}

function clearInput(elem) {
	elem.value = "";
	elem.focus();
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

// SHOULD MAYBE PUT THESE IN IIFE
const gettingItem = new Promise((resolve) =>
	chrome.storage.sync.get(["objArr"], resolve)
);
gettingItem.then(onGot);

function restoreRedirectDivs(li) {
	li.querySelector(".rdc1").className = "rdc1 display-none";
	li.querySelector(".rdc2").className = "rdc2 redirect-div-content";
}

function storeContentUpdateRules(arr) {
	storeContent(arr);
	updateRules(arr);
}

window.addEventListener("load", observeIntersection);
