import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './web/routes';
import { ErrorHandler } from './web/middlewares/ErrorHandler';
import container from './container';
import Swagger from './web/routes/Swagger';

const app = express();
const port = process.env.PORT || 3000;

const swagger = container.resolve<Swagger>('Swagger');
swagger.setup(app);

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(ErrorHandler.handleError);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
    console.log(`http://localhost:${port}/swagger`);
    console.log(`http://localhost:${port}/apidoc`);
});

export { app, server };
