import { Request, Response } from 'express';
import { send } from '../services/smsService';

export const smsController = async (req: Request, res: Response): Promise<void> => {
    const { to, body } = req.body;

    try {
        const result = await send({ to, body });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Failed to send SMS');
    }
};
