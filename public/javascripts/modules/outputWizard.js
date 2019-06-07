
//Mostly taken from http://parsleyjs.org/doc/examples/multisteps.html
var $sections = $('.output_section');


function navigateTo(index) {
  // Mark the current section with the class 'current'
  $sections
    .removeClass('current')
    .eq(index)
      .addClass('current');

  // Show only the navigation buttons that make sense for the current section:
  $('.form-navigation .previous').toggle(index > 0);
  var atTheEnd = index >= $sections.length - 1;
  $('.form-navigation .next').toggle(!atTheEnd);
  $('.form-navigation [type=submit]').toggle(atTheEnd);
  fixStepIndicatorX(index);
}

//Return the current index by looking at which section has the class 'current'
function curIndex() {
  return $sections.index($sections.filter('.current'));
}

function fixStepIndicatorX(currentStep) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("stepX");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  if (document.getElementsByClassName("stepX").length != 0){
    x[currentStep].className += " active";
  }

}

////BUTTONS
//Previous
$('.form-navigation .previous').click(function() {
    navigateTo(curIndex() - 1);
});
//Next
$('.form-navigation .next').click(function() {
  $('#risk_calc').parsley().whenValidate({
    group: 'block-' + curIndex()
  }).done(function() {
    navigateTo(curIndex() + 1);
  });
});

////Validation Group
$sections.each(function(index, section) {
    $(section).find(':input').attr('data-parsley-group', 'block-' + index);
  });
navigateTo(0); // Start at the beginning

export default navigateTo;