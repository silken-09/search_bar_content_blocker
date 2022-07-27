const listContainer = document.querySelector(".list-container");
const list = document.querySelector(".list");
const listItem = document.querySelector(".list-item");
const liContentContainer = document.querySelector(".li-content-container");
const liInput = document.querySelector(".li-input");
const plusBttn = document.querySelector(".plus-bttn");
const submitButton = document.querySelector(".submit-button");
let blockedContentArr = [];
let arrFromStorage;

//EVENT LISTENERS
liInput.addEventListener("input", handleInput);
plusBttn.addEventListener("click", handlePlusClick);
document.addEventListener("keydown", handleKeyPress);
submitButton.addEventListener("click", handleSubmit);
// liInput.addEventListener("input", handleDuplicate);
//EVENT LISTENERS



//EVENT HANDLERS
function handleInput(e) {
    console.log(liInput.value);
    if (liInput.value.length > 0) {
        // plusBttn.style.backgroundColor = "red";
        plusBttn.style.backgroundColor = "rgba(255, 255, 255, .33";
    } else {
        plusBttn.style.backgroundColor = "transparent";
    }
}

function handlePlusClick(e) {
   if (liInput.value.length > 0) {
        // checkIfExists();
        // console.log(checkIfExists());
        addToBlockedContentArr();
        createNewLI(liInput.value);
        clearInput();
        resetPlusBttnBG();
    }
}

function handleKeyPress(e) {
    if (liInput.value.length > 0) {
        if (e.key === "Enter") {
            addToBlockedContentArr();
            createNewLI(liInput.value);
            clearInput();
            resetPlusBttnBG();
        }
    }
}

function handleSubmit(e) {
    chrome.runtime.sendMessage(blockedContentArr);
    storeArr();
    popup();
    // updateRules();
    // getRules();
    alert("Content submitted");
}

//COME BACK TO LATER:

// function handleDuplicate(e) {
//     let ps = document.querySelectorAll("p");
//     console.log(`ps.length = ${ps.length}`);

//     for (let i = 0; i < ps.length; i++) {
//         if (liInput.value == ps[i].textContent) {
//             console.log("EXISTS");
//             // liInput.style.borderColor = "red";
//             // document.querySelector("input").style.border = "solid red 1px";
//             document.querySelector("input").style.color = "red";
//         } 
//         else {
//             document.querySelector("input").style.color = "fieldtext";
//         }
//     }
// }
//EVENT HANDLERS


// function checkIfExists() {
//     let ps = document.querySelectorAll("p");
//     console.log(`ps.length = ${ps.length}`);
    // ps.forEach(p => {
    //     if (liInput.value === p.textContent) {
    //         // e.preventDefault();
    //         console.log("Already exists");
    //         plusBttn.style.pointerEvents = "none";
    //         // return "Already exists";
    //     }
    // });
//     for (let i = 0; i < ps.length; i++) {
//         if (liInput.value == ps[i].textContent) {
//             console.log("EXISTS");
//         }
//     }
// }

function resetPlusBttnBG() {
    plusBttn.style.backgroundColor = "transparent";
}

function addToBlockedContentArr() {
    blockedContentArr.push(liInput.value);
    console.log(blockedContentArr);
}

function createNewLI(val) {
    let newLI = document.createElement("li");

	let newLiContentContainer = document.createElement("div");
	newLiContentContainer.className = "li-content-container";

	let newP = document.createElement("p");
	// newP.textContent = liInput.value;
	newP.textContent = val;

	let newDeleteButton = document.createElement("button");
    newDeleteButton.className = "delete-button";
    newDeleteButton.innerHTML = `<span class="material-symbols-outlined" style="font-size:24px;vertical-align:middle">close</span>`;

    newLI.append(newLiContentContainer);
    newLiContentContainer.append(newP, newDeleteButton);

    listItem.before(newLI);

    newDeleteButton.addEventListener("click", (e) => {
        newDeleteButton.closest("li").remove();
        blockedContentArr.splice(blockedContentArr.indexOf(newDeleteButton.previousElementSibling.textContent), 1);
        console.log(blockedContentArr);
        liInput.focus();
    });
}

function clearInput() {
    liInput.value = '';
    liInput.focus();
}

function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start", "variable": blockedContentArr});        
    });
}

function setItem() {
    console.log("Item set");
}

function onError(error) {
    console.log(error);
}

function storeArr() {
    localStorage.setItem("blockedContentArr", JSON.stringify(blockedContentArr));
    //MIGHT WANT TO CHANGE TO SYNC INSTEAD OF LOCAL
        //HAVE TO LEARN MORE ABOUT THIS
        //THE 'SERVICE WORKERS' TAB OF THE APPLICATION PANEL OF DEVTOOLS LOOKS LIKE IT COULD MAYBE BE USEFUL, IF YOU WANT TO LOOK INTO THAT
    chrome.storage.sync.set({"blockedContentArr": blockedContentArr}).then(setItem, onError);
}

function getArr() {
    // console.log(JSON.parse(localStorage.getItem("blockedContentArr")));
    // return JSON.parse(localStorage.getItem("blockedContentArr"));
    blockedContentArr = JSON.parse(localStorage.getItem("blockedContentArr"));
}

function restoreContent() {
    console.log(blockedContentArr.length);
    blockedContentArr.forEach(item => {
        createNewLI(item);
    });
}

//********************DECLARATIVE NET REQUEST********************

// function updateRules() {    //THIS IS WORKING
//     console.log(blockedContentArr);
//     blockedContentArr.forEach((domain, index) => {
//         console.log(index);
//         console.log(domain);
//         let id = index + 1;
    
//         chrome.declarativeNetRequest.updateDynamicRules({
//             addRules: [{
//                 "id": 1,
//                 "priority": 1,
//                 "action": { "type": "redirect", "redirect": { "url": "https://www.nba.com" } },
//                 "condition": { "urlFilter": domain, "resourceTypes": ["main_frame"] }
//             }], //DOMAIN = nfl.com
//             removeRuleIds: [1]
//         });
//     });
// }

// function getRules() {
//     chrome.declarativeNetRequest.getDynamicRules(
//         function(rules) {
//             console.log(rules);
//         }
//     );
// }

//********************DECLARATIVE NET REQUEST********************


let test1;

window.onload = function() {
    // blockedContentArr = getArr();
    // console.log(blockedContentArr);
    getArr();
    // popup();
    console.log(blockedContentArr);
    test1 = blockedContentArr.slice();
    console.log(test1);
    restoreContent();
}


// window.addEventListener("blur", disconnectPopupObserver);
// window.addEventListener("focus", reConnectPopupObserver);

// const popupConfig = {childList: true, subtree: false};   //MIGHT NOT WANT SUBTREE
// const popupCallback = function(popupMutationList, popupObserver) {
//     for (const mutation of popupMutationList) {
//         console.log(mutation);
//         if (mutation.type === 'childList') {
//             submitButton.style.backgroundColor = "red";

//         }
//     }
// }

// const popupObserver = new MutationObserver(popupCallback);
// popupObserver.observe(list, popupConfig);

// function disconnectPopupObserver(e) {
//     popupObserver.disconnect();
//     submitButton.style.backgroundColor = "transparent";
//     console.log("popupObserver disconnected");
// }

// function reConnectPopupObserver(e) {
//     popupObserver.observe(list, popupConfig);
//     submitButton.style.backgroundColor = "red";
//     console.log("popupObserver reconnected");
// }

// //DISCONNECT/RE-OBSERVE:
//     //MAYBE JUST USE BLUR/FOCUS EVENTS
//         //AND MAYBE ON SUBMIT