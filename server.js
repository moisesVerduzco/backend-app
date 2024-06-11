const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/loginRoutes');
const authUsRoutes = require('./routes/loginUsRoutes');


const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/Notas', require('./routes/NotasRoutes'));
app.use('/User', require('./routes/loginUsRoutes'));
app.use('/auth', authRoutes);
app.use('/auth_us', authUsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
