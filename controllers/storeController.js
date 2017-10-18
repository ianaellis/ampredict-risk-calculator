const mongoose = require('mongoose');
const Store = mongoose.model('Store'); // Grabbing the model 'Store' from the model Store.js

exports.homePage = (req, res) => {
	res.render('index');
};

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store'});
};

exports.outcome = (req, res) => {
	res.render('outcome');
};

exports.createStore = async (req, res) => {
	// const predModel = new Store(req.body);
	// res.redirect('/');
	// console.log(req.age);
	// await predModel.save(); //Awaiting a Promise
	// res.json(new_age_2);
	// const age1 = predModel.age;
	// console.log(predModel);

	// Variable strings
	var amp_lvl_string = "Unknown";
	var age_string = req.body.age;
	var bmi_string = req.body.bmi;
	var race_string = "Unknown";
	var function_string = "Unknown";
	var heart_failure_string = "";
	var dialysis_string = "";
	var bun_string = req.body.blood_nitrogen;
	var blood_string = "Unknown";
	var platelet_string = req.body.platelet_count;

	// Variables Coeffs

	var amp_lvl_calc = 0; 							//Question 1
	var age_calc = (req.body.age - 60)*0.04708; 	//Question 2
	var bmi_calc = (req.body.bmi - 25)*-0.05016; 	//Question 3
	var race_calc = 0; 								//Question 4
	var func_status_calc = 0; 						//Question 5
	var heart_failure_calc = 0; 					//Question 6
	var dialysis_calc = 0;							//Question 7
	var blood_nitrogen_calc = (req.body.blood_nitrogen - 25)*0.0158; // Question 8
	var wbc_calc = 0								//Question 9
	var platelet_calc = req.body.platelet_count*1.7239 //Question 10
	const constant_var = -2.1923 					//Constant formula variable
	
	// Variables Lower

	var lower_amp_lvl_calc = 0; 							//Question 1
	var lower_age_calc = (req.body.age - 60)*0.04114; 		//Question 2
	var lower_bmi_calc = (req.body.bmi - 25)*-0.06102; 		//Question 3
	var lower_race_calc = 0; 								//Question 4
	var lower_func_status_calc = 0; 						//Question 5
	var lower_heart_failure_calc = 0; 						//Question 6
	var lower_dialysis_calc = 0;							//Question 7
	var lower_blood_nitrogen_calc = (req.body.blood_nitrogen - 25)*0.0123; // Question 8
	var lower_wbc_calc = 0									//Question 9
	var lower_platelet_calc = req.body.platelet_count*1.291 //Question 10
	const lower_constant_var = -2.37						//Constant formula variable

	//Variables Upper

	var upper_amp_lvl_calc = 0; 							//Question 1
	var upper_age_calc = (req.body.age - 60)*0.05302; 		//Question 2
	var upper_bmi_calc = (req.body.bmi - 25)*-0.0393; 		//Question 3
	var upper_race_calc = 0; 								//Question 4
	var upper_func_status_calc = 0; 						//Question 5
	var upper_heart_failure_calc = 0; 						//Question 6
	var upper_dialysis_calc = 0;							//Question 7
	var upper_blood_nitrogen_calc = (req.body.blood_nitrogen - 25)*0.01929; // Question 8
	var upper_wbc_calc = 0									//Question 9
	var upper_platelet_calc = req.body.platelet_count*2.157 //Question 10
	const upper_constant_var = -2.014

	// Question Logic

	//Question 1
	if (req.body.amputation_level == 1){
		//Do Nothing, value remains 0
		amp_lvl_string = "Transmetatarsal";
	} else if (req.body.amputation_level == 2){ //TT
		amp_lvl_calc = .295483;
		lower_amp_lvl_calc = .12677;
		upper_amp_lvl_calc = .46419;
		amp_lvl_string = "TT";
	} else if (req.body.amputation_level == 3){ //TT
		amp_lvl_calc = .474842;
		lower_amp_lvl_calc = .29713;
		upper_amp_lvl_calc = .65256;
		amp_lvl_string = "TF";
	}

	//Question 2 - No question logic
	//      If age unentered, -60 is still applied.

	//Question 3 - No question logic
	//      If bmi unentered, -25 is still applied.

	//Question 4
	if (req.body.race == 1){ //White
		race_string = "White";
	} else if (req.body.race == 2){ //Black
		race_calc = -.25735;
		lower_race_calc = -.38737;
		upper_race_calc = -.12734;
		race_string = "Black";
	} else if (req.body.race == 3){ //Hispanic
		race_string = "Hispanic";
	} else if (req.body.race == 4){ //Other
		race_calc = -.98503;
		lower_race_calc = -1.823;
		upper_race_calc = -0.1472;
		race_string = "Other";
	} else{
		//Unknown or unselected
	}

	//Question 5
	if (req.body.functional_status == 1){
		function_string = "Independent";
	} else if (req.body.functional_status == 2){  //Partial
		func_status_calc = .3033;
		lower_func_status_calc = .17468;
		upper_func_status_calc = .4319;
		function_string = "Partially Dependent";
	} else if (req.body.functional_status == 3){ //Total
		func_status_calc = .95483;
		lower_func_status_calc = .7722;
		upper_func_status_calc = 1.1375;
		function_string = "Tottally Dependent";
	}

	//Question 6
	if(req.body.heart_failure == 1){
		heart_failure_calc = .54516;
		lower_heart_failure_calc = .421;
		upper_heart_failure_calc = .6694;
		heart_failure_string = "CHF";
	} else if(req.body.heart_failure == 0) {
		heart_failure_string = "";
	}

	//Question 7
	if(req.body.dialysis == 1){
		dialysis_calc = .88959;
		lower_dialysis_calc = .7222;
		upper_dialysis_calc = 1.0569;
		dialysis_string = "Dialysis";
	} else if (req.body.dialysis == 0){
		
	}

	//Question 8
	//     If blood nitrogen unentered, -25 is still applied.

	//Question 9
	if(req.body.white_cell_count == 2){
		wbc_calc = .3423;
		lower_wbc_calc = .21729;
		upper_wbc_calc = .46732;
		blood_string = "≥ 11,000";
	} else if (req.body.white_cell_count == 1){
		blood_string = "≤ 11,000";
	}

	//Final Calculations
	var logit_prob = (amp_lvl_calc + age_calc + bmi_calc + race_calc + func_status_calc + heart_failure_calc + dialysis_calc + blood_nitrogen_calc + wbc_calc + platelet_calc + constant_var).toFixed(4);
    var lower_logit_prob = (lower_amp_lvl_calc + lower_age_calc + lower_bmi_calc + lower_race_calc + lower_func_status_calc + lower_heart_failure_calc + lower_dialysis_calc + lower_blood_nitrogen_calc + lower_wbc_calc + lower_platelet_calc + lower_constant_var).toFixed(4);
    var upper_logit_prob = (upper_amp_lvl_calc + upper_age_calc + upper_bmi_calc + upper_race_calc + upper_func_status_calc + upper_heart_failure_calc + upper_dialysis_calc + upper_blood_nitrogen_calc + upper_wbc_calc + upper_platelet_calc + upper_constant_var).toFixed(4);
    var prob = (Math.pow(2.71828, logit_prob))/(1+(Math.pow(2.71828, logit_prob)));
    var lower_ci = (Math.pow(2.71828, lower_logit_prob))/(1+(Math.pow(2.71828, lower_logit_prob)));
    var upper_ci = (Math.pow(2.71828, upper_logit_prob))/(1+(Math.pow(2.71828, upper_logit_prob)));

    var highProb = false;
    if(prob > .265){
    	highProb = true;
    }

    var comorbid = true;
    if(heart_failure_string == "" & dialysis_string == ""){
    	comorbid = false;
    }

    // res.json(upper_ci);

	 
    res.render('predictionModelOutcome', {comorbid, highProb, logit_prob, lower_logit_prob, upper_logit_prob, prob, lower_ci, upper_ci, amp_lvl_string, age_string, bmi_string, race_string, function_string, heart_failure_string, dialysis_string, bun_string, blood_string, platelet_string: comorbid, highProb, logit_prob, lower_logit_prob, upper_logit_prob, prob, lower_ci, upper_ci, amp_lvl_string, age_string, bmi_string, race_string, function_string, heart_failure_string, dialysis_string, bun_string, blood_string, platelet_string});



};

exports.predictionModel = async (req, res) => {
	res.render('predictionModel', { title: 'AMPREDICT Mortality Risk Calculator'});
};