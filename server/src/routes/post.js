const express = require('express');
const Multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage');

const { createPost, getAllPostsByUsername, getImageById } = require('../controllers/post');
const auth = require('./../middlewares/auth');
const serviceAccount = require('./../rituparna-a-firebase');

const router = express.Router();

const firebaseBucketPath = 'gs://rituparna-a.appspot.com';

const multer = Multer({
  storage: FirebaseStorage({
    bucketName: firebaseBucketPath,
    credentials: {
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
      projectId: serviceAccount.project_id,
    },
    public: true,
    unique: true,
    directoryPath: 'eligram/uploads/photos',
    hooks: {
      beforeUpload(req, file) {
        file.originalname = file.originalname.replace(/ /g, '_');
        file.originalname = Date.now() + '_' + file.originalname;
      },
    },
  }),
});

router.post('/', auth(), multer.array('photos', 5), createPost);

router.get('/u/:username', getAllPostsByUsername);

router.get('/images/:id', getImageById);

module.exports = router;
