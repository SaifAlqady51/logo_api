

export const convertFromBase64ToImage = async(data:any) => {
	//converting base64 into HTML image
	const realImage  = `data:image/${data?.img?.contentType.slice(-3)};base64,${data?.img?.data}`
	return realImage 
}
