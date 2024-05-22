import { Router } from "express";
import multer from 'multer';
import { storage } from "../config/storage";
import { getGenders, getGender, createGender, editGender } from "../controllers/genders";

const upload = multer({ storage });
const router = Router();

router.get('/', getGenders);
router.get('/:id', getGender);
router.post('/', upload.single('image'), createGender);
router.put('/:id', editGender);

export default router;