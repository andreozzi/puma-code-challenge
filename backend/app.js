const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')

const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'], 
}));
app.use(express.json());
app.use('/favoriteUser', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
