const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ['http://localhost:3000/', 'https://www.google.com/'];
const options = {
  origin: (origin, callback) => {
    whiteList.includes(origin)
      ? callback(null, true)
      : callback(new Error('Acceso no permitido'));
  }
};
app.use(cors(options));

app.get('/', async (req, res) => {
  res.send('Hola Mundo desde Express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola Soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;

//   if(limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   } else {
//     res.send('No hay parametros');
//   }
// });


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server runing on port ${port}`);
});
