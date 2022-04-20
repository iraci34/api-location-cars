import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  birthday: Date,
});

export default model('User', UserSchema);