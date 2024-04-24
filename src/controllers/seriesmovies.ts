import { Request, Response } from 'express';
import SerieMovie from '../models/seriemovie';

export const getSeriesMovies = async (req: Request, res: Response) => {
    try {
        const seriesmovies = await SerieMovie.findAll({
            where: {
                deleted: false
            }
        });
        res.json({ seriesmovies });
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
                deleted: false
            }
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
                deleted: false
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
                deleted: false
            }
        });
        if (!serieMovie) {
            return res.status(404).json({
                msg: 'La serie o película con id ' + id + ' no existe.'
            });
        }
        serieMovie.update({ deleted: true })
        res.json(serieMovie);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error eliminando la serie o la película, contacte el administrador.'
        })
    }
}