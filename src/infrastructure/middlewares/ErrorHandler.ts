import { Request, Response, NextFunction } from 'express';

export class ErrorHandler {
    public static handleError(err: any, req: Request, res: Response, next: NextFunction) {
        console.error(err);

        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';

        res.status(status).json({
            success: false,
            message: message,
            error: process.env.NODE_ENV === 'production' ? undefined : err.stack, // Mostra o stack trace no ambiente de desenvolvimento
        });
    }
}
