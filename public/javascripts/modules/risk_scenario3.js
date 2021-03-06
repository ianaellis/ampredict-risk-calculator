// Scenarios for demo purposes

function autoFill_scenario1(){
    document.getElementById("age").value = 72;
    //BMI of 20.1
    document.getElementById("Height").value = 69;
    document.getElementById("Weight").value = 135;

    //Sex = Male
    var genderRadio = document.getElementsByName("Gender");
    for (var i = 0; i < genderRadio.length; i++){
        if(genderRadio[i].getAttribute('value') == '1'){
            genderRadio[i].checked = true;
        }
    }

    //Married = Yes
    var marriedRadio = document.getElementsByName("MaritalStatus");
    for (var i = 0; i < marriedRadio.length; i++){
        if(marriedRadio[i].getAttribute('value') == '1'){
            marriedRadio[i].checked = true;
        }
    }

    //Race = White (1)
    var raceRadio = document.getElementsByName("race");
    for (var i = 0; i < raceRadio.length; i++){
        if(raceRadio[i].getAttribute('value') == '1'){
            raceRadio[i].checked = true;
        }
    }

    //Education = High school grad (1)
    var educationRadio = document.getElementsByName("EducationStatus");
    for (var i = 0; i < educationRadio.length; i++){
        if(educationRadio[i].getAttribute('value') == '1'){
            educationRadio[i].checked = true;
        }
    }

    //Functional Status = Partially (2)
    var funcStatusRadio = document.getElementsByName("functional_status");
    for (var i = 0; i < funcStatusRadio.length; i++){
        if(funcStatusRadio[i].getAttribute('value') == '2'){
            funcStatusRadio[i].checked = true;
        }
    }

    //Diabetes = Yes (1)
    var diabetesRadio = document.getElementsByName("Diabetes");
    for (var i = 0; i < diabetesRadio.length; i++){
        if(diabetesRadio[i].getAttribute('value') == '1'){
            diabetesRadio[i].checked = true;
        }
    }

    //COPD = No (0)
    var copdRadio = document.getElementsByName("COPD");
    for (var i = 0; i < copdRadio.length; i++){
        if(copdRadio[i].getAttribute('value') == '1'){
            copdRadio[i].checked = true;
        }
    }

    //Heart Failure (CHF) = Yes (1)
    var chfRadio  = document.getElementsByName("heart_failure");
    for (var i = 0; i < chfRadio.length; i++){
        if(chfRadio[i].getAttribute('value') == '1'){
            chfRadio[i].checked = true;
        }
    }

    //Dialysis = Yes (1)
    var dialysisRadio  = document.getElementsByName("dialysis");
    for (var i = 0; i < dialysisRadio.length; i++){
        if(dialysisRadio[i].getAttribute('value') == '1'){
            dialysisRadio[i].checked = true;
        }
    }

    //Kidney Failure = Yes (1)
    var kidneyRadio  = document.getElementsByName("KidneyFailure");
    for (var i = 0; i < kidneyRadio.length; i++){
        if(kidneyRadio[i].getAttribute('value') == '1'){
            kidneyRadio[i].checked = true;
        }
    }

    //Anxiety/Depression = No (0)
    var anxietyRadio  = document.getElementsByName("AnxietyDepression");
    for (var i = 0; i < anxietyRadio.length; i++){
        if(anxietyRadio[i].getAttribute('value') == '0'){
            anxietyRadio[i].checked = true;
        }
    }

    //Smoker = Yes (1)
    var smokerRadio  = document.getElementsByName("Smoke");
    for (var i = 0; i < smokerRadio.length; i++){
        if(smokerRadio[i].getAttribute('value') == '1'){
            smokerRadio[i].checked = true;
        }
    }

    //Alcohol = No (0)
    var alcoholRadio  = document.getElementsByName("Alcohol");
    for (var i = 0; i < alcoholRadio.length; i++){
        if(alcoholRadio[i].getAttribute('value') == '0'){
            alcoholRadio[i].checked = true;
        }
    }

    //Revasc = Yes (1)
    var revascRadio  = document.getElementsByName("Revascularization");
    for (var i = 0; i < revascRadio.length; i++){
        if(revascRadio[i].getAttribute('value') == '1'){
            revascRadio[i].checked = true;
        }
    }

    //Anticoag = Yes (1)
    var antiCoagRadio  = document.getElementsByName("OutputAnticoagulants");
    for (var i = 0; i < antiCoagRadio.length; i++){
        if(antiCoagRadio[i].getAttribute('value') == '1'){
            antiCoagRadio[i].checked = true;
        }
    }

    //BUN = 70
    document.getElementById("blood_nitrogen").value = 70;

    //WBC greater than = Yes (1)
    var wbcRadio  = document.getElementsByName("WBC");
    for (var i = 0; i < wbcRadio.length; i++){
        if(wbcRadio[i].getAttribute('value') == '1'){
            wbcRadio[i].checked = true;
        }
    }

    // Platelets = 150 (so 150,000)
    document.getElementById("platelet_count").value = 150000;

    //Self Reported = Poor (4)
    var selfReportedRadio  = document.getElementsByName("SelfRatedHealth");
    for (var i = 0; i < selfReportedRadio.length; i++){
        if(selfReportedRadio[i].getAttribute('value') == '4'){
            selfReportedRadio[i].checked = true;
        }
    }
    // return true;
}

export default autoFill_scenario1
