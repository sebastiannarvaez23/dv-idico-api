import { Request, Response } from 'express';

export const getCharacters = (req: Request, res: Response) => {
    res.json({
        msg: 'getCharacters',
    })
}

export const getCharacter = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'getCharacter',
        id
    })
}

export const createCharacter = (req: Request, res: Response) => {

    const { body } = req;

    res.json({
        msg: 'createCharacter',
        body
    })
}

export const editCharacter = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'editCharacter',
        id,
        body
    })
}

export const deleteCharacter = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'editCharacter',
        id
    })
}