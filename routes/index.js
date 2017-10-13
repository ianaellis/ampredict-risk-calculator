const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));

router.get('/predictionModel', storeController.predictionModel);
router.post('/predictionModel', catchErrors(storeController.createStore));

router.get('/predictionModelOutcome', storeController.outcome);

module.exports = router;
