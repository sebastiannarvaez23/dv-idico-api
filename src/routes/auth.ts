import { Router } from "express";
import { getToken, signUp } from "../controllers/users";

const router = Router();

router.post('/login', getToken);
router.post('/signup', signUp);

export default router;