import multer from 'multer';

export const storage = multer.diskStorage({
    destination: 'dist/public/images',
    filename: (req, file, cb) => {
        const filename = file.originalname;
        cb(null, filename);
    }
});