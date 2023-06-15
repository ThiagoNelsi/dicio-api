import mongoose from 'mongoose';
import IMeaning from '../../../interfaces/IMeaning';
import ISentence from '../../../interfaces/ISentence';
import IWordInfo from '../../../interfaces/IWordInfo';

interface IMeaningSchema extends Omit<IMeaning, 'class'> {
  partOfSpeech: string;
}

const MeaningsSchema = new mongoose.Schema<IMeaningSchema>({
  partOfSpeech: {
    type: String,
  },
  meanings: {
    type: [String],
  },
  etymology: {
    type: String,
  },
}, { _id: false });

const SentenceSchema = new mongoose.Schema<ISentence>({
  sentence: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
}, { _id: false });

const WordInfoSchema = new mongoose.Schema<IWordInfo>({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  meanings: [MeaningsSchema],
  sentences: [SentenceSchema],
  synonyms: [String],
  syllables: [String],
  rhymes: [String],
  url: String,
});

export default mongoose.model<IWordInfo>('WordInfo', WordInfoSchema);
