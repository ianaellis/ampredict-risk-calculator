var currentSection = 0; // Current tab is set to be the first tab (0)
showSection(currentSection); // Display the current tab
console.log("inside multistep form logic");

function showSection(n) {
  // This function will display the specified form_section of the form ...
  console.log("inside showSection");
  var x = document.getElementsByClassName(".form_section");
  console.log("Contents of  x: " + x[n]);
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  console.log("inside nextPrev");
  // This function will figure out which form_section to display
  var x = document.getElementsByClassName(".form_section");
  // Exit the function if any field in the current form_section is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current form_section:
  x[currentSection].style.display = "none";
  // Increase or decrease the current form_section by 1:
  currentSection = currentSection + n;
  // if you have reached the end of the form... :
  if (currentSection >= x.length) {
    //...the form gets submitted:
    document.getElementById("risk_calc").submit();
    return false;
  }
  // Otherwise, display the correct form_section:
  showSection(currentSection);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName(".form_section");
  y = x[currentSection].getElementsByTagName("input");
  // A loop that checks every input field in the current form_section:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentSection].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

export default nextPrev;