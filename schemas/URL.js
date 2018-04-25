const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const Schema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    original_url: {
        type: String,
        required: true,
        unique: true
    },
    short_url: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('URL', Schema);