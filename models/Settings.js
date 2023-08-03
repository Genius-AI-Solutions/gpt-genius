const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    users: { type: Number, required: true, default: 0 },
    totalApiKeys: { type: Number, required: true, default: 0 },
    totalRequests: { type: Number, required: true, default: 0 },
    activeDataPoints: { type: Number, required: true, default: 0 },
    uptimePercentage: { type: Number, required: true, default: 0 },
    averageResponseTime: { type: Number, required: true, default: 0 },
    featuredClients: [{ type: String, required: true, default: [] }],
    securityCompliance: { type: String, required: true, default: 'Not Specified' },
    regionAvailability: [{ type: String, required: true, default: [] }],
    supportedLanguages: [{ type: String, required: true, default: [] }],
    communityLinks: [{ type: String, required: true, default: [] }],
    testimonials: [{ type: String, required: true, default: [] }],
    demoUrl: { type: String, required: true, default: 'Not Specified' },
    updateFrequency: { type: String, required: true, default: 'Not Specified' },
    integrationGuidesUrl: { type: String, required: true, default: 'Not Specified' },
});


module.exports = mongoose.model('Settings', SettingsSchema);
