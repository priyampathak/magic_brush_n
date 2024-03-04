const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./connection');
const userRoutes = require('./routes/usersRoutes')
const addressRoute = require('./routes/addrsRoutes')

const app = express();

app.use(bodyParser.json());

require('dotenv').config({ path: '.env.local' });

connectToDatabase()

app.use('/api/magic_brush', userRoutes);

app.use('/api/magic_brush', addressRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}`);
})