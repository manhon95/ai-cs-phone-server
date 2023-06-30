import express, { Request, Response } from "express";
import { request } from "http";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
const accountSid = "AC5ebcbf56bb7d8db152f8338b1f271293";
const authToken = "63b93b488742cab113a542bead3d725e";

const port = 8000;
const app = express();

let callSid: string | undefined = undefined;

app.use(express.urlencoded());

app.get("/", (request: Request, response: Response) => {
  return "server up";
});

app.post("/", (request: Request, response: Response) => {
  // console.log("headers:", request.headers);
  // console.log("body:", request.body);
  console.log("callSid:", request.body.CallSid);
  callSid = request.body.CallSid;

  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say("Hello. Please leave a message after the beep.");

  // Use <Record> to record the caller's message
  twiml.record({ action: "/replay" });

  // End the call with <Hangup>
  twiml.hangup();

  //   request.on("data", (chunk) => {
  //     console.log("data:", chunk);
  //     console.log("text:", chunk.toString());
  //   });
  //   request.on("end", () => {
  //     response.type("text/xml");
  //     response.send(twiml.toString());
  //   });

  // Render the response as XML in reply to the webhook request
  response.type("text/xml");
  response.send(twiml.toString());
});

app.post("/replay", async (request: Request, response: Response) => {
  console.log("body:", request.body);
  const recordingUrl = request.body.RecordingUrl;

  const twiml = new VoiceResponse();
  if (!recordingUrl) {
    twiml.say("Error please call again");
  } else {
    twiml.play(recordingUrl);
  }

  twiml.hangup();

  // console.log("headers:", request.headers);
  // console.log("body:", request.body);

  response.type("text/xml");
  response.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
