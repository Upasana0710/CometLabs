import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  loginAttempts: { 
    type: Number,
    default: 0
  },
  lockUntil: { 
    type: Date,
    default: null
  }
});

export default mongoose.model('User', userSchema);
