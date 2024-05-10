import { Request, Response } from 'express';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import SerieMovie from '../models/seriemovie';
import Gender from '../models/gender';
import Character from '../models/character';
import '../models/characterseriemovie';

export const getSeriesMovies = async (req: Request, res: Response) => {
    try {
        const { name, gender, order } = req.query;
        let whereClause: any = { deletedAt: null };
        let includeClause: any = [];

        if (name) {
            whereClause.title = { [Op.like]: `%${name}%` };
        }

        if (gender) {
            includeClause.push({
                model: Gender,
                as: 'gender',
                where: { id: gender }
            });
        }

        let orderBy: [string, string][] = [['created_date', 'DESC']];

        if (order === 'ASC') {
            orderBy = [['created_date', 'ASC']];
        } else if (order === 'DESC') {
            orderBy = [['created_date', 'DESC']];
        }

        const seriesMovies = await SerieMovie.findAll({
            where: whereClause,
            attributes: {
                exclude: ['deletedAt', 'gender_id']
            },
            include: [
                {
                    model: Gender,
                    as: 'gender',
                    attributes: ['id', 'name']
                },
                {
                    model: Character,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ],
            order: orderBy
        });

        const seriesMoviesWithImageBuffers = [];
        const imagesDir = path.join(__dirname, '..', 'public', 'images');

        for (const seriemovie of seriesMovies) {
            if (seriemovie.get('image')) {
                const imageFilePath = path.join(imagesDir, seriemovie.get('image') as string);
                const imageBuffer = fs.readFileSync(imageFilePath);
                seriesMoviesWithImageBuffers.push({
                    ...seriemovie.toJSON(),
                    image: imageBuffer
                });
            }
        }

        const baseUrl = req.protocol + '://' + req.get('host') + '/';

        const seriesMoviesImages = seriesMovies.map((seriemovie: any) => {
            const { idi_ma_characters, ...rest } = seriemovie.dataValues;
            const characters: string[] = [];
            idi_ma_characters.map((e: { name: string }) => characters.push(e.name));
            return {
                ...rest,
                image: (seriemovie.image) ? baseUrl + 'images/' + seriemovie.image : null,
                characters: characters
            };
        });

        res.json({ seriesMovies: seriesMoviesImages });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando las series y películas, contacte el administrador.'
        })
    }
}

export const getSerieMovie = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const serieMovie = await SerieMovie.findOne({
            where: {
                id,
                deletedAt: null
            },
            attributes: { exclude: ['deletedAt', 'gender_id'] },
            include: [
                {
                    model: Gender,
                    as: 'gender',
                    attributes: ['id', 'name']
                }
            ]
        });
        if (serieMovie) {
            res.json(serieMovie);
        } else {
            res.status(404).json({
                msg: 'La serie o película con el id ' + id + ' no existe.'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando la serie o la película, contacte el administrador.'
        })
    }
}

export const createSerieMovie = async (req: Request, res: Response) => {

    const { body, file } = req;
    try {
        const serieMovie = await SerieMovie.create({ ...body, image: file?.filename });
        await serieMovie.save();
        res.json(body);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error creando la serie o la película, contacte el administrador.'
        })
    }
}

export const editSerieMovie = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body, file } = req;
    try {
        const serieMovie = await SerieMovie.findOne({
            where: {
                id,
                deletedAt: null
            },
            attributes: { exclude: ['deletedAt', 'gender_id'] },
            include: [
                {
                    model: Gender,
                    as: 'gender',
                    attributes: ['id', 'name']
                },
                {
                    model: Character,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if (!serieMovie) {
            return res.status(404).json({
                msg: 'La serie o película con id ' + id + ' no existe.'
            });
        }
        await serieMovie.update({ ...body, image: file?.filename });

        const seriesMoviesWithImageBuffers = [];
        const imagesDir = path.join(__dirname, '..', 'public', 'images');

        if (serieMovie.get('image')) {
            const imageFilePath = path.join(imagesDir, serieMovie.get('image') as string);
            const imageBuffer = fs.readFileSync(imageFilePath);
            seriesMoviesWithImageBuffers.push({
                ...serieMovie.toJSON(),
                image: imageBuffer
            });
        }

        const baseUrl = req.protocol + '://' + req.get('host') + '/';

        const { idi_ma_characters, ...rest } = serieMovie.dataValues;
        const characters: string[] = [];
        idi_ma_characters.map((e: { name: string }) => characters.push(e.name));

        const serieMovieUpdated = {
            ...rest,
            image: (serieMovie.get('image')) ? baseUrl + 'images/' + serieMovie.get('image') : null,
            characters: characters
        };

        res.json(serieMovieUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error editando la serie o la película, contacte el administrador.'
        })
    }
}

export const deleteSerieMovie = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const serieMovie = await SerieMovie.findOne({
            where: {
                id,
                deletedAt: null
            }
        });
        if (!serieMovie) {
            return res.status(404).json({
                msg: 'La serie o película con id ' + id + ' no existe.'
            });
        }
        await serieMovie.destroy();
        res.json(serieMovie);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error eliminando la serie o la película, contacte el administrador.'
        })
    }
}