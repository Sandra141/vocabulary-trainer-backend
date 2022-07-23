import express from "express";
import morgan from "morgan"
import cors from "cors";
import "dotenv/config";
import "./extends/consoleLog.js"

import auth from './routes/auth.js'

import connectToMongo from "./connections/mongo.js";

// early exit when environment variables are not set
if (!process.env.PORT) {
  console.log("please provide PORT number and try again");
  process.exit();
}

if (!process.env.SECRET) {
  console.log("please provide SECRET and try again");
  process.exit();
}

if (!process.env.DB_URI) {
  console.log("please provide DB_URI for Mongo and try again");
  process.exit();
}

////////////////////////////////////////
////////// mongoose connection
////////////////////////////////////////
connectToMongo().then((connection) => {
  ////////////////////////////////////////
  ////////// express
  ////////////////////////////////////////
  const app = express();
  ////////////////////////////////////////
  ////////// middleware
  ////////////////////////////////////////
  // morgan - a common package for logging API request information
  app.use(morgan('dev'))
  // CORS - allows us to send requests from different webpages 
  // on different domains. if our frontend is on 3000 and our backend is on 8080
  // we need to enable CORS so the frontend can send requests to our backend
  app.use(cors({
    origin: "http://localhost:3000" // or your netlify domain
  }))
  // express.json - allows us to read the JSON body of a request
  // and store it in req.body
  app.use(express.json())
  // express.static - allows us to serve static files ( in this case from public folder )
  // this is how websites load their own CSS, JS, images etc. from a static public foler in the server. 
  app.use(express.static('public'))
  // new request print some stuff to help me dev
  app.use((req, res, next) => {
    console.log("NEW REQUEST")
    next()
  })
  ////////////////////////////////////////
  ////////// routes
  ////////////////////////////////////////
  app.use("/auth", auth);
  // app.use("/messages", messagesRouter);
  // 404
  app.use((req, res, next) => {
    console.log("404")
    res.status(404).send("---------- 404, you failed!")
    next()
  })
  ////////////////////////////////////////
  ////////// listen
  ////////////////////////////////////////
  app.listen(process.env.PORT, () =>
    console.log("listening on " + process.env.PORT)
  );
});
