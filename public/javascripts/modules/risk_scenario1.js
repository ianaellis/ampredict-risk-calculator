// Scenarios for demo purposes

function autoFill_scenario2(){
    document.getElementById("age").value = 72;
    //BMI of 20.1
    document.getElementById("Height").value = 69;
    document.getElementById("Weight").value = 203;

    //Sex = Male
    var genderRadio = document.getElementsByName("Gender");
    for (var i = 0; i < genderRadio.length; i++){
        if(genderRadio[i].getAttribute('value') == '1'){
            genderRadio[i].checked = true;
        }
    }

    //Married = No
    var marriedRadio = document.getElementsByName("MaritalStatus");
    for (var i = 0; i < marriedRadio.length; i++){
        if(marriedRadio[i].getAttribute('value') == '0'){
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

    //Functional Status = Ind
    var funcStatusRadio = document.getElementsByName("functional_status");
    for (var i = 0; i < funcStatusRadio.length; i++){
        if(funcStatusRadio[i].getAttribute('value') == '2'){
            funcStatusRadio[i].checked = true;
        }
    }

    //Diabetes = No (0)
    var diabetesRadio = document.getElementsByName("Diabetes");
    for (var i = 0; i < diabetesRadio.length; i++){
        if(diabetesRadio[i].getAttribute('value') == '1'){
            diabetesRadio[i].checked = true;
        }
    }

    //COPD = Yes (0)
    var copdRadio = document.getElementsByName("COPD");
    for (var i = 0; i < copdRadio.length; i++){
        if(copdRadio[i].getAttribute('value') == '1'){
            copdRadio[i].checked = true;
        }
    }

    //Heart Failure (CHF) = No
    var chfRadio  = document.getElementsByName("heart_failure");
    for (var i = 0; i < chfRadio.length; i++){
        if(chfRadio[i].getAttribute('value') == '0'){
            chfRadio[i].checked = true;
        }
    }

    //Dialysis = No
    var dialysisRadio  = document.getElementsByName("dialysis");
    for (var i = 0; i < dialysisRadio.length; i++){
        if(dialysisRadio[i].getAttribute('value') == '1'){
            dialysisRadio[i].checked = true;
        }
    }

    //Kidney Failure = No
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

    //Smoker = No
    var smokerRadio  = document.getElementsByName("Smoke");
    for (var i = 0; i < smokerRadio.length; i++){
        if(smokerRadio[i].getAttribute('value') == '0'){
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

    //Revasc = No
    var revascRadio  = document.getElementsByName("Revascularization");
    for (var i = 0; i < revascRadio.length; i++){
        if(revascRadio[i].getAttribute('value') == '0'){
            revascRadio[i].checked = true;
        }
    }

    //Anticoag = No
    var antiCoagRadio  = document.getElementsByName("OutputAnticoagulants");
    for (var i = 0; i < antiCoagRadio.length; i++){
        if(antiCoagRadio[i].getAttribute('value') == '0'){
            antiCoagRadio[i].checked = true;
        }
    }

    //BUN = 70
    document.getElementById("blood_nitrogen").value = 15;

    //WBC greater than = No
    var wbcRadio  = document.getElementsByName("WBC");
    for (var i = 0; i < wbcRadio.length; i++){
        if(wbcRadio[i].getAttribute('value') == '0'){
            wbcRadio[i].checked = true;
        }
    }

    // Platelets = 150 (so 150,000)
    document.getElementById("platelet_count").value = 250000;

    //Self Reported = Poor (4)
    var selfReportedRadio  = document.getElementsByName("SelfRatedHealth");
    for (var i = 0; i < selfReportedRadio.length; i++){
        if(selfReportedRadio[i].getAttribute('value') == '2'){
            selfReportedRadio[i].checked = true;
        }
    }
    // return true;
}

export default autoFill_scenario2
