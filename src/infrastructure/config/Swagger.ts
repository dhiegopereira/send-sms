import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export class SwaggerConfig {
    private readonly specs: any;
    private readonly options: Options;

    constructor() {
        this.options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'My API',
                    version: '1.0.0',
                    description: 'A description of your API',
                },
                servers: [
                    {
                        url: 'http://localhost:3000',
                        description: 'Local server',
                    },
                ],
            },
            apis: ['./src/web/routes/*.ts'],
        };
        this.specs = swaggerJsdoc(this.options);
    }

    public initialize(app: Express): void {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.specs));
    }
}
