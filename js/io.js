/**
 * Created by AbhishekK on 2/2/2016.
 */

// LSM object:

var currentScenario = 'T1';
var currentItemNumber = 1;
var currentMethodNumber = 1;
var currentActionNumber = 1;

var updateCurrentTreeNode = function(){
    // get and update from breadcrum
    var currentScenario = 'T1';
    var currentItemNumber = 1;
    var currentMethodNumber = 1;
    var currentActionNumber = 1;
}


function addValue(obj, key, value) {
    if (obj.hasOwnProperty(key)) {
        obj[key].push(value);
    } else {
        obj[key] = [value];
    }
}

var currentActionDetails = {
    init: 'false',
    value: {}
}

var currentMethodDetails = {
    init: 'currentMethodDetails',
    type:'',
    group:'',
    actions:[
        {
            init: 'currentMethodDetails',
            value:{}
        }
    ]
}

var currentTaskDetails = {
    init:'false',
    scenario: '',
    id: '',
    name:'',
    description: '',
    items:[]
}


var saveTaskData = function(){



}

var saveMethodData = function(){
// validate if taskdata init



}

var saveActionData = function(){
// validate if method data init



}




var taskData = {
    init:'false',
    scenario: '',
    id: '',
    name:'',
    description: '',
    items:[
        {

        },
        {

        },
        {

        }
    ]
};

//console.log(taskData.items[0].methods.length);
addValue(taskData.items[0],'methods',currentMethodDetails)
addValue(taskData.items[0],'methods',currentMethodDetails)

console.log(taskData.items[0].methods.length);

console.log(taskData.items[0].methods[0].init);
console.log(taskData.items[0].methods[1].init);
console.log(taskData);






/**
 * save task data to lsm
 */








/**
 * validate init task lsm
 * save method data to lsm
 */








/**
 * validate init task & method
 * save action data to lsm
 */

