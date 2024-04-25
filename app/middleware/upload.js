import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') //** file upload location
    },
    filename: function (req, file, cb) {
        let extention = path.extname(file.originalname); //** getting the extention from the file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) //** creating a unique number
        cb(null, file.fieldname + '-' + uniqueSuffix + extention) //** setting a unique name to file
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        //** file validation extention acceptable types
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            callback(null, true);
        } else {
            callback(null, false);
            callback(new Error('Only png, jpg & jpeg file support!'))
        }
    }
});

export default upload