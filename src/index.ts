import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routerApi from './routes';

const app = express();
const PORT = 4000;

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routerApi);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});