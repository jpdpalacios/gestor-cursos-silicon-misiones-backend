const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));

//app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRoutes = require('./api/api.routes');

app.use('/api', apiRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor en línea en el puerto ${port}`);
  });

module.exports = app;
