// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import "./popup.css";
export const Popup = () => {
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const aboutRef = useRef<HTMLTextAreaElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  async function sendDataToWebApp() {
    const formData = {
      fullName: fullNameRef.current.value,
      username: usernameRef.current.value,
      about: aboutRef.current.value,
      country: countryRef.current.value,
    };
    // Send a message to the content script of a specific tab
    chrome.tabs.query({ url: "http://localhost:3000/*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: (data) => {
            window.postMessage(
              {
                fromExtension: true,
                message: "Form data received from extension:",
                formData: data,
              },
              "*"
            );
          },
          args: [formData], // Pass the form data to the content script
        });
      });
    });
  }
  useEffect(() => {
    chrome.storage.local.get(["data"], (result) => {
      const formData = result.data;
      if (formData) {
        if (fullNameRef.current) fullNameRef.current.value = formData.fullName;
        if (usernameRef.current) usernameRef.current.value = formData.username;
        if (aboutRef.current) aboutRef.current.value = formData.about;
        if (countryRef.current) countryRef.current.value = formData.country;
      }
    });
  });
  return (
    <>
      <div className="popup">
        <div className="flex min-h-full flex-1 flex-col justify-start px-12 py-4 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    ref={usernameRef}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="firstLastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  first and last name
                </label>
                <div className="mt-2">
                  <input
                    id="firstLastName"
                    name="firstLastName"
                    ref={fullNameRef}
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  country
                </label>
                <div className="mt-2">
                  <input
                    id="country"
                    name="country"
                    type="text"
                    ref={countryRef}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    about
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    ref={aboutRef}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={sendDataToWebApp}
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
