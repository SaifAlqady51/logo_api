
import { findImageByName } from "./findImageByName"

export const convertFromBase64ToImage = async(name:any) => {
	// importing base64 from mongoose database
	const base64 = await findImageByName(name)
	//converting base64 into HTML image
	const realImage  = `data:image/${base64?.contentType?.slice(-3)};base64,${base64?.data}`
	return realImage
}
