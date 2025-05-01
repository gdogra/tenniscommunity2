import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

const app = express();

// allow any origin — or lock down to your domains if you prefer
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("Hello from Firebase!");
});

export const helloWorld = functions.https.onRequest(app);

