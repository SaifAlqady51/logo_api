import express,{Request,Response} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import fs from 'fs'

import * as middlewares from "./middleware/middlewares";
import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";
import {ImageModel} from './database/ImageScheme'
import getImage from "./middleware/getImage";

require("dotenv").config();

// creating express app
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors(
	{origin:"*"}
));
app.use(express.json());

// create a list of all files in images folder
// const files = fs.readdirSync('images')
const uri = "mongodb+srv://SaifAlqady:<password>@cluster0.u9fesc1.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
// connecting mongodb atlas
// const MONGO_URL = `${process.env.DATABASE_URL}` as string
// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL).then(() => console.log("connected successfully"));
// mongoose.connection.on("error", (error: Error) => console.log(error));


app.use("/api", api);

app.get<{}, MessageResponse>("/", (req, res) => {
	res.json({
		message: "main page",
	});
});

// post request to upload images from images folder to mongodb atlas database
// app.post('/upload', (req: express.Request, res: express.Response) => {
//   for (const file of files ) {
//     const saveImage = new ImageModel({
//       name: file.slice(0, 2),
//       img: {
//         data: fs.readFileSync(`images/${file}`).toString('base64'),
//         contentType: `image/${file.slice(-3)}`,
//       },
//     });
//     saveImage
//       .save()
//       .then(() => console.log('image is saved'))
//       .catch((error: Error) => console.log(error));
//   }
//   res.send('done');
// });

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

export default app;
