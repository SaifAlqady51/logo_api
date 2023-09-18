import mongoose, {InferSchemaType} from "mongoose";

const ImageScheme = new mongoose.Schema({
	name:{type:String,unique:true},
	img:{
		data:String,
		contentType:String,
	}
})

type Image =  InferSchemaType<typeof ImageScheme>

export const ImageModel = mongoose.model<Image>("Image", ImageScheme)
