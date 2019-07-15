import '../sass/style.scss';
// import { parsley } from '../../node_modules/parsleyjs/dist/parsley.js';
import parsley from 'parsleyjs';

//import { $$ } from './modules/bling';
import navigateTo from './modules/wizardForm';
import thermometer from './modules/thermometer';

$(document).ready(function () {
    $('#output_tabs').tabs({
    	active: 0
    });

    $('#mortality_tabs').tabs({
        active: 0
    });
    showAllTabs('all_output', '#output_tabs', $('#all_output'));

    // $(document).on('click', '#output_tabs .ui-tab', function() {
    //     if($(this).attr('id') == 'all_output') {
    //         $('#output_tabs .ui-tabs-panel').show();
    //     } else {
    //         $('#output_tabs .ui-tabs-panel[aria-hidden="true"]').hide();
    //     }
    // }).on('click', '#all_output', function() {
    //     if($('#all_output').hasClass('ui-state-active')){
    //         $('#output_tabs .ui-tabs-panel').show();
    //     }
    // });

    $(document).on('click', '#mortality_tabs .ui-tab', function() {
        showAllTabs('both_mortality', '#mortality_tabs', $(this));
    })

    function showAllTabs(id, wrapperID, $element) {
        if($element.attr('id') == id) {
            $(wrapperID + ' > .ui-tabs-panel').show();
      } else {
            $(wrapperID + ' > .ui-tabs-panel[aria-hidden="true"]').hide();
      }
    }

    showAllTabs('all_output', '#output_tabs', $('#all_output'));
    showAllTabs('both_mortality', '#mortality_tabs', $('#both_mortality'));
});


// $(document).ready(function () {
//     $('#output_tabs').tabs({
//         // active: 0
//     });
//     $(document).on('click', '#all', function() {
//         $('#output_tabs .ui-tabs-panel').show();
//         $('#output_tabs li').removeClass('ui-tabs-active').removeClass('ui-state-active');
//         $('#all').addClass('ui-tabs-active').addClass('ui-state-active');
//     }).on('click', '#output_tabs li', function() {
//         $('#all').removeClass('ui-tabs-active').removeClass('ui-state-active');
//     });
// });


// import showSection from './modules/multiStepForm';
// import nextPrev from './modules/multiStepForm';
// import curIndex from './modules/wizardForm';
// navigateTo(0);

// showSection( $('.form_section') );
// nextPrev( $('.form_section') );


//require('./modules/thermometer')();
// require('./modules/wizardForm')();

// const $sections = $$('.form_section');
// $sections.on('.next', curIndex);



