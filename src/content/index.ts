(() => {
    console.log('content.js');

    // @ts-ignore
    // content.ts
    // content.ts
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(request, sender, sendResponse)
        if (request.type === "form-data") {
            const { fullName, username, about, country } = request.data;
            const usernameInput = document.getElementById("username") as HTMLInputElement;
            if (usernameInput) {
                usernameInput.value = username;
            }
        }
    });
})();