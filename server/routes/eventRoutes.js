const express = require('express');
const { getEvents, createEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All routes are protected

router.route('/')
    .get(getEvents)
    .post(createEvent);

router.route('/:id')
    .delete(deleteEvent);

module.exports = router;