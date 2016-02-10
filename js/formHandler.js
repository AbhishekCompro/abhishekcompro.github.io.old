/**
 * Created by AbhishekK on 2/3/2016.
 */

var currentScenario = 'T1';
var currentItemNumber = 1;
var currentMethodNumber = 1;
var currentActionNumber = 1;
var taskDataFilled = {};

updateCurrent = function(callback){
    // get and update from breadcrum
    var currentScenarioLSM =   localStorage.getItem('currentScenario');
    if(currentScenarioLSM){currentScenario = currentScenarioLSM};

    var currentItemNumberLSM = JSON.parse(localStorage.getItem('currentItemNumber'));
    if(currentItemNumberLSM){currentItemNumber = parseInt(currentItemNumberLSM)};

    var currentMethodNumberLSM = JSON.parse(localStorage.getItem('currentMethodNumber'));
    if(currentMethodNumberLSM){currentMethodNumber = parseInt(currentMethodNumberLSM)};

    var currentActionNumberLSM = JSON.parse(localStorage.getItem('currentActionNumber'));
    if(currentActionNumberLSM){currentActionNumber = parseInt(currentActionNumberLSM)};

    taskDataFilled =   JSON.parse(localStorage.getItem('taskData'));

    callback();
};



var fillTaskDetails = function(){

    if(taskDataFilled.name){
        $('#inputTaskName').val(taskDataFilled.name)
    };

    if(taskDataFilled.id){
        $('#inputTaskId').val(taskDataFilled.id);
    };

    if(taskDataFilled.description){
        $('#taskDescription').val(taskDataFilled.description);
    };

};

var fillMethodDetails = function(){

    if(taskDataFilled.items[currentItemNumber-1].methods[currentMethodNumber-1].type){
        $('#method-type').val(taskDataFilled.items[currentItemNumber-1].methods[currentMethodNumber-1].type);
    }

    if(taskDataFilled.items[currentItemNumber-1].methods[currentMethodNumber-1].group){
        $('#method-group').val(taskDataFilled.items[currentItemNumber-1].methods[currentMethodNumber-1].group);
    }


};

var fillActionDetails = function(){


};


var refreshForm = function(){
    updateCurrent(function(){
        fillTaskDetails();
        fillMethodDetails();
        fillActionDetails();
    });
}

$('.sidebar-menu').on('click', '.treeview', function() {
    refreshForm();
});

refreshForm();

// todo: reset form fields if no data exist for that node