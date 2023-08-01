const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String }, // Define the role field here
    isActive: { type: Boolean, default: true },
    dateOfBirth: { type: Date },
    // Add other fields as needed
});


// Hash the password before saving it to the database
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = function(plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback);
}

module.exports = mongoose.model('User', UserSchema);
