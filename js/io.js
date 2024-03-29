/**
 * Created by AbhishekK on 2/2/2016.
 */

// LSM object:

var currentScenario = 'T1';
var currentItemNumber = 1;
var currentMethodNumber = 1;
var currentActionNumber = 1;

updateCurrentTreeNode = function(){
    // get and update from breadcrum
    var currentScenarioLSM =   localStorage.getItem('currentScenario');
    if(currentScenarioLSM){currentScenario = currentScenarioLSM};

    var currentItemNumberLSM = JSON.parse(localStorage.getItem('currentItemNumber'));
    if(currentItemNumberLSM){currentItemNumber = parseInt(currentItemNumberLSM)};

    var currentMethodNumberLSM = JSON.parse(localStorage.getItem('currentMethodNumber'));
    if(currentMethodNumberLSM){currentMethodNumber = parseInt(currentMethodNumberLSM)};

    var currentActionNumberLSM = JSON.parse(localStorage.getItem('currentActionNumber'));
    if(currentActionNumberLSM){currentActionNumber = parseInt(currentActionNumberLSM)};

    taskData =   JSON.parse(localStorage.getItem('taskData'));
};


function addValue(obj, key, index, value) {
    if (obj.hasOwnProperty(key)) {

        if(obj[key[index]]){
            obj[key[index]].push(value);
        }else{
            obj[key][index] = value;
        }
    } else {
        obj[key] = [value];
    }
};

var taskData = {
    init: false,
    scenario: '',
    id: '',
    name:'',
    description: '',
    items:[
        {
            init:false,
            skip:false,
            methods:[]
        },
        {
            init:false,
            skip:false,
            methods:[]
        },
        {
            init:false,
            skip:false,
            methods:[]
        },
        {
            init:false,
            skip:false,
            methods:[]
        },
        {
            init:false,
            skip:false,
            methods:[]
        }
    ]
};

var currentMethodDetails = {
    init: false,
    type:'',
    group:'',
    actions:[]
};

var currentActionDetails = {
    init: 'false',
    name: '',
    values: []
};

var taskDataRaw = {
    init: false,
    scenario: '',
    id: '',
    name:'',
    description: '',
    items:[
        {
            init:false,
            skip:false,
            methods:[]
        },
        {
            init:false,
            skip:false,
            methods:[]
        },
        {
            init:false,
            skip:false,
            methods:[]
        },
        {
            init:false,
            skip:false,
            methods:[]
        },
        {
            init:false,
            skip:false,
            methods:[]
        }
    ]
};

(function initLSM(){

    taskData =   JSON.parse(localStorage.getItem('taskData'));

    if(!taskData){
        localStorage.setItem('taskData', JSON.stringify(taskDataRaw));
    }

})();

resetLSM = function(){

    localStorage.setItem('taskData', JSON.stringify(taskDataRaw));
    updateCurrentTreeNode();

    localStorage.setItem('currentItemNumber', JSON.stringify(1));
    localStorage.setItem('currentMethodNumber', JSON.stringify(1));
    localStorage.setItem('currentActionNumber', JSON.stringify(1));
    localStorage.setItem('currentScenario', 'T1');
    currentMethodDetails = {
        init: false,
        type:'',
        group:'',
        actions:[]
    };

    currentActionDetails = {
        init: 'false',
        name: '',
        values: []
    };

}


var initCurrentTaskData = function(callback){

    taskData.scenario = currentScenario;
    taskData.id = $('#inputTaskId').val();
    taskData.name = $('#inputTaskName').val();
    taskData.description = $('#taskDescription').val();
    taskData.init = true;

    console.log('console.log(taskData.name) ' + taskData.name);
    localStorage.setItem('taskData', JSON.stringify(taskData));
    callback();

}

var saveTaskData = function(){
    initCurrentTaskData(function(){

        taskData =   JSON.parse(localStorage.getItem('taskData'));
        console.log('console.log(taskData.name) 2 ' + taskData);

    });
};

var initCurrentMethodData = function(callback){

    var methodType = $('#method-type').val();
    var methodGroup = $('#method-group').val();

    if(taskData.init){

        currentMethodDetails.type = methodType;
        currentMethodDetails.group = methodGroup;
        currentMethodDetails.init = true;

        console.log('currentItemNumber' + currentItemNumber);
        console.log('currentMethodNumber' + currentMethodNumber);

        taskData.items[parseInt(currentItemNumber) - 1].init = true;
        addValue(taskData.items[parseInt(currentItemNumber)-1],'methods', (parseInt(currentMethodNumber)-1) ,currentMethodDetails);
        localStorage.setItem('taskData', JSON.stringify(taskData));
    }
    else{
        alert('Enter Task Data First')
    }
    callback();

};

var saveMethodData = function(){
// validate if taskdata init

    initCurrentMethodData(function(){

        taskData =   JSON.parse(localStorage.getItem('taskData'));
        console.log('console.log(taskData.name ' + taskData);

    });

};

var initCurrentActionData = function(callback){

    var actionDetailsForm = $('#actionDetailsForm');

    if(taskData.items[parseInt(currentItemNumber)-1].methods[parseInt(currentMethodNumber)-1]){

        if(taskData.items[parseInt(currentItemNumber)-1].methods[parseInt(currentMethodNumber)-1].init){

            currentActionDetails.name = $('.functionDisplayName').attr('name');
            currentActionDetails.syntax = $('.functionDisplayName').text().trim();
            currentActionDetails.init = true;

            if($( "#actionDetailsForm input").length){

                $( "#actionDetailsForm input" ).each(function( index ) {

                    var actKey = $( this).attr('id');
                    var actVal = $( this).val();
                    var localActionValue = { actKey : actKey, actVal : actVal}
                    addValue(currentActionDetails,'values',index, localActionValue)

                    console.log( index + ": " +$( this).attr('id') + ' : ' + $( this).val() );
                });
                addValue(taskData.items[parseInt(currentItemNumber)-1].methods[parseInt(currentMethodNumber)-1],'actions', (parseInt(currentActionNumber)-1) ,currentActionDetails);

            }

            localStorage.setItem('taskData', JSON.stringify(taskData));
        }
        else{
            alert('Enter Method Data First')
        }
    }
    else{
        alert('Enter Method Data First')
    }

    callback();

};

var saveActionData = function(){
// validate if method data init

    initCurrentActionData(function(){

        taskData =   JSON.parse(localStorage.getItem('taskData'));
        console.log('console.log(taskData.name) ' + taskData);
    });

};

/**
 * save task data to lsm
 */

$( "#saveTaskDetails" ).click(function() {
    $( this).append('<i style="padding: 0px 10px " class="fa fa-refresh fa-spin"></i>');

    updateCurrentTreeNode();
    saveTaskData();

    var self = this;
    setTimeout(function() {
        $( self).find('.fa-refresh').remove()
    }, 1000);

});

$( "#saveMethodDetails" ).click(function() {
    $( this).append('<i style="padding: 0px 10px " class="fa fa-refresh fa-spin"></i>');

    updateCurrentTreeNode();
    saveMethodData();

    var self = this;
    setTimeout(function() {
        $( self).find('.fa-refresh').remove()
    }, 1000);
});

$( "#saveActionDetails" ).click(function() {
    $( this).append('<i style="padding: 0px 10px " class="fa fa-refresh fa-spin"></i>');

    updateCurrentTreeNode();
    saveActionData();

    var self = this;
    setTimeout(function() {
        $( self).find('.fa-refresh').remove()
    }, 1000);
});


$( "#exportXMLTop" ).click(function() {
    console.log();
    taskData =   localStorage.getItem('taskData');
    console.log('console.log(taskData.name) ' + taskData);
});


$( "#resetLSM" ).click(function() {
    resetLSM();
    location.reload();
});

resetLSM();



/**
 * validate init task lsm
 * save method data to lsm
 */








/**
 * validate init task & method
 * save action data to lsm
 */

