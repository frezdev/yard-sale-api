const express = require('express');
const path = require('path');
const cors = require('cors');
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:3000/', 'http://localhost:5173'];
const options = {
  origin: (origin, callback) => {
    (whiteList.includes(origin) || !origin)
      ? callback(null, true)
      : callback(new Error('Acceso no permitido'));
  }
};
app.use(cors(options));
app.use('/', express.static(path.join(__dirname, '../public/')));

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
