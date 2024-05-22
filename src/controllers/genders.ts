import { Request, Response } from 'express';
import sequelize from './../db/conn';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import Gender from '../models/gender';
import Product from '../models/product';
import processor from '../utils/imgprocessors';

export const getGenders = async (req: Request, res: Response) => {
    try {
        const genders = await Gender.findAll();
        const gendersWithImages = genders.map((gender: any) => {
            const { ...rest } = gender.dataValues;
            return {
                ...rest,
                image: processor(gender, req),
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