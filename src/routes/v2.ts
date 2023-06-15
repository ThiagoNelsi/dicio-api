import { Router } from 'express';
import meanings from '../controllers/v2/meanings';
import syllables from '../controllers/v2/syllables';
import synonyms from '../controllers/v2/synonyms';
import sentences from '../controllers/v2/sentences';
import rhymes from '../controllers/v2/rhymes';

export default function v2Routes(router: Router) {
  router.get('/v2/:word', meanings);

  // routes in portuguese and english using the pattern :var(pt|en)
  router.get('/v2/:var(significados|meanings)/:word', meanings);
  router.get('/v2/:var(sinonimos|synonyms)/:word', synonyms);
  router.get('/v2/:var(silabas|syllables)/:word', syllables);
  router.get('/v2/:var(frases|sentences)/:word', sentences);
  router.get('/v2/:var(rimas|rhymes)/:word', rhymes);

  return router;
}
