import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

import { ENV } from "./env.js";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", 
      
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
       
      ],
    }),
 
    slidingWindow({
      mode: "LIVE", 
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;
