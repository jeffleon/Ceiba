var express = require('express');
var router = express.Router();
var paycontroller = require('../controllers/pagos')

router.post('/pagos', paycontroller.payspost);
router.get('/pagos', paycontroller.paysget);
router.post('/create/pagos', paycontroller.payscreate);

module.exports = router;
