import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { injectable } from 'tsyringe';

type Parameter = { [key: string]: any }; @injectable()
export default class Swagger {
    private options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Envio de SMS',
                version: '1.0.0',
                description: 'Aplicação para envio de SMS usando Twilio',
                contact: {
                    name: 'Diego Pereira',
                    email: 'dhiegopereira.ti@@gmail.com',
                    url: 'https://www.example.com',
                },
                license: {
                    name: 'Licença',
                    url: 'https://www.example.com/licenca',
                },
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

    public setup(app: Application): void {
        const specs = swaggerJsDoc(this.options);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }
}
