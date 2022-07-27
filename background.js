let resp;

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    console.log("GOT IT");
    console.log(response);
    resp = response;

    chrome.storage.sync.set({resp});
});

