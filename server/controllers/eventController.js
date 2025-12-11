const Event = require('../models/Event');

// @desc    Get all events for the consultancy
// @route   GET /api/events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ consultancy: req.user.consultancyId });
        res.status(200).json({ success: true, data: events });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Create a new event
// @route   POST /api/events
exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create({
            ...req.body,
            consultancy: req.user.consultancyId,
            createdBy: req.user._id
        });
        res.status(201).json({ success: true, data: event });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        // Ensure user belongs to the same consultancy
        if (event.consultancy.toString() !== req.user.consultancyId.toString()) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await event.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};