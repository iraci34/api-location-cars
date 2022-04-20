import { Schema, model } from 'mongoose';

const CarSchema = new Schema(
  {
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

CarSchema.virtual('thumbnail_url').get(function () {
  return `http://localhost:3332/files/${this.thumbnail}`;
});

export default model('Car', CarSchema);