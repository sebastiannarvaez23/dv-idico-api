import { Router } from "express";
import multer from 'multer';
import { storage } from "../config/storage";
import { createProduct, deleteProduct, updateProduct, getProduct, getProducts } from "../controllers/products";

const upload = multer({ storage });
const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;