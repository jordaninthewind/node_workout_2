import express from 'express';
import routes from './routes/routes';

const app = express();
const PORT = 3000;

routes(app);

app.get('/', (req, res) => {
  res.send(`From Express server on port ${PORT}`);
});

app.post('/', (req, res) => {
  res.send({ something: 'else' });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
