import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './web/routes';
import { ErrorHandler } from './web/middlewares/ErrorHandler';
import { SwaggerConfig } from './infrastructure/config/Swagger';
import e from 'express';

const app = express();
const port = process.env.PORT || 3000;

const swaggerConfig = new SwaggerConfig();
swaggerConfig.initialize(app);

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(ErrorHandler.handleError);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});

export { app, server };
