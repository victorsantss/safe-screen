import express, { Router } from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3001, () => {
  console.log('Server Running on http://localhost:3001');
})
