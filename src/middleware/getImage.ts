import { Request, Response } from 'express';
import { convertFromBase64ToImage } from '../database/convertFromBase64ToImage';
import { findImageByName } from '../database/findImageByName';

// middleware to return image to the user when set filename to ICAO code
async function getImage(
  req: Request,
  res: Response,
  next: () => void
): Promise<unknown> {
  if (req.query.filename) {
    const checkIfExiste = await findImageByName(req.query.filename);

    if (checkIfExiste) {
      const realImage = await convertFromBase64ToImage(req.query.filename);
      return res.json({ img: realImage });
    } else {
      const whiteImage = await convertFromBase64ToImage('whi');
      res.json({ img: whiteImage });
    }
  } else {
    res.json({ error: 'make sure to enter valid url /api?filename={IATA code}' });
  }
  next();
}
export default getImage;
