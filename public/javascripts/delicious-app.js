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

    // // Button : Both
    // $('#both_mortality').on('click', function() {
    //     console.log("hi");
    //     $('#mortality_tabs .ui-tabs-panel').show();
    //     $('#mortality_tabs').removeClass('ui-tabs-active').removeClass('ui-state-active');
    //     // $('#both').addClass('ui-tabs-active').addClass('ui-state-active');
    // }).on('click', '#mortality_tabs .ui-tab', function() {
    //     // $('#both').removeClass('ui-tabs-active').removeClass('ui-state-active');
    //     $('#mortality_tab-1, #mortality_tab-2').hide();
    // });
    // $('#mortality_tab-1, #mortality_tab-2').show();
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



