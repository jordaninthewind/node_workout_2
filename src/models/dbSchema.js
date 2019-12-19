import mongoose from 'mongoose';
import User from './model';

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
  },
  login: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
});

export default UserSchema;
