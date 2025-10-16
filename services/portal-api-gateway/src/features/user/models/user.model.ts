import mongoose from 'mongoose';
import Joi from 'joi';
const isVietnamesePhoneNumber = (number: string) => {
  const regex = /^(?:\+84|0084|0)(?:[235789])\d{8}$/;
  return regex.test(number);
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    enum: ['user', 'admin'],
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email: string) => {
        return Joi.string().email().validate(email);
      },
      message: 'Invalid email'
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (phone: string) => {
        return isVietnamesePhoneNumber(phone);
      },
      message: 'Invalid phone'
    }
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password: string) => {
        return Joi.string().min(8).validate(password);
      },
      message: 'Invalid password'
    }
  },
  isReset: {
    type: Boolean,
    default: false
  }
});
const User = mongoose.model('User', userSchema);

export default User;
