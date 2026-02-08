const express = require('express');
const router = express.Router();
const controller = require('../controllers/itensController');
const { validateItem } = require('../middleware/validate');

router.get('/', controller.listar);
router.get('/:id', controller.obter);
router.post('/', validateItem, controller.criar);
router.put('/:id', validateItem, controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
