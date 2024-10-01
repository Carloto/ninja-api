import * as mongoose from 'mongoose';

export const NinjaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weapon: { type: String, required: true },
});

export interface Ninja extends mongoose.Document {
  id: string;
  name: string;
  weapon: string;
}
