const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {checkAuth} = require('../authMiddleware');

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix+file.originalname)
    }
});

const upload = multer({ storage: storage});


router.get('/', checkAuth, userController.get_users);
router.put('/update/bio', checkAuth, userController.update_bio);
router.post('/upload', checkAuth, upload.single('file'), userController.upload_profile_picture);
router.post('/followUser', checkAuth, userController.send_follow_request);
router.post('/respondToRequest', checkAuth, userController.respond_to_follow_request);

// Error handling middleware for Multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle Multer errors (e.g., file size exceeded, invalid file type)
        res.status(400).json({ error: 'Multer error: ' + err.message });
    } else {
        // Pass the error to the next middleware function
        next(err);
    }
});


module.exports = router;