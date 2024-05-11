import multer from 'multer';
import path from 'path';

//MULTER FILE UPLOAD MIDDLEWARE

//DEFINES FILE STORAGE & FILE NAMEING STRUCTURE
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('src/assets/upload'));
    },
    filename: function (req, file, cb) {
      cb(null, 'upload_' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
       cb(null, true);
    } else {
       cb(new Error('INVALID_FILE_TYPE'));
    }
   };

export const upload = multer({ storage, fileFilter })


