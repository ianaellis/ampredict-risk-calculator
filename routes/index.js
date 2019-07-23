const express = require('express');
const router = express.Router();

//Require controller
const storeController = require('../controllers/storeController');

// Homepage Route
router.get('/', storeController.homePage);
//Results Page
router.get('/predictionModelOutcome', storeController.outcome);
//About Page
router.get('/about', storeController.about);

//Get request for PredctionModel Form
router.get('/predictionModel', storeController.store_create_get);
router.post('/predictionModel', storeController.store_create_post);

//Post request for example to be used as demo
router.get('/example', storeController.scenario_one);
router.post('/example', storeController.store_create_post);


module.exports = router;
