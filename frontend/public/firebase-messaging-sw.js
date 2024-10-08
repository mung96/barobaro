// Import Firebase App and Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// Firebase 구성 객체를 사용해 Firebase를 초기화합니다.
const firebaseConfig = {
    apiKey: "AIzaSyAXrfPPgJZ0a0Xcbdsv9oamFvFvIzcCJs0",
    authDomain: "barobaro-aa63c.firebaseapp.com",
    projectId: "barobaro-aa63c",
    storageBucket: "barobaro-aa63c.appspot.com",
    messagingSenderId: "435135981874",
    appId: "1:435135981874:web:5e8de150b29eef0bdf4f2b",

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const { title, body } = payload.notification;
    const options = {
        body: body,
        icon: '/images/icons/icon-96x96.png',
        badge: '/images/icons/icon-96x96.png'
    };
    self.registration.showNotification(title, options);
});
self.addEventListener("install", function (e) {
    console.log("fcm sw install..");
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    console.log("fcm sw activate..");
});

self.addEventListener("notificationclick", (event) => {
    const urlToOpen = new URL(`https://j11a401.p.ssafy.io/home`);

    event.waitUntil(
        clients
            .matchAll({
                type: "window",
                includeUncontrolled: true,
            })
            .then((windowClients) => {
                let foundWindowClient = null;

                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];

                    if (
                        (new URL(client.url).hostname.includes("ssafy")) &&
                        "focus" in client
                    ) {
                        foundWindowClient = client;
                        break;
                    }
                }

                if (foundWindowClient) {
                    return foundWindowClient.focus().then((focusedClient) => {
                        if ("navigate" in focusedClient) {
                            focusedClient.postMessage(urlToOpen.href);
                        }
                    })
                }
                else if (clients.openWindow) {
                    return clients.openWindow(urlToOpen.href);
                }
            })
    )
})
