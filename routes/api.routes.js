const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller.js');
const payloadValidator = require('../config/validators');


router.post('/fees', async(req, res) => {
    apiController.fees(req, res);
});

router.post('/compute-transaction-fee',
    async(req, res) => {
        apiController.compute_transaction_fee(req, res);
    });


module.exports = router;