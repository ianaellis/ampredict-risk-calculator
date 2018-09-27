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

	//Validation Checks
	req.checkBody('platelet_count', 'Question 10 cannot be left blank. Please fill in value for platelet count.').notEmpty();
	// req.checkBody('platelet_count', 'Question 10 cannot be left blank. Please fill in value for platelet count.').isNumber();
	var errors = req.validationErrors();

	//Create new 'store' object with escaped and trimmed data 
	var predModel = new Store(
		{ platelet_count: req.body.platelet_count }
		);

	if (errors) {
		//Validation or Sanitation checks did not pass
		res.render('predictionModel', { title: 'AMPREDICT Mortality Risk Calculator', store: predModel, errors: errors});
	return;
	}
	else {
		//For comparing results on output page
		var predModel_TM = new Store(
			{ amputation_level: 1, age: req.body.age, bmi: req.body.bmi, race: req.body.race, functional_status: req.body.functional_status, heart_failure: req.body.heart_failure, dialysis: req.body.dialysis, blood_nitrogen: req.body.blood_nitrogen, wbc: req.body.WBC, platelet_count: req.body.platelet_count}
			);
//
//MORTALITY CALCULATOR
//
		// Variable strings
		var amp_lvl_string = "";
		var age_string = req.body.age;
		var gender_string = "";
		var bmi_string = req.body.bmi;
		var race_string = "";
		var marital_string = "";
		var education_string = "";
		var smoke_string = "";
		var alcohol_string = "";
		var anticoagulants_string = "";
		var health_string = "";
		var function_string = "";
		var heart_failure_string = "";
		var dialysis_string = "";
		var diabetes_string = "";
		var revascularization_string = "";
		var kidney_string = "";
		var copd_string = "";
		var anxiety_string = "";
		var gangrene_string = "";

		var bun_string = req.body.blood_nitrogen;
		var blood_string = "";
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
		var platelet_calc = (Math.pow((req.body.platelet_count/100), (-.5)) - .577)*1.7239; //Question 10
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
		var lower_platelet_calc = (Math.pow((req.body.platelet_count/100), (-.5)) - .577)*1.291; //Question 10
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
		var upper_platelet_calc = (Math.pow((req.body.platelet_count/100), (-.5)) - .577)*2.157; //Question 10
		const upper_constant_var = -2.014

		// Question Logic

		//Question 1
		if (req.body.amputation_level == 1){ //TM
			//Do Nothing, value remains 0
			amp_lvl_string = "Transmetatarsal";
		} else if (req.body.amputation_level == 2){ //TT
			amp_lvl_calc = .295483;
			lower_amp_lvl_calc = .12677;
			upper_amp_lvl_calc = .46419;
			amp_lvl_string = "TT";
		} else if (req.body.amputation_level == 3){ //TF
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
		if(req.body.WBC == 1){
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
//
//REAMPUTATION CALCULATOR
//
		//Variables


			//Coeffs
			var reamp_coeff_amp_lvl_calc = 0;
			var reamp_coeff_gender = 0;
			var reamp_coeff_tm_with_diabetes = 0;
			var reamp_coeff_smoke = 0;
			var reamp_coeff_alcohol = 0;
			var reamp_coeff_tm_kidney_failure = 0;
			var reamp_coeff_copd = 0;
			var reamp_coeff_wbc = 0;
			var reamp_coeff_diabetes = 0;
			var reamp_coeff_diabetes_revascular = 0;
			var reamp_coeff_output_anticoag = 0;
			var reamp_coeff_rest_gangrene = 0;
			var reamp_coeff_tm_smoking = 0;
			var reamp_coeff_CONSTANT = -2.280;

			//Lower
			var reamp_lower_amp_lvl_calc = 0;
			var reamp_lower_gender = 0;
			var reamp_lower_tm_with_diabetes = 0;
			var reamp_lower_smoke = 0;
			var reamp_lower_alcohol = 0;
			var reamp_lower_tm_kidney_failure = 0;
			var reamp_lower_copd = 0;
			var reamp_lower_wbc = 0;
			var reamp_lower_diabetes = 0;
			var reamp_lower_diabetes_revascular = 0;
			var reamp_lower_output_anticoag = 0;
			var reamp_lower_rest_gangrene = 0;
			var reamp_lower_tm_smoking = 0;
			var reamp_lower_CONSTANT = -2.34;

			//upper
			var reamp_upper_amp_lvl_calc = 0;
			var reamp_upper_gender = 0;
			var reamp_upper_tm_with_diabetes = 0;
			var reamp_upper_smoke = 0;
			var reamp_upper_alcohol = 0;
			var reamp_upper_tm_kidney_failure = 0;
			var reamp_upper_copd = 0;
			var reamp_upper_wbc = 0;
			var reamp_upper_diabetes = 0;
			var reamp_upper_diabetes_revascular = 0;
			var reamp_upper_output_anticoag = 0;
			var reamp_upper_rest_gangrene = 0;
			var reamp_upper_tm_smoking = 0;
			var reamp_upper_CONSTANT = -2.22;

		//Question 1 - Tm/TT/TF
		if (req.body.amputation_level == 1){ //TM
			//Do Nothing, value remains 0
			amp_lvl_string = "Transmetatarsal";
		} else if (req.body.amputation_level == 2){ //TT
			reamp_coeff_amp_lvl_calc = -.1499;
			reamp_lower_amp_lvl_calc = -.183;
			reamp_upper_amp_lvl_calc = -.116;
			amp_lvl_string = "TT";
		} else if (req.body.amputation_level == 3){ //TF
			reamp_coeff_amp_lvl_calc = -1.474;
			reamp_lower_amp_lvl_calc = -1.51;
			reamp_upper_amp_lvl_calc = -1.44;
			amp_lvl_string = "TF";
		}

		//Question 2 - Male
		if (req.body.Gender == 1){
			reamp_coeff_gender = .894;
			reamp_lower_gender = .841;
			reamp_upper_gender = .947;
			gender_string = "Male";
		} else if (req.body.Gender == 2){
			gender_string = "Female";
		}

		//Question 3/9/10 - TM With Diabetes \ Diabetes \ Diabetes & Revascularization
		if (req.body.Diabetes == 1){
			reamp_coeff_diabetes = -.454;
			reamp_lower_diabetes = -.468;
			reamp_upper_diabetes = -.441;
			diabetes_string = "Diabetes";
			if (req.body.amputation_level == 1){
				reamp_coeff_tm_with_diabetes = .881;
				reamp_lower_tm_with_diabetes = .849;
				reamp_upper_tm_with_diabetes = .913;
			}
			if (req.body.Revascularization == 1){
				reamp_coeff_diabetes_revascular = .335;
				reamp_lower_diabetes_revascular = .320;
				reamp_upper_diabetes_revascular = .351;
				revascularization_string = "Revascularization";
			}
		}

		//Question 4 - Smoke
		if (req.body.Smoke == 1){
			reamp_coeff_smoke = .316;
			reamp_lower_smoke = .323;
			reamp_upper_smoke = .348;
			smoke_string = "Yes";
		} else if (req.body.Smoke == 0){
			smoke_string = "No";
		}

		//Question 5 - Alcohol abuse
		if (req.body.Alcohol == 1){
			reamp_coeff_alcohol = .316;
			reamp_lower_alcohol = .297;
			reamp_upper_alcohol = .334;
			alcohol_string = "Yes";
		}else if (req.body.Alcohol == 0){
			alcohol_string = "No";
		}

		//Question 6/13 - TM & Kidney Failure \ TM & Smoking
		if (req.body.KidneyFailure == 1){
			kidney_string = "Kidney Failure";
		}
		if (req.body.amputation_level == 1){
			if (req.body.KidneyFailure == 1){
				reamp_coeff_tm_kidney_failure = .836;
				reamp_lower_tm_kidney_failure = .797;
				reamp_upper_tm_kidney_failure = .875;
			}
			if (req.body.Smoke == 1){
				reamp_coeff_tm_smoking = -.424;
				reamp_lower_tm_smoking = -.449;
				reamp_upper_tm_smoking = -.398;
			}
		}
		//Question 7 - COPD
		if (req.body.COPD == 1){
			reamp_coeff_copd = .326;
			reamp_lower_copd = .310;
			reamp_upper_copd = .341;
			copd_string = "COPD";
		}

		//Question 8 - WBC >= 11000
		if (req.body.WBC == 1){
			reamp_coeff_wbc = .583;
			reamp_lower_wbc = .572;
			reamp_upper_wbc = .593;
		}

		//Question 11 - Output Anticoagulants
		if (req.body.OutputAnticoagulants == 1){
			reamp_coeff_output_anticoag = .279;
			reamp_lower_output_anticoag = .263;
			reamp_upper_output_anticoag = .294;
			anticoagulants_string = "Yes";
		} else if (req.body.OutputAnticoagulants == 0){
			anticoagulants_string = "No";
		}

		//Question 12 - Rest Pain / Gangrene
		if (req.body.RestGangrene == 1){
			reamp_coeff_rest_gangrene = .344;
			reamp_lower_rest_gangrene = .333;
			reamp_upper_rest_gangrene = .356;
			gangrene_string = "Gangrene/Rest Pain";
		}


	//Final Calculations
		var reamp_logit_prob = (reamp_coeff_amp_lvl_calc + reamp_coeff_gender + reamp_coeff_tm_with_diabetes + reamp_coeff_smoke + reamp_coeff_alcohol + reamp_coeff_tm_kidney_failure + reamp_coeff_copd + reamp_coeff_wbc + reamp_coeff_diabetes + reamp_coeff_diabetes_revascular + reamp_coeff_output_anticoag + reamp_coeff_rest_gangrene + reamp_coeff_tm_smoking + reamp_coeff_CONSTANT).toFixed(4);
	    var reamp_lower_logit_prob = (reamp_lower_amp_lvl_calc + reamp_lower_gender + reamp_lower_tm_with_diabetes + reamp_lower_smoke + reamp_lower_alcohol + reamp_lower_tm_kidney_failure + reamp_lower_copd + reamp_lower_wbc + reamp_lower_diabetes + reamp_lower_diabetes_revascular + reamp_lower_output_anticoag + reamp_lower_rest_gangrene + reamp_lower_tm_smoking + reamp_lower_CONSTANT).toFixed(4);
	    var reamp_upper_logit_prob = (reamp_upper_amp_lvl_calc + reamp_upper_gender + reamp_upper_tm_with_diabetes + reamp_upper_smoke + reamp_upper_alcohol + reamp_upper_tm_kidney_failure + reamp_upper_copd + reamp_upper_wbc + reamp_upper_diabetes + reamp_upper_diabetes_revascular + reamp_upper_output_anticoag + reamp_upper_rest_gangrene + reamp_upper_tm_smoking + reamp_upper_CONSTANT).toFixed(4);
	    var reamp_prob = (Math.pow(2.71828, reamp_logit_prob))/(1+(Math.pow(2.71828, reamp_logit_prob))).toFixed(4);
	    var reamp_lower_ci = (Math.pow(2.71828, reamp_lower_logit_prob))/(1+(Math.pow(2.71828, reamp_lower_logit_prob))).toFixed(4);
	    var reamp_upper_ci = (Math.pow(2.71828, reamp_upper_logit_prob))/(1+(Math.pow(2.71828, reamp_upper_logit_prob))).toFixed(4);

	    var reamp_highProb = false;
	    if(reamp_prob > .24){
	    	reamp_highProb = true;
	    }

	    // res.json(upper_ci);

//
//Basic Mobility CALCULATOR
//
		//Variables

			//Coeffs
			var mob_coeff_amp_lvl_calc = 0;
			var mob_coeff_age = (req.body.age - 60)*(-0.125);
			var mob_coeff_bmi = (req.body.bmi - 30)*(-0.008); 
			var mob_coeff_race = 0;
			var mob_coeff_marital = 0;
			var mob_coeff_education = 0;
			var mob_coeff_diabetes = 0;
			var mob_coeff_dialysis = 0;
			var mob_coeff_copd = 0;
			var mob_coeff_anxietyDepression = 0;
			var mob_coeff_selfHealth = 0;
			var mob_coeff_CONSTANT = 2.57;

			//Lower
			var mob_lower_amp_lvl_calc = 0;
			var mob_lower_age = (req.body.age - 60)*(-.187);
			var mob_lower_bmi = (req.body.bmi - 30)*(-0.1087); 
			var mob_lower_race = 0;
			var mob_lower_marital = 0;
			var mob_lower_education = 0;
			var mob_lower_diabetes = 0;
			var mob_lower_dialysis = 0;
			var mob_lower_copd = 0;
			var mob_lower_anxietyDepression = 0;
			var mob_lower_selfHealth = 0;
			var mob_lower_CONSTANT = -0.058;

			//upper
			var mob_upper_amp_lvl_calc = 0;
			var mob_upper_age = (req.body.age - 60)*(-0.063);
			var mob_upper_bmi = (req.body.bmi - 30)*(-0.0175); 
			var mob_upper_race = 0;
			var mob_upper_marital = 0;
			var mob_upper_education = 0;
			var mob_upper_diabetes = 0;
			var mob_upper_dialysis = 0;
			var mob_upper_copd = 0;
			var mob_upper_anxietyDepression = 0;
			var mob_upper_selfHealth = 0;
			var mob_upper_CONSTANT = 5.19;

		//Question 1 - Surgery
		if (req.body.amputation_level == 1){ //TM
			//Do Nothing, value remains 0
			amp_lvl_string = "Transmetatarsal";
		} else if (req.body.amputation_level == 2){ //TT
			mob_coeff_amp_lvl_calc = -1.12;
			mob_lower_amp_lvl_calc = -2.19;
			mob_upper_amp_lvl_calc = -0.054;
			amp_lvl_string = "Transtibial";
		} else if (req.body.amputation_level == 3){ //TF
			mob_coeff_amp_lvl_calc = -2.8;
			mob_lower_amp_lvl_calc = -4.36;
			mob_upper_amp_lvl_calc = -1.25;
			amp_lvl_string = "Transfemoral";
		}

		//Question 2 - Age
		//Check for missing age response

		//Question 3 - BMI
		//Check for missing BMI response

		//Question 4 - Race 
		// Not sure what multipliers apply to - so for now its white or not white
		if (req.body.race == 1){ //White
			race_string = "White";
			mob_coeff_race = 1.1;
			mob_lower_race = 0.155;
			mob_upper_race = 2.04;
		}

		//Question 5 - Marital Status
		if (req.body.MaritalStatus == 1){ // Married
			mob_coeff_marital = 0.995;
			mob_lower_marital = 0.133;
			mob_upper_marital = 1.86;
			marital_string = "Yes";
		} else if (req.body.MaritalStatus == 0){
			marital_string = "No";
		}

		//Question 6 - Education Level
		if(req.body.EducationStatus == 1){
			mob_coeff_education = 1.28;
			mob_lower_education = -0.678;
			mob_upper_education = 3.24;
			education_string = ">= High School";
		}else if (req.body.EducationStatus == 0){
			education_string = "< High School";
		}

		//Question 7 - Diabetes
		if (req.body.Diabetes == 1){
			mob_coeff_diabetes = -1.76;
			mob_lower_diabetes = -3.07;
			mob_upper_diabetes = -0.439;
		}

		//Question 8 - Dialyis
		if (req.body.dialysis == 1){
			mob_coeff_dialysis = -1.19;
			mob_lower_dialysis = -2.56;
			mob_upper_dialysis = 0.18;
		}

		//Question 9 - COPD
		if (req.body.COPD == 1){
			mob_coeff_copd = -1.74;
			mob_lower_copd = -2.95;
			mob_upper_copd = -0.519;
		}

		//Question 10 - Anxiety/Depression
		if (req.body.AnxietyDepression == 1){
			mob_coeff_anxietyDepression = -0.796;
			mob_lower_anxietyDepression = -1.7;
			mob_upper_anxietyDepression = 0.107;
			anxiety_string = "Anxiety/Depression";
		}

		//Question 11 - Self Rated Health
		if (req.body.SelfRatedHealth == 0){
			mob_coeff_selfHealth = -0.713;
			mob_lower_selfHealth = -1.61;
			mob_upper_selfHealth = 0.719;
			health_string = "Bad";
		}else if (req.body.SelfRatedHealth == 1){
			health_string == "Good";
		}

		//Basic Moblity Final Calculations
		var mob_logit_prob = (mob_coeff_amp_lvl_calc + mob_coeff_age + mob_coeff_bmi + mob_coeff_race + mob_coeff_marital + mob_coeff_education + mob_coeff_diabetes + mob_coeff_dialysis + mob_coeff_copd + mob_coeff_anxietyDepression + mob_coeff_selfHealth + mob_coeff_CONSTANT).toFixed(4);
	    var mob_lower_logit_prob = (mob_lower_amp_lvl_calc + mob_lower_age + mob_lower_bmi + mob_lower_race + mob_lower_marital + mob_lower_education + mob_lower_diabetes + mob_lower_dialysis + mob_lower_copd + mob_lower_anxietyDepression + mob_lower_selfHealth + mob_lower_CONSTANT).toFixed(4);
	    var mob_upper_logit_prob = (mob_upper_amp_lvl_calc + mob_upper_age + mob_upper_bmi + mob_upper_race + mob_upper_marital + mob_upper_education + mob_upper_diabetes + mob_upper_dialysis + mob_upper_copd + mob_upper_anxietyDepression + mob_upper_selfHealth + mob_upper_CONSTANT).toFixed(4);
	    var mob_prob = (Math.pow(2.71828, mob_logit_prob))/(1+(Math.pow(2.71828, mob_logit_prob))).toFixed(4);
	    var mob_lower_ci = (Math.pow(2.71828, mob_lower_logit_prob))/(1+(Math.pow(2.71828, mob_lower_logit_prob))).toFixed(4);
	    var mob_upper_ci = (Math.pow(2.71828, mob_upper_logit_prob))/(1+(Math.pow(2.71828, mob_upper_logit_prob))).toFixed(4);

	    var mob_highProb = false;
	    if(mob_prob > .66){
	    	mob_highProb = true;
	    }

//
//Advanced Mobility CALCULATOR
//
		//Variables

			//Coeffs
			var aMob_coeff_amp_lvl_calc = 0;
			var aMob_coeff_age = (req.body.age - 60)*(-0.138);
			var aMob_coeff_bmi = (req.body.bmi - 30)*(-0.064); 
			var aMob_coeff_race = 0;
			var aMob_coeff_marital = 0;
			var aMob_coeff_dialysis = 0;
			var aMob_coeff_anxietyDepression = 0;
			var aMob_coeff_selfHealth = 0;
			var aMob_coeff_CONSTANT = -1.34;

			//Lower
			var aMob_lower_amp_lvl_calc = 0;
			var aMob_lower_age = (req.body.age - 60)*(-0.205);
			var aMob_lower_bmi = (req.body.bmi - 30)*(-0.125); 
			var aMob_lower_race = 0;
			var aMob_lower_marital = 0;
			var aMob_lower_dialysis = 0;
			var aMob_lower_anxietyDepression = 0;
			var aMob_lower_selfHealth = 0;
			var aMob_lower_CONSTANT = -2.62;

			//upper
			var aMob_upper_amp_lvl_calc = 0;
			var aMob_upper_age = (req.body.age - 60)*(-0.071);
			var aMob_upper_bmi = (req.body.bmi - 30)*(-0.003); 
			var aMob_upper_race = 0;
			var aMob_upper_marital = 0;
			var aMob_upper_dialysis = 0;
			var aMob_upper_anxietyDepression = 0;
			var aMob_upper_selfHealth = 0;
			var aMob_upper_CONSTANT = -0.03;

		//Question 1 - Surgery
		if (req.body.amputation_level == 1){ //TM
			//Do Nothing, value remains 0
			amp_lvl_string = "Transmetatarsal";
		} else if (req.body.amputation_level == 2){ //TT
			aMob_coeff_amp_lvl_calc = 0.016;
			aMob_lower_amp_lvl_calc = -0.904;
			aMob_upper_amp_lvl_calc = 0.936;
			amp_lvl_string = "Transtibial";
		} else if (req.body.amputation_level == 3){ //TF
			aMob_coeff_amp_lvl_calc = -1.3;
			aMob_lower_amp_lvl_calc = -2.69;
			aMob_upper_amp_lvl_calc = -0.081;
			amp_lvl_string = "Transfemoral";
		}

		//Question 2 - Age
		//Check for missing age response

		//Question 3 - BMI
		//Check for missing BMI response

		//Question 4 - Race 
		// Not sure what multipliers apply to - so for now its white or not white
		if (req.body.race == 1){ //White
			race_string = "White";
			aMob_coeff_race = 2.01;
			aMob_lower_race = 0.799;
			aMob_upper_race = 3.21;
		}

		//Question 5 - Marital Status
		if (req.body.MaritalStatus == 1){ // Married
			aMob_coeff_marital = 1.16;
			aMob_lower_marital = 0.296;
			aMob_upper_marital = 2.03;
		}

		//Question 6 - Dialyis
		if (req.body.dialysis == 1){
			aMob_coeff_dialysis = -1.02;
			aMob_lower_dialysis = -1.46;
			aMob_upper_dialysis = 0.409;
		}

		//Question 7 - Anxiety/Depression
		if (req.body.AnxietyDepression == 1){
			aMob_coeff_anxietyDepression = -1.56;
			aMob_lower_anxietyDepression = -2.54;
			aMob_upper_anxietyDepression = -0.587;
		}

		//Question 8 - Self Rated Health
		if (req.body.SelfRatedHealth == 1){
			aMob_coeff_selfHealth = -1.19;
			aMob_lower_selfHealth = -2.08;
			aMob_upper_selfHealth = -0.307;
		}

		//Advanced Moblity Final Calculations
		var aMob_logit_prob = (aMob_coeff_amp_lvl_calc + aMob_coeff_age + aMob_coeff_bmi + aMob_coeff_race + aMob_coeff_marital + aMob_coeff_dialysis + aMob_coeff_anxietyDepression + aMob_coeff_selfHealth + aMob_coeff_CONSTANT).toFixed(4);
	    var aMob_lower_logit_prob = (aMob_lower_amp_lvl_calc + aMob_lower_age + aMob_lower_bmi + aMob_lower_race + aMob_lower_marital + aMob_lower_dialysis + aMob_lower_anxietyDepression + aMob_lower_selfHealth + aMob_lower_CONSTANT).toFixed(4);
	    var aMob_upper_logit_prob = (aMob_upper_amp_lvl_calc + aMob_upper_age + aMob_upper_bmi + aMob_upper_race + aMob_upper_marital + aMob_upper_dialysis + aMob_upper_anxietyDepression + aMob_upper_selfHealth + aMob_upper_CONSTANT).toFixed(4);
	    var aMob_prob = (Math.pow(2.71828, aMob_logit_prob))/(1+(Math.pow(2.71828, aMob_logit_prob))).toFixed(4);
	    var aMob_lower_ci = (Math.pow(2.71828, aMob_lower_logit_prob))/(1+(Math.pow(2.71828, aMob_lower_logit_prob))).toFixed(4);
	    var aMob_upper_ci = (Math.pow(2.71828, aMob_upper_logit_prob))/(1+(Math.pow(2.71828, aMob_upper_logit_prob))).toFixed(4);

	    var aMob_highProb = false;
	    if(aMob_prob > .32){
	    	aMob_highProb = true;
	    }

	    res.render('predictionModelOutcome', {predModel_TM, platelet_calc, comorbid, highProb, logit_prob, lower_logit_prob, upper_logit_prob, prob,
	     lower_ci, upper_ci, amp_lvl_string, age_string, bmi_string, race_string, function_string, heart_failure_string, dialysis_string, 
	     bun_string, blood_string, platelet_string: platelet_calc, comorbid, highProb, logit_prob, lower_logit_prob, upper_logit_prob, prob, 
	     lower_ci, upper_ci, amp_lvl_string, age_string, bmi_string, race_string, function_string, heart_failure_string, dialysis_string, bun_string, 
	     blood_string, platelet_string, 
	     reamp_logit_prob, reamp_lower_logit_prob, reamp_upper_logit_prob, reamp_prob, reamp_lower_ci, reamp_upper_ci, reamp_coeff_gender, 
	     mob_logit_prob, mob_lower_logit_prob, mob_upper_logit_prob, mob_prob, mob_lower_ci, mob_upper_ci, mob_prob, mob_highProb, 
	     aMob_logit_prob, aMob_lower_logit_prob, aMob_upper_logit_prob, aMob_prob, aMob_lower_ci, aMob_upper_ci, aMob_prob, aMob_highProb, 
	     gender_string, marital_string, education_string, diabetes_string, revascularization_string, kidney_string, copd_string, anxiety_string, gangrene_string, 
	     smoke_string, alcohol_string, anticoagulants_string, health_string});
	}


};

exports.predictionModel = async (req, res) => {
	res.render('predictionModel', { title: 'AMPREDICT Risk Calculator'});
};