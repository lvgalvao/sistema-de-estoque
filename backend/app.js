const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const errorHandler = require('./middleware/errorHandler');
const itensRoutes = require('./routes/itens');
const movimentacoesRoutes = require('./routes/movimentacoes');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/itens', itensRoutes);
app.use('/api/movimentacoes', movimentacoesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Serve frontend em produção (sem Nginx, ex: Replit)
const distPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handler
app.use(errorHandler);

module.exports = app;
