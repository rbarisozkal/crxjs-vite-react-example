(() => {
    console.log('background.js');

    // @ts-ignore
    chrome.runtime.onMessageExternal.addListener(
        (request: any, sender: any, sendResponse: any) => {
            console.log('request', request);
            console.log('sender', sender);
        }
    );
})();