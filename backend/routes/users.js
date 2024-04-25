const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {checkAuth} = require('../authMiddleware');

const multer  = require('multer')
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

let upload;

if (process.env.NODE_ENV === 'production') {
    //Configure AWS
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET,
            acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
            },
            key: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, uniqueSuffix + '-' + file.originalname);
            }
        })
    });
} else {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix+file.originalname)
        }
    });
    upload = multer({ storage: storage});
}





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