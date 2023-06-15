import { Response, Request } from 'express';
import getWordInfo from '../../data/getWordInfo';

export default async function rhymesController(req: Request, res: Response) {
  const { word } = req.params;
  try {
    const { rhymes } = await getWordInfo(word);
    res.json(rhymes);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
