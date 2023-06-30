// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC5ebcbf56bb7d8db152f8338b1f271293";
const authToken = "63b93b488742cab113a542bead3d725e";
const client = require("twilio")(accountSid, authToken);

client.calls.each((call: any) => console.log(call));
