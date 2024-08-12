import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './presentation/routes';
import { ErrorHandler } from './infrastructure/middlewares/ErrorHandler';

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(ErrorHandler.handleError);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});

export default app;
