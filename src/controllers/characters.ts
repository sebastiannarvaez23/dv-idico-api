import { Request, Response } from 'express';
import Character from '../models/character';

export const getCharacters = async (req: Request, res: Response) => {
    try {
        const characters = await Character.findAll({
            where: {
                deleted: false
            }
        });
        res.json({ characters });
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
                deleted: false
            }
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

    const { body } = req;
    try {
        const character = new Character(body);
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
                deleted: false
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
                deleted: false
            }
        });
        if (!character) {
            return res.status(404).json({
                msg: 'El personaje con id ' + id + ' no existe.'
            });
        }
        character.update({ deleted: true })
        res.json(character);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error eliminando el personaje, contacte el administrador.'
        })
    }
}