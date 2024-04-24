import { Request, Response } from 'express';

export const getSeriesMovies = (req: Request, res: Response) => {
    res.json({
        msg: 'getSeriesMovies',
    })
}

export const getSerieMovie = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'getSerieMovie',
        id
    })
}

export const createSerieMovie = (req: Request, res: Response) => {

    const { body } = req;

    res.json({
        msg: 'createSerieMovie',
        body
    })
}

export const editSerieMovie = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'editSerieMovie',
        id,
        body
    })
}

export const deleteSerieMovie = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'deleteSerieMovie',
        id
    })
}