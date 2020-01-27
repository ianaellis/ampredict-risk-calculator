const express = require('express');
const router = express.Router();

//Require controller
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Homepage Route
router.get('/', storeController.homePage);
//Results Page
router.get('/predictionModelOutcome', storeController.outcome);
//About Page
router.get('/about', storeController.about);
//temp index
router.get('/index2_temp', storeController.example);

//Get request for PredctionModel Form
router.get('/predictionModel', authController.isLoggedIn, storeController.store_create_get);
router.post('/predictionModel', storeController.store_create_post);

//Post request for example to be used as demo
router.get('/example', storeController.scenario_one);
router.post('/example', storeController.store_create_post);

//Added for User Auth
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
//Validate, register, login
router.post('/register', 
	userController.validateRegister,
	userController.register,
	authController.login
);

router.get('/logout', authController.logout);
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

router.post('/account/forgot', catchErrors(authController.forgot));

module.exports = router;
