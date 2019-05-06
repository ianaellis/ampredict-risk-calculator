const express = require('express');
const router = express.Router();
// const app = express(); // Added 3.35.19 for validation atte
// const { catchErrors } = require('../handlers/errorHandlers');

//Require controller
const storeController = require('../controllers/storeController');

// Homepage Route
router.get('/', storeController.homePage);

//Not actually saving anything to a DB
// router.get('/add', storeController.addStore);
// router.post('/add', catchErrors(storeController.createStore));

//Get form view on predictionModel
// router.get('/predictionModel', storeController.predictionModel); OLD ROUTE THAT WORKS

//Get request for creating predModel
// router.post('/predictionModel/create', storeController.predictionModel)


//Post results of form
// router.post('/predictionModel', catchErrors(storeController.createStore)); OLD ROUTE THAT WORKS

//NEW ROUTES TO TEST

//Get request for PredctionModel Form
router.get('/predictionModel', storeController.store_create_get);

//Post request for PredictionModel
router.post('/predictionModel', storeController.store_create_post);


//Results Page
router.get('/predictionModelOutcome', storeController.outcome);

//About Page
router.get('/about', storeController.about);

module.exports = router;
