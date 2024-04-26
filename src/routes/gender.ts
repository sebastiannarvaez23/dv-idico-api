import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { getGenders, getGender, createGender, editGender, deleteGender } from "../controllers/genders";

const storage = multer.diskStorage({
    destination: 'dist/public/images',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = uniqueSuffix + ext;
        cb(null, filename);
    }
});

const upload = multer({ storage });
const router = Router();

router.get('/', getGenders);
router.get('/:id', getGender);
router.post('/', upload.single('image'), createGender);
router.put('/:id', editGender);
router.delete('/:id', deleteGender);

export default router;