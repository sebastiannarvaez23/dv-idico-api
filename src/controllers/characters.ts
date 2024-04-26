import { Request, Response } from 'express';
import sequelize from './../db/conn';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import Character from '../models/character';
import SerieMovie from '../models/seriemovie';

const multer = require('multer');

export const getCharacters = async (req: Request, res: Response) => {
    try {

        const { name, age, movies } = req.query;
        let whereClause: any = { deletedAt: null };

        if (name) {
            const nameString = name as string;
            whereClause.name = sequelize.where(
                sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${nameString.toLowerCase()}%`);
        }

        if (age) {
            whereClause.age = age;
        }

        if (movies) {
            const charactersWithMovie = await Character.findAll({
                include: [{
                    model: SerieMovie,
                    where: { title: movies }
                }],
                attributes: ['id']
            });

            const characterIds = charactersWithMovie.map((character: any) => character.get('id'));

            whereClause.id = {
                [Op.in]: characterIds
            };
        }

        const characters = await Character.findAll({
            where: whereClause,
            attributes: {
                exclude: [
                    'age',
                    'weight',
                    'history',
                    'createdAt',
                    'updatedAt',
                    'deletedAt'
                ]
            }
        });

        const charactersWithImageBuffers = [];
        const imagesDir = path.join(__dirname, '..', 'public', 'images');

        for (const character of characters) {
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
        const charactersWithEndpoints = characters.map((character: any) => {
            const { id, ...rest } = character.dataValues;
            return {
                ...rest,
                image: baseUrl + 'images/' + character.image,
                endpoint: `/api/character/${id}`
            };
        });

        res.json({ characters: charactersWithEndpoints });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando los personajes, contacte el administrador.'
        })
    }
}

export const getCharacter = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const character = await Character.findOne({
            where: {
                id,
                deletedAt: null
            },
            include: {
                model: SerieMovie,
                through: { attributes: [] }
            },
            attributes: { exclude: ['deletedAt'] }
        });

        if (character) {
            res.json(character);
        } else {
            res.status(404).json({
                msg: 'El personaje con id ' + id + ' no existe.'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando el personaje, contacte el administrador.'
        })
    }
}

export const createCharacter = async (req: Request, res: Response) => {

    const { body, file } = req;

    try {
        const character = await Character.create({ ...body, image: file?.filename });
        await character.save();
        res.json(body);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error creando el personaje, contacte el administrador.'
        })
    }
}

export const editCharacter = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {
        const character = await Character.findOne({
            where: {
                id,
                deletedAt: null
            }
        });
        if (!character) {
            return res.status(404).json({
                msg: 'El personaje con id ' + id + ' no existe.'
            });
        }
        await character.update(body);
        res.json(body);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error editando el personaje, contacte el administrador.'
        })
    }
}

export const deleteCharacter = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const character = await Character.findOne({
            where: {
                id,
                deletedAt: null
            }
        });
        if (!character) {
            return res.status(404).json({
                msg: 'El personaje con id ' + id + ' no existe.'
            });
        }
        await character.destroy();
        res.json(character);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error eliminando el personaje, contacte el administrador.'
        })
    }
}