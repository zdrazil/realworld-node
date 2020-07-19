// import { Response, Request } from "express"
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import session from 'express-session';

const isProduction = false;

const app = express();

// Express configuration
app.use(cors());
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'conduit',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

if (isProduction) {
  // TODO: implement
  console.log('handle production');
} else {
  mongoose.connect('mongodb://127.0.0.1:27017');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('success mongo');
    // we're connected!
  });
  mongoose.set('debug', true);
}

import './models/User';
import './config/passport';
import routes from './routes';

app.use(routes);

app.use((_req, _res, next) => {
  const err = new Error('Not found');
  // @ts-ignore
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  // @ts-ignore
  app.use((err, _req, res, _next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

export default app;
