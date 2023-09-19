import { Request, Response } from 'express';
import { convertFromBase64ToImage } from '../database/convertFromBase64ToImage';
import { findImageByName } from '../database/findImageByName';
import { client } from '../database/mongodb_connecting';
// middleware to return image to the user when set filename to ICAO code
async function getImage(
	req: Request,
	res: Response,
	next: () => void
): Promise<unknown> {
	if (req.query.filename) {
		const checkIfExiste = await findImageByName(client, req.query.filename);

		if (checkIfExiste?._id) {
			const realImage = await convertFromBase64ToImage(checkIfExiste);
			return res.json({ img: realImage });
		} else {
			const findWhiteImage = await findImageByName(client,'whi')
			const whiteImage = await convertFromBase64ToImage(findWhiteImage);
			res.json({ img: whiteImage });
		}
	} else {
		res.json({
			error: 'make sure to enter valid url /api?filename={IATA code}',
		});
	}
	next();
}
export default getImage;
