import mongoose from 'mongoose';
import IWordInfo from '../../interfaces/IWordInfo';
import IDatabase from '../../interfaces/IDatabase';
import WordInfo from './models/WordInfo';
import log from '../../utils/logger';

class MongoDB implements IDatabase {
  async connect() {
    const {
      MONGO_URL,
      MONGO_DB_NAME,
      MONGO_INITDB_ROOT_USERNAME: MONGO_USER,
      MONGO_INITDB_ROOT_PASSWORD: MONGO_PASSWORD,
    } = process.env;

    const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`;

    await mongoose.connect(url, {
      w: 'majority',
      retryWrites: true,
      dbName: MONGO_DB_NAME,
      serverSelectionTimeoutMS: 5000,
    });
  }

  async get(word: string) {
    try {
      // Verify if database is connected.
      // 0 = disconnected
      // 1 = connected
      // 2 = connecting
      // 3 = disconnecting
      // 99 = uninitialized
      if (mongoose.connection.readyState === 1) {
        const wordInfo = await WordInfo
          .findOne({ word })
          .lean();

        if (!wordInfo) return undefined;

        return {
          word: wordInfo.word,
          url: wordInfo.url,
          synonyms: wordInfo.synonyms,
          meanings: wordInfo.meanings,
          sentences: wordInfo.sentences,
          syllables: wordInfo.syllables,
          rhymes: wordInfo.rhymes,
        };
      }
      return undefined;
    } catch (err) {
      log(err);
      return undefined;
    }
  }

  insert(wordInfo: IWordInfo) {
    if (mongoose.connection.readyState === 1) {
      WordInfo.create(wordInfo).catch(log);
    }
  }
}

export default new MongoDB();
