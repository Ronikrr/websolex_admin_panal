import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAMZM5kB45DgdgHsiGTuVuOrT3nR3p-3v4",
    authDomain: "websolex-1f49b.firebaseapp.com",
    projectId: "websolex-1f49b",
    storageBucket: "websolex-1f49b.firebasestorage.app",
    messagingSenderId: "238981437575",
    appId: "1:238981437575:web:e4e6b1429733f395cdc022",
    measurementId: "G-S35TC14BLK"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request user permission and get token
const requestPermission = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: "your-vapid-key",
        });
        console.log("FCM Token:", token);
        // Send this token to your server for sending notifications
    } catch (error) {
        console.error("Permission denied or error:", error);
    }
};

// Listen for messages
onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
});
