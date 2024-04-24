import express, { Application } from 'express';
import characterRoutes from '../routes/character';
import serieMoviesRoutes from '../routes/seriesmovies';

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
        this.routes();
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