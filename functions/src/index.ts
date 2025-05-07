import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const helloWorld = functions.https.onCall(() => {
  return {message: "Hello from Firebase Functions!"};
});

