import express,{Request,Response} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import fs from 'fs'


import * as middlewares from "./middleware/middlewares";
import { run } from "./database/mongodb_connecting";
import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";
import {ImageModel} from './database/ImageScheme'
import getImage from "./middleware/getImage";
import {ImageDataType} from "./interfaces/ImageData";

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
const files = fs.readdirSync('images')

run().then(() => console.log('connected')).catch(console.dir);

// connecting mongodb atlas
// const MONGO_URL = `${process.env.DATABASE_URL}` as string
// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL).then(() => console.log("connected successfully"));
// mongoose.connection.on("error", (error: Error) => console.log(error));

app.get('/getData',async (_req:Request,res:Response) => {

	const image:any = await ImageModel.find({name: "JL"})	
	console.log(image[0].name)
	res.json(image[0])
})

app.use("/api", api);

app.get<{}, MessageResponse>("/", (req, res) => {
	res.json({
		message: "main page",
	});
});

// post request to upload images from images folder to mongodb atlas database
// app.post('/upload', (req: express.Request, res: express.Response) => {
//   for (const file of files ) {
//  const    const saveImage = new ImageModel({
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
