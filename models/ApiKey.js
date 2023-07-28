const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ApiKeySchema = new mongoose.Schema({
    key: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});

ApiKeySchema.pre('save', function(next) {
    if (!this.isModified('key')) {
        return next();
    }

    this.key = bcrypt.hashSync(this.key, 8);
    next();
});

ApiKeySchema.methods.compareKey = function(plainKey, callback) {
    bcrypt.compare(plainKey, this.key, callback);
}

module.exports = mongoose.model('ApiKey', ApiKeySchema);
