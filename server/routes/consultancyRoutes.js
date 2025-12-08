const express = require('express');
const { createConsultancy, getConsultancies } = require('../controllers/consultancyController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected and restricted to Super Admin
router.use(protect);
router.use(authorize('super_admin'));

router.route('/')
    .get(getConsultancies)
    .post(createConsultancy);

module.exports = router;