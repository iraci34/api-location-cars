import { Schema, model } from  'mongoose';

const LocationSchema = new Schema({
  date_in: Date,
  date_out: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car'
  }
});

export default model('Location', LocationSchema);