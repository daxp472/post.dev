import admin from "firebase-admin";
import serviceAccount from "../config/firebaseConfig.js"; 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const sendNotification = async (userId, title, body) => {
    const message = {
        notification: { title, body },
        topic: userId.toString() // User-specific topic
    };

    try {
        await admin.messaging().send(message);
        console.log("Notification sent to:", userId);
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};