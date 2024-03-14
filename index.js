const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./connection');
const userRoutes = require('./routes/usersRoutes');
const addressRoute = require('./routes/addrsRoutes');
const cors = require('cors');
const app = express();
const status = require('express-status-monitor')

require('dotenv').config({ path: '.env.local' });

connectToDatabase();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true  // Enable sending cookies from the client to the server
// }));

app.use(cors({
    origin: 'https://priyam.drdeepikashomeopathy.com/',
    credentials: true  // Enable sending cookies from the client to the server
}));

app.use(status())

app.use(bodyParser.json());

app.use('/api/magic_brush', userRoutes);

app.use('/api/magic_brush', addressRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}`);
});
