import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { createSerieMovie, deleteSerieMovie, editSerieMovie, getSerieMovie, getSeriesMovies } from "../controllers/seriesmovies";

const storage = multer.diskStorage({
    destination: 'dist/public/images',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Obtener la extensión del nombre de archivo original
        const filename = uniqueSuffix + ext; // Concatenar el sello de tiempo único con la extensión
        cb(null, filename);
    }
});

const upload = multer({ storage });
const router = Router();

router.get('/', getSeriesMovies);
router.get('/:id', getSerieMovie);
router.post('/', upload.single('image'), createSerieMovie);
router.put('/:id', editSerieMovie);
router.delete('/:id', deleteSerieMovie);

export default router;