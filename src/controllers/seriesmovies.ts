import { Request, Response } from 'express';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';
import SerieMovie from '../models/seriemovie';
import { Gender } from '../models/gender';

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

        const seriesmovies = await SerieMovie.findAll({
            where: whereClause,
            attributes: {
                exclude: ['deletedAt']
            },
            include: includeClause,
            order: orderBy
        });

        const seriesMoviesWithImageBuffers = [];
        const imagesDir = path.join(__dirname, '..', 'public', 'images');

        for (const seriemovie of seriesmovies) {
            if (seriemovie.image) {
                const imageFilePath = path.join(imagesDir, seriemovie.image);
                const imageBuffer = fs.readFileSync(imageFilePath);
                seriesMoviesWithImageBuffers.push({
                    ...seriemovie.toJSON(),
                    image: imageBuffer
                });
            }
        }

        const baseUrl = req.protocol + '://' + req.get('host') + '/';

        const seriesMoviesImages = seriesmovies.map((seriemovie: any) => {
            const { id, ...rest } = seriemovie.dataValues;
            return {
                ...rest,
                image: (seriemovie.image) ? baseUrl + 'images/' + seriemovie.image : null,
            };
        });

        res.json({ seriesMoviesImages });
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
            attributes: { exclude: ['deletedAt'] }
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

    const { body } = req;
    try {
        const serieMovie = new SerieMovie(body);
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
    const { body } = req;
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
        await serieMovie.update(body);
        res.json(body);
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