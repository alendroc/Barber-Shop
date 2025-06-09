import multer from 'multer';
import path from 'path';
import fs from 'fs';
import express from 'express';

import { randomUUID } from 'crypto';

// Crear carpeta "imagenes" si no existe
const carpetaImagenes = path.join(process.cwd(), 'imagenes');
if (!fs.existsSync(carpetaImagenes)) {
    fs.mkdirSync(carpetaImagenes, { recursive: true });
}

// Configurar multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, carpetaImagenes);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const nombreUnico = `img_${randomUUID()}${ext}`;
        cb(null, nombreUnico);
    }
});
const upload = multer({ storage });

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }

    const rutaRelativa = `/imagenes/${req.file.filename}`;
    res.json({
        message: 'Imagen subida exitosamente',
        filePath: rutaRelativa,
        filename: req.file.filename
    });
});

export default router;
