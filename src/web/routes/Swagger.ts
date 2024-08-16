import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { injectable } from 'tsyringe';

@injectable()
export default class Swagger {
    private options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Envio de SMS',
                version: '1.0.0',
                description: 'Aplicação para envio de SMS usando Twilio',
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

    // Método para gerar uma documentação OpenAPI para um endpoint GET
    public get(input: OpenAPIV3.ParameterObject[], output: OpenAPIV3.SchemaObject, title: string, description: string): any {
        return {
            get: {
                summary: title,
                description: description,
                parameters: input,
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: output,
                            },
                        },
                    },
                },
            }
        };
    }

    // Método para gerar uma documentação OpenAPI para um endpoint POST
    public post(input: OpenAPIV3.ParameterObject[], output: OpenAPIV3.SchemaObject, title: string, description: string): any {
        return {
            post: {
                summary: title,
                description: description,
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    input: {
                                        type: 'object',
                                        properties: input.reduce((acc: any, param: any) => {
                                            acc[param.name as string] = { type: (param.schema as OpenAPIV3.SchemaObject)?.type || 'string' } as OpenAPIV3.SchemaObject;
                                            return acc;
                                        }, {}),
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: output,
                            },
                        },
                    },
                },
            },
        };
    }

    // Método para gerar uma documentação OpenAPI para um endpoint PUT
    public put(input: OpenAPIV3.ParameterObject[], output: OpenAPIV3.SchemaObject, title: string, description: string): any {
        return {
            put: {
                summary: title,
                description: description,
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    input: {
                                        type: 'object',
                                        properties: input.reduce((acc: any, param: any) => {
                                            acc[param.name] = { type: param.schema?.type || 'string' };
                                            return acc;
                                        }, {}),
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: output,
                            },
                        },
                    },
                },
            },
        };
    }

    // Método para gerar uma documentação OpenAPI para um endpoint DELETE
    public delete(input: OpenAPIV3.ParameterObject[], output: OpenAPIV3.SchemaObject, title: string, description: string): any {
        return {
            delete: {
                summary: title,
                description: description,
                parameters: input,
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: output,
                            },
                        },
                    },
                },
            },
        };
    }
}
