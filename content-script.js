let testRE;
let myInputs;

//WHEN SUBMIT IS PRESSED, THIS UPDATES THE VALUE OF TESTRE
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            console.log(request.variable);
            testRE = createTestRE(request.variable);
            console.log(testRE);
            console.log(testRE.toString().length);
            console.log(testRE.test(testRE.toString()));
            console.log("ok");
            
        }
    }
);

// `DON'T KNOW IF YOU CAN AVOID USING MESSAGING (OR IF YOU SHOULD EVEN WANT TO), BUT MIGHT BE ABLE TO SYNC/STORE (SET) FROM POPUP.JS ON SUBMIT AND THEN USE STORAGE ONCHANGED EVENT TO (GET) ON THIS PAGE.`

// WHY THE ERROR IS OCCURRING: 
    //IF I TEST ON [GOOGLE.COM], THEN MODIFY MY CODE, SAVE IT, AND REFRESH THE EXTENSION--BUT I DON'T RELOAD THE [GOOGLE.COM] PAGE I WAS TESTING ON, IT WILL THROW AN ERROR.
    //NOT SURE IF THIS IS SOMETHING TO BE CONCERNED ABOUT.
        //I GUESS MAYBE NOT BECAUSE THE USER WILL NOT BE CHANGING THE CODE AT ALL.
    //AS LONG AS YOU REFRESH THE WEBPAGE YOU'RE WORKING ON AFTER MODIFYING YOUR CODE, I DON'T THINK IT SHOULD BE AN ISSUE.
    //(THINK IT EVEN HAPPENS IF I JUST WRITE A COMMENT) (FYI).


function handleFocus(e) {
    console.log(e)
    console.log(e.target)
    console.log(document.activeElement.tagName);
    console.log(document.activeElement.tagName === "INPUT");

    inputSetup();
}

window.onload = function() {
    //DON'T KNOW IF YOU WANT 'myInputs' AND THE LIKE TO BE WINDOW.ONLOAD.
        //IT COULD MAYBE EXECUTE QUICKER IF IT WERE OUTSIDE OF WINDOW.ONLOAD.
    //ALSO, IT MIGHT BE WISER/FASTER TO USE THE TABS OR WEBREQUEST API.
        //MIGHT BE ABLE TO BLOCK/REDIRECT SOONER.
        //SEEMS LIKE I'D BE ABLE TO INTERCEPT THE REQUEST RATHER THAN WAIT FOR IT TO COMPLETE AND THEN REDIRECT.
        
    // ------------------------------------------------
    myInputs = document.querySelectorAll("input[type='search'], input[type='text']");
    console.log(myInputs);
    myInputs.forEach(i => {
        // console.log(i.value);
        i.addEventListener("focus", handleFocus);
    });
    // ------------------------------------------------

    console.log(`activeElement: ${document.activeElement.tagName}`);
    chrome.storage.sync.get("resp", function(items) {
        testRE = createTestRE(items.resp);
        console.log(testRE);

        // ------------------------------------------------
        myInputs.forEach(i => {
            console.log(i.value);
            if (testRE.test('/(?:)/i') === false) {
                if (testRE.test(i.value)) {
                    location.replace(location.origin);
                }
            }
        });
        //COULD ALSO PROBABLY PUT THIS IN THE FIRST FOREACH FUNCTION
        // ------------------------------------------------

        if (document.activeElement.tagName !== 'INPUT') {
            document.addEventListener("click", () => {
                inputSetup()
            });
        } else {
            inputSetup();
        }

    });

    
}

function createTestRE(arr) {
    return new RegExp(`${arr.join('|')}`, 'i');

    // let str = "s*t,r-i*n.g";
    // let splitStr = str.split('');
    // console.log(splitStr);

    // for (let i = 0; i < splitStr.length; i++) {
    //     if (splitStr[i] === '*') {
    //     splitStr.splice(i, 1, '\\*');      
    //     }
    // }

    // console.log(splitStr);

    // let splitStrJoined = splitStr.join('\\W*');
    // let re = new RegExp(`${splitStrJoined}`, 'i');
    // console.log(re);
    // console.log(re.test(str));  //returned true


    // ^^^ THIS IS FOR IF YOU WANT TO ACCOUNT FOR EXTRA CHARACTERS BETWEEN LETTERS.
        //THINK I'LL HAVE TO ALTER LINE 71 SO THAT IT CAN WORK FOR OTHER CHARACTERS BESIDES '*', BUT SHOULDN'T BE TOO DIFFICULT TO MAKE WORK.
}

function inputSetup() {
    console.log(document.activeElement);
    if (document.activeElement.tagName === 'INPUT') {
        if (document.activeElement.type === 'text' || document.activeElement.type === 'search') {
            document.activeElement.addEventListener("input", clearInput);
        }
    }
}

function clearInput(e) {
    if (testRE.test('/(?:)/i') === false) {
        if (testRE.test(document.activeElement.value)) {    
            document.activeElement.value = '';
            location.reload();
        }
    }
}