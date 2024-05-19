import { Request } from 'express';
import { Model } from 'sequelize';
import path from 'path';
import fs from 'fs';

function processor(model: any, req: Request) {
    let imgUrl = null;
    if (model.get('image')) {
        const baseUrl = req.protocol + '://' + req.get('host') + '/';
        imgUrl = (model?.get('image')) ? baseUrl + 'images/' + model.get('image') : null;
    }
    return imgUrl;
}

export default processor;