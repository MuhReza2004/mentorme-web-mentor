/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDUWdYOWbyKdl8TUsRIIw1pwt8AQXzT6LY",
  authDomain: "mentorme-aaa37.firebaseapp.com",
  projectId: "mentorme-aaa37",
  storageBucket: "mentorme-aaa37.appspot.com",
  messagingSenderId: "131671305259",
  appId: "1:131671305259:web:d03a9db47d68e0c3618e6e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png', // ganti dengan icon notifikasi jika ada
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
