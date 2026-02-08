const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const itensRoutes = require('./routes/itens');
const movimentacoesRoutes = require('./routes/movimentacoes');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/itens', itensRoutes);
app.use('/api/movimentacoes', movimentacoesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
