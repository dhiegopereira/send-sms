import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export class SwaggerConfig {
    private static specs: any;

    private constructor() {}

    public static initialize(app: Express): void {
        const options: Options = {
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
            apis: ['D:\dhieg\Documents\Jobs\Freela\portfolio\send-sms\src\presentation\routes\smsRoutes.ts'],
        };

        this.specs = swaggerJsdoc(options);

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.specs));
    }
}
