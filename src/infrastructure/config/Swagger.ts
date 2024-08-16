import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

interface DocumentationParams {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    summary: string;
    description?: string;
    parameters?: any[];
    requestBody?: {
        contentType: string;
        schema: any;
    };
    responses?: {
        [statusCode: number]: {
            description: string;
            content?: {
                [contentType: string]: {
                    schema: any;
                };
            };
        };
    };
}

export class SwaggerConfig {
    private specs: any;
    private readonly options: Options;
    private documentation: string[] = [];

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
            apis: ['./src/web/routes/*.ts'], // Ajuste o caminho conforme necessário
        };
        this.specs = swaggerJsdoc(this.options);
    }

    public initialize(app: Express): void {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.specs));
    }
}
