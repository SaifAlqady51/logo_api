import { Types } from "mongoose";

export interface ImageDataType {
	id?:Types.ObjectId,
	name:string,
	img:{
		data:string
		contentType:string
	}

}
