/**
 * Created by aksh on 2/3/2016.
 */

$('#scenario').on('click','li' , function() {
    $('#scenario li').attr('class', '');
    $(this).attr('class', 'active');

    $('#b_scenario').html('<i class="fa fa-dashboard"> Scenario ' + $(this).attr('id'));


    $('#b_scenario').attr('data-scenario', $(this).attr('id'));

    // todo: update scenario in LSM

});

$('.sidebar-menu').on('click', '.treeview', function() {
    resetForm();

});

var resetForm = function(){

    $(".functionDisplayName").text('');
    $("#actionDetailsForm").empty();

}
