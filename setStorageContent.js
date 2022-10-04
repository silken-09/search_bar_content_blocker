function storeContent(objArr) {
	chrome.storage.sync.set({ objArr: objArr }, function () {
		console.log("objArr value is set to " + JSON.stringify(objArr));
	});
}

export { storeContent };
