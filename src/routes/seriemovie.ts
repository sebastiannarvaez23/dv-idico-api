import { Router } from "express";
import multer from 'multer';
import { storage } from "../config/storage";
import { createSerieMovie, deleteSerieMovie, editSerieMovie, getSerieMovie, getSeriesMovies } from "../controllers/seriesmovies";

const upload = multer({ storage });
const router = Router();

router.get('/', getSeriesMovies);
router.get('/:id', getSerieMovie);
router.post('/', upload.single('image'), createSerieMovie);
router.put('/:id', upload.single('image'), editSerieMovie);
router.delete('/:id', deleteSerieMovie);

export default router;