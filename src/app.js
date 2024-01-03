const express = require('express');

const paginate = require('express-paginate')
const app = express();

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(paginate.middleware(8,50));


//Aquí pueden colocar las rutas de las APIs
app.use('/api/v1/movies',require('./routes/v1/movies.routes'))
app.use('/api/v1/genres',require('./routes/v1/genres.routes'))

//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
