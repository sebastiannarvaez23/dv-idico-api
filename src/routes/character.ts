import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { getCharacters, getCharacter, createCharacter, editCharacter, deleteCharacter } from "../controllers/characters";

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

router.get('/', getCharacters);
router.get('/:id', getCharacter);
router.post('/', upload.single('image'), createCharacter);
router.put('/:id', editCharacter);
router.delete('/:id', deleteCharacter);

export default router;