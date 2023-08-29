//@ts-nocheck
(() => {
    console.log('content.js');
    if (chrome.runtime) {
        console.log('chrome.runtime is available');
    } else {
        console.log('chrome.runtime is not available');
    }
    //@ts-ignore
    chrome.runtime.onMessage.addListener((message) => {
        console.log(message)
        if (message.type === 'form-data') {
            // Update the form fields on the web page using DOM manipulation
            // For example:
            //const fullNameInput = document.getElementById('firstLastName') as HTMLInputElement;
            const usernameInput = document.getElementById('username') as HTMLInputElement;
            const aboutTextarea = document.getElementById('about') as HTMLTextAreaElement;
            const countrySelect = document.getElementById('country') as HTMLSelectElement;

            //fullNameInput.value = message.data.fullName;
            usernameInput.value = message.data.username;
            aboutTextarea.value = message.data.about;
            countrySelect.value = message.data.country;
        }
    });

})();
