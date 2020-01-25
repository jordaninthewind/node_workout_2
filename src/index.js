import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/', router);

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
