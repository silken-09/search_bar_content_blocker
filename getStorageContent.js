import { createLiFromTemplate } from "./createLIFromTemplate.js";
import { addClass } from "./addRemoveClass.js";
import { appendNewLI } from "./onAddNewLI.js";
import { updateObjPriorities } from "./priorities.js";
import { updateRules } from "./rules2.js";

/* 
restoreList:
    createLiFromTemplate
    restoreRedirectDivs
    addClass
    appendNewLI

    (4)

restoreRedirectDivs
    (0)

restoreContent
    restoreList
    updateObjPriorities(arr);
    updateRules(arr);

    (3)

*/

function restoreList(arr) {
	arr.forEach((obj) => {
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
}
function restoreRedirectDivs(li) {
	li.querySelector(".rdc1").className = "rdc1 display-none";
	li.querySelector(".rdc2").className = "rdc2 redirect-div-content";
}
function restoreContent(arr) {
	const gettingItem = new Promise((resolve) =>
		chrome.storage.sync.get(["objArr"], resolve)
	);
	gettingItem
		.then((item) => {
			item.objArr.map((obj) => arr.push(obj));
			restoreList(arr);
			return arr;
		})
		.then((arr) => {
			updateObjPriorities(arr);
			updateRules(arr);
		});
}
// restoreContent(liObjArr);

// export { restoreContent };
