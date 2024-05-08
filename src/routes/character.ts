import { Router } from "express";
import multer from 'multer';
import { storage } from "../config/storage";
import { getCharacters, getCharacter, createCharacter, editCharacter, deleteCharacter } from "../controllers/characters";

const upload = multer({ storage });
const router = Router();

router.get('/', getCharacters);
router.get('/:id', getCharacter);
router.post('/', upload.single('image'), createCharacter);
router.put('/:id', editCharacter);
router.delete('/:id', deleteCharacter);

export default router;