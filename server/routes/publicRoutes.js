const express = require('express');
const { getPublicConsultancyInfo, submitInquiry } = require('../controllers/publicController');

const router = express.Router();

// No 'protect' middleware here - these are public!
router.get('/consultancy/:id', getPublicConsultancyInfo);
router.post('/inquiry', submitInquiry);

module.exports = router;