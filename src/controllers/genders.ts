import { Request, Response } from 'express';
import sequelize from './../db/conn';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import Gender from '../models/gender';
import SerieMovie from '../models/product';

export const getGenders = async (req: Request, res: Response) => {
    try {

        const genders = await Gender.findAll();

        const gendersWithImageBuffers = [];
        const imagesDir = path.join(__dirname, '..', 'public', 'images');

        for (const gender of genders) {
            if (gender.get('image')) {
                const imageFilePath = path.join(imagesDir, gender.get('image') as string);
                const imageBuffer = fs.readFileSync(imageFilePath);
                gendersWithImageBuffers.push({
                    ...gender.toJSON(),
                    image: imageBuffer
                });
            }
        }

        const baseUrl = req.protocol + '://' + req.get('host') + '/';
        const gendersWithImages = genders.map((gender: any) => {
            const { ...rest } = gender.dataValues;
            return {
                ...rest,
                image: baseUrl + 'images/' + gender.image
            };
        });
        res.json({ genders: gendersWithImages });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando los géneros, contacte el administrador.'
        })
    }
}

export const getGender = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const gender = await Gender.findOne({
            where: { id }
        });

        if (gender) {
            res.json(gender);
        } else {
            res.status(404).json({
                msg: 'El género con id ' + id + ' no existe.'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando el género, contacte el administrador.'
        })
    }
}

export const createGender = async (req: Request, res: Response) => {

    const { body, file } = req;
    try {
        const gender = await Gender.create({ ...body, image: file?.filename });
        await gender.save();
        res.json(body);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error creando el género, contacte el administrador.'
        })
    }
}

export const editGender = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    try {
        const gender = await Gender.findOne({
            where: { id }
        });
        if (!gender) {
            return res.status(404).json({
                msg: 'El personaje con id ' + id + ' no existe.'
            });
        }
        await gender.update(body);
        res.json(body);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error editando el género, contacte el administrador.'
        })
    }
}

export const deleteGender = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const gender = await Gender.findOne({
            where: { id }
        });
        if (!gender) {
            return res.status(404).json({
                msg: 'El género con id ' + id + ' no existe.'
            });
        }
        await gender.destroy();
        res.json(gender);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error eliminando el género, contacte el administrador.'
        })
    }
}