const Multer = require('multer');
const FirebaseStorage = require('multer-firebase-sharp');
const serviceAccount = require('./../rituparna-a-firebase');

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
        file.originalname = Date.now() + '_' + file.originalname + '.png';
      },
    },
  }),
});

module.exports = multer;
