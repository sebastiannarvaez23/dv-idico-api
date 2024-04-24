import { Router } from "express";
import { getCharacters, getCharacter, createCharacter, editCharacter, deleteCharacter } from "../controllers/characters";

const router = Router();

router.get('/', getCharacters);
router.get('/:id', getCharacter);
router.post('/', createCharacter);
router.put('/:id', editCharacter);
router.delete('/:id', deleteCharacter);

export default router;