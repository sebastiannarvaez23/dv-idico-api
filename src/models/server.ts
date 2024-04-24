import express, { Application } from 'express';
import cors from 'cors';
import characterRoutes from '../routes/character';
import serieMoviesRoutes from '../routes/seriesmovies';
import db from '../db/conn';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        characters: '/api/character',
        seriesMovies: '/api/serie-movie',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.app.use(express.static('public'));
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Connection Successfully!');
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.characters, characterRoutes)
        this.app.use(this.apiPaths.seriesMovies, serieMoviesRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        });
    }

}

export default Server;