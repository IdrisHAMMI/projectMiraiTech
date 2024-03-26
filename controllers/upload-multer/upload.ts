import multer from 'multer';
import path from 'path';

//MULTER FILE UPLOAD LIBRARY

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('src/assets/upload'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
export const upload = multer({ storage })

