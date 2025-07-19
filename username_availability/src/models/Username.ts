import mongoose from 'mongoose';

const usernameSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  }
}, {
  timestamps: true
});

const Username = mongoose.models.Username || mongoose.model('Username', usernameSchema);

export default Username; 