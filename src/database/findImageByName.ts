import { ImageModel } from "./ImageScheme";
import { ImageDataType } from "../interfaces/ImageData";

export const findImageByName = async(name:any)  => {
	// create image variable that takes the value of that image in the database
	const image: ImageDataType[] = await ImageModel.find({"name": name})
	// return base64 from mongoose database
	return image[0].img
}

