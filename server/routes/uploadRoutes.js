const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const fs = require('fs');

const router = express.Router();

// Configure Multer (Temporary storage)
const upload = multer({ dest: 'uploads/' });

// @desc    Upload an image/file to Cloudinary
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'japan-visa-saas/documents', // Organize files in a folder
      resource_type: 'auto', // Auto-detect (image, pdf, etc.)
    });

    // Remove file from local 'uploads' folder after successful upload
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error) {
    console.error(error);
    // Clean up local file if upload fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

module.exports = router;