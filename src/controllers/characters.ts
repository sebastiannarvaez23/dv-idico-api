import { Request, Response } from 'express';
import sequelize from '../config/db/conn';
import { Op } from 'sequelize';
import Character from '../models/character';
import Product from '../models/product';
import processor from '../utils/imgprocessors';

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
                    model: Product,
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

        const charactersWithEndpoints = characters.map((character: any) => {
            const { id, ...rest } = character.dataValues;
            return {
                ...rest,
                image: processor(character, req),
                endpoint: `/character/${id}`
            };
        });

        res.json({ characters: charactersWithEndpoints });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando los Personajes, contacte el administrador.'
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
                model: Product,
                attributes: ['title'],
                through: { attributes: [] }
            },
            attributes: { exclude: ['deletedAt'] }
        });

        if (character) {
            const { idi_ma_products, ...rest } = character.dataValues;
            const products: string[] = [];
            idi_ma_products.map((e: { title: string }) => products.push(e.title));
            let resCharacter = {
                ...rest,
                image: processor(character, req),
                products: products
            }

            res.json(resCharacter);
        } else {
            res.status(404).json({
                msg: 'El Personaje con id ' + id + ' no existe.'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando el Personaje, contacte el administrador.'
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
            msg: 'Ha ocurrido un error creando el Personaje, contacte el administrador.'
        })
    }
}

export const updateCharacter = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body, file } = req;
    try {
        const character = await Character.findOne({ where: { id } });
        if (!character) {
            return res.status(404).json({
                msg: 'El Personaje con id ' + id + ' no existe.'
            });
        }
        await character.update({ ...body, image: file?.filename });
        const characterUpdated = await Character.findOne({
            where: {
                id,
                deletedAt: null
            },
            attributes: { exclude: ['deletedAt'] },
            include: {
                model: Product,
                attributes: ['title'],
                through: { attributes: [] }
            }
        });
        const { idi_ma_products, ...rest } = characterUpdated?.dataValues;
        const products: string[] = [];
        idi_ma_products.map((e: { title: string }) => products.push(e.title));

        const characterResponse = {
            ...rest,
            image: processor(characterUpdated, req),
            products: products
        }
        res.json(characterResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error editando el Personaje, contacte el administrador.'
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
                msg: 'El Personaje con id ' + id + ' no existe.'
            });
        }
        await character.destroy();
        res.json(character);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error eliminando el Personaje, contacte el administrador.'
        })
    }
}