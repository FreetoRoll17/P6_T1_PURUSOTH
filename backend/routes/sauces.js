const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces');


router.post('/sauces', saucesCtrl.addSauces);


module.exports = router;