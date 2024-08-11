import 'dotenv/config'; // Adicione esta linha no início do seu arquivo
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});