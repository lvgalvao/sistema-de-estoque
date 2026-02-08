const express = require('express');
const router = express.Router();
const controller = require('../controllers/movimentacoesController');
const { validateMovimentacao } = require('../middleware/validate');

router.post('/', validateMovimentacao, controller.registrar);
router.get('/', controller.listar);

module.exports = router;
