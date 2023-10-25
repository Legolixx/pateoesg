import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";
import userInfoRouter from './routes/userInfo.js';
import storeMtrInfoRouter from './routes/mtrinfo.js';


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the `cors` middleware with the specific origin you want to allow.
const corsOptions = {
  
  origin: ['https://project-esg.vercel.app', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use("/api/auth/", authRouter);
app.use("/api/auth/", userInfoRouter);
app.use("/api/", storeMtrInfoRouter);



app.listen(3001, () => {
  console.log("http://localhost:3001");
});