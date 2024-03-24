import {Schema, model} from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const contactSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
}, { versionKey: false });

contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact', contactSchema);

export default Contact;