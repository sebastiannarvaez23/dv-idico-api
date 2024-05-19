import { Request, Response } from 'express';
import { Op } from 'sequelize';
import SerieMovie from '../models/seriemovie';
import Gender from '../models/gender';
import Character from '../models/character';
import '../models/characterseriemovie';
import processor from '../utils/imgprocessors';

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
                exclude: [
                    'created_date',
                    'qualification',
                    'gender',
                    'createdAt',
                    'updatedAt',
                    'deletedAt',
                    'gender_id']
            },
            include: [
                {
                    model: Gender,
                    as: 'gender',
                    attributes: [
                        'id',
                        'name',
                    ]
                },
            ],
            order: orderBy
        });

        const seriesMoviesImages = seriesMovies.map((seriemovie: any) => {
            const { id, ...rest } = seriemovie.dataValues;
            return {
                ...rest,
                image: processor(seriemovie, req),
                endpoint: `/serie-movie/${id}`
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

            include: [
                {
                    model: Gender,
                    as: 'gender',
                    attributes: ['id', 'name']
                },
                {
                    model: Character,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ],
            attributes: { exclude: ['deletedAt', 'gender_id'] }
        })
        if (!serieMovie) {
            res.status(404).json({
                msg: 'La serie o película con el id ' + id + ' no existe.'
            })
        }

        const { idi_ma_characters, ...rest } = serieMovie?.dataValues;
        const characters: string[] = [];

        idi_ma_characters.map((character: { name: string }) => characters.push(character.name));
        const response = {
            ...rest,
            image: processor(serieMovie, req),
            characters
        };
        res.json(response);
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
                    through: { attributes: [] }
                }
            ]
        });
        if (!serieMovie) {
            return res.status(404).json({
                msg: 'La serie o película con id ' + id + ' no existe.'
            });
        }
        await serieMovie.update({ ...body, image: file?.filename });

        const { idi_ma_characters, ...rest } = serieMovie.dataValues;
        const characters: string[] = [];
        idi_ma_characters.map((e: { name: string }) => characters.push(e.name));

        const date = new Date(rest.created_date);
        const formattedDate = date.toISOString().split('T')[0];

        const serieMovieUpdated = {
            ...rest,
            created_date: formattedDate,
            image: processor(serieMovie, req),
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