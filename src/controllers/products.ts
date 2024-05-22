import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/product';
import Gender from '../models/gender';
import Character from '../models/character';
import processor from '../utils/imgprocessors';
import '../models/characterproduct';

export const getProducts = async (req: Request, res: Response) => {
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

        const products = await Product.findAll({
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

        const productsResponse = products.map((product: any) => {
            const { id, ...rest } = product.dataValues;
            return {
                ...rest,
                image: processor(product, req),
                endpoint: `/product/${id}`
            };
        });

        res.json({ products: productsResponse });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando los productos, contacte el administrador.'
        })
    }
}

export const getProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const product = await Product.findOne({
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
        if (!product) {
            res.status(404).json({
                msg: 'El producto con el id ' + id + ' no existe.'
            })
        }

        const { idi_ma_characters, ...rest } = product?.dataValues;
        const characters: string[] = [];

        idi_ma_characters?.map((character: { name: string }) => characters.push(character.name));
        const response = {
            ...rest,
            image: processor(product, req),
            characters
        };
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error consultando el producto, contacte el administrador.'
        })
    }
}

export const createProduct = async (req: Request, res: Response) => {

    const { body, file } = req;
    try {
        const product = await Product.create({ ...body, image: file?.filename });
        await product.save();
        res.json(body);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error creando el producto, contacte el administrador.'
        })
    }
}

export const updateProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body, file } = req;
    try {
        let product = await Product.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({
                msg: 'El producto con id ' + id + ' no existe.'
            });
        }
        await product.update({ ...body, image: file?.filename });
        product = await Product.findOne({
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

        const { idi_ma_characters, kind_id, gender_id, ...rest } = product?.dataValues;
        const characters: string[] = [];
        idi_ma_characters.map((e: { name: string }) => characters.push(e.name));

        const date = new Date(rest.created_date);
        const formattedDate = date.toISOString().split('T')[0];

        const productUpdated = {
            ...rest,
            created_date: formattedDate,
            image: processor(product, req),
            characters: characters
        };

        res.json(productUpdated);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error editando el producto, contacte el administrador.'
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const product = await Product.findOne({
            where: {
                id,
                deletedAt: null
            }
        });
        if (!product) {
            return res.status(404).json({
                msg: 'El producto con id ' + id + ' no existe.'
            });
        }
        await product.destroy();
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ha ocurrido un error eliminando el producto, contacte el administrador.'
        });
    }
}