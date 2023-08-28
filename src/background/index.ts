// @ts-nocheck
(() => {
    console.log('background.js');

    // @ts-ignore
    chrome.runtime.onMessageExternal.addListener(
        (request: any, sender: any, sendResponse: any) => {
            console.log('request', request);
            console.log('sender', sender);

            switch (request.type) {
                case 'form-data':
                    chrome.runtime.openOptionsPage(() => {
                        chrome.storage.local.set({ formData: request.data }, () => {
                            console.log('Data stored and options page opened.');
                        });
                    });
                    // @ts-ignore
                    let url = new URL(chrome.runtime.getURL('src/popup/index.html?message=form'));


                    url.searchParams.append('fullName', request.data.fullNama);
                    url.searchParams.append('username', request.data.username);
                    url.searchParams.append('country', request.data.country);

                    // TODO: support tags


                    // the popup window size
                    let width = 320;
                    let height = 500;

                    // @ts-ignore
                    chrome.windows.getCurrent((win: any) => {
                        // @ts-ignore
                        chrome.windows.create({
                            url: url.href,
                            type: 'popup',
                            focused: true,
                            width: width,
                            height: height,
                            // positioned top-right
                            top: win.top + 75,
                            left: win.left + win.width - width,
                        });
                    });


                    break;
                case 'get_secret':
                    console.log('get_secret');
                    break;
                default:
                    console.log("undefined type")
                    break;
            }
        }
    );
    // chrome.runtime.onMessageExternal.addListener(
    //     (request: any, sender: any, sendResponse: any) => {
    //         console.log('request', request);
    //         // @ts-ignore
    //         chrome.runtime.sendMessage(request)
    //     }
    // );
})();