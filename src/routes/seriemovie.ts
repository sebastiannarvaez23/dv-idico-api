import { Router } from "express";
import { createSerieMovie, deleteSerieMovie, editSerieMovie, getSerieMovie, getSeriesMovies } from "../controllers/seriesmovies";

const router = Router();

router.get('/', getSeriesMovies);
router.get('/:id', getSerieMovie);
router.post('/', createSerieMovie);
router.put('/:id', editSerieMovie);
router.delete('/:id', deleteSerieMovie);

export default router;