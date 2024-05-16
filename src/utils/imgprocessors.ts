import path from 'path';
import { Request } from 'express';
import fs from 'fs';
import Character from '../models/character';
import SerieMovie from '../models/seriemovie';

function holahola(req: Request, arr: any[]) {
    const charactersWithImageBuffers = [];
    const imagesDir = path.join(__dirname, '..', 'public', 'images');

    for (const character of arr) {
        if (character.get('image')) {
            const imageFilePath = path.join(imagesDir, character.get('image') as string);
            const imageBuffer = fs.readFileSync(imageFilePath);
            charactersWithImageBuffers.push({
                ...character.toJSON(),
                image: imageBuffer
            });
        }
    }

    const baseUrl = req.protocol + '://' + req.get('host') + '/';
    const charactersWithEndpoints = arr.map((character: any) => {
        const { id, ...rest } = character.dataValues;
        return {
            ...rest,
            image: baseUrl + 'images/' + character.image,
            endpoint: `/character/${id}`
        };
    });

    return charactersWithEndpoints;
}

export default holahola;