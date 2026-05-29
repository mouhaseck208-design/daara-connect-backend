const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
 origin: [
   'http://127.0.0.1:5500',
   'http://localhost:5500',
   'https://mouhaseck208-design.github.io'
 ],
 methods: ['GET', 'POST', 'PUT', 'DELETE'],
 allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const authRoutes         = require('./src/routes/auth.routes');
const kourelRoutes       = require('./src/routes/kourel.routes');
const membreRoutes       = require('./src/routes/membre.routes');
const presenceRoutes     = require('./src/routes/presence.routes');
const adiyeuRoutes       = require('./src/routes/adiyeu.routes');
const messageRoutes      = require('./src/routes/message.routes');
const conservatoireRoutes = require('./src/routes/conservatoire.routes');
const rapportRoutes      = require('./src/routes/rapport.routes');
const programmeRoutes    = require('./src/routes/programme.routes');

app.use('/api/auth',         authRoutes);
app.use('/api/kourels',      kourelRoutes);
app.use('/api/membres',      membreRoutes);
app.use('/api/presences',    presenceRoutes);
app.use('/api/programmes',   programmeRoutes);
app.use('/api/adiyeu',       adiyeuRoutes);
app.use('/api/messages',     messageRoutes);
app.use('/api/conservatoire', conservatoireRoutes);
app.use('/api/rapports',     rapportRoutes);

app.get('/', (req, res) => {
 res.json({ message: 'Daara Connect API fonctionne ✅' });
});

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
   console.log('✅ MongoDB connecté');
   app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
     console.log('🚀 Serveur lancé sur le port ' + (process.env.PORT || 5000));
   });
 })
 .catch(err => console.error('❌ Erreur MongoDB:', err));