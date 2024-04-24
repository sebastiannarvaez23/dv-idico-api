import { Router } from "express";
import { getGenders, getGender, createGender, editGender, deleteGender } from "../controllers/genders";

const router = Router();

router.get('/', getGenders);
router.get('/:id', getGender);
router.post('/', createGender);
router.put('/:id', editGender);
router.delete('/:id', deleteGender);

export default router;