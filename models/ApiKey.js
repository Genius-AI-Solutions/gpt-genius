const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ApiKeySchema = new mongoose.Schema({
    key: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date }, // Optional expiration date
    associatedUserID: { type: String }, // ID of associated user or account
    permissions: { type: String }, // Permissions or role, e.g. "read-only"
    usageLimits: { type: Number }, // Optional request limit
    usageStatistics: { type: Number, default: 0 }, // Track the number of requests
    ipWhitelist: [{ type: String }], // List of allowed IPs
    environment: { type: String }, // e.g., "development", "production"
    projectID: { type: String }, // ID of associated project or application
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
