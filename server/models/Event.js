const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    consultancy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultancy',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add an event title']
    },
    start: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    end: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    type: {
        type: String,
        enum: ['exam', 'holiday', 'class', 'meeting', 'deadline', 'other'],
        default: 'other'
    },
    description: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);