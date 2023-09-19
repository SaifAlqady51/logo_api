import { ImageModel } from "./ImageScheme";
import { ImageDataType } from "../interfaces/ImageData";
import mongodb from 'mongodb'

export const findImageByName = async (client:mongodb.MongoClient, nameList:any)  => {
	try{
		await client.connect()
		await client.db('admin').command({ ping: 1 });
		console.log(
			'Pinged your deployment. You successfully connected to MongoDB!'
		);
		// create image variable that takes the value of that image in the database
		const image = await client.db("test").collection("images").findOne({name:nameList})
		// return base64 from mongoose database
		return image
	}catch(error){
		console.log('Error: '+ error)
	}finally{
		await client.close()
	}

}

