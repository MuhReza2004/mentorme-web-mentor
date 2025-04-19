// src/utils/getFcmToken.js
import { getToken, deleteToken } from "firebase/messaging";
import { messaging } from "../firebaseConfig"; // sesuaikan path

export const getFcmToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BOyTXv2Kg5mOAus7uLb932p0_K9mUsfBGJ4_VTSxmjDCG2WekKwD_sPTwdDpKrrGjYIRL-HisEVkhLiEi_O-V0U", // <-- ini ambil dari Firebase Console
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
  return null;
};

export const removeFcmToken = async () => {
  try {
    await deleteToken(messaging);
    console.log("FCM Token has been deleted.");
  } catch (error) {
    console.error("Error deleting FCM token: ", error);
  }
};

