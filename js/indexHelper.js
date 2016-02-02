/**
 * Created by AbhishekK on 2/2/2016.
 */



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
    actions:[
        {
            init: 'currentMethodDetails',
            value:{}
        }
    ]
}

var taskData = {
    scenario: 'T1',
    id: '',
    description: '',
    items:[
        {
            methods:[
                {
                    init: 'false',
                    actions:[
                        {
                            init: 'false',
                            value:{

                            }

                        }
                    ]
                }
            ]
        },
        {
            methods:[
                {
                    init: 'false',
                    actions:[
                        {
                            init: 'false',
                            value:{

                            }

                        }
                    ]
                }
            ]
        },
        {
            methods:[
                {
                    init: 'false',
                    actions:[
                        {
                            init: 'false',
                            value:{

                            }

                        }
                    ]
                }
            ]
        }
    ]
};

console.log(taskData.items[0].methods.length);
addValue(taskData.items[0],'methods',currentMethodDetails)
console.log(taskData.items[0].methods.length);
console.log(taskData.items[0].methods[0].init);
console.log(taskData.items[0].methods[1].init);
console.log(taskData);


function updateBreadcrum(data){

    if(data != undefined){

        console.log('updating breadcrum for .. ' + data.item + data.method + data.action );
        $('#b_item').html('<i class="fa fa-dashboard"> Item ' + data.item);
        $('#b_method').html('Method ' + data.method);
        $('#b_action').html('Action ' + data.action);

        // todo: set currentTreeNode here

    }
}

function addNewMethod(el,clickedAddMethodNodeDataTree){
console.log('***** ' + clickedAddMethodNodeDataTree.item);

    var a = $.extend(true, {}, clickedAddMethodNodeDataTree);
    a.item = parseInt(a.item);
    a.method = parseInt(a.method) + 1;
    a.action = 1;
    updateBreadcrum(a);

    el.append('<li data-tree=\'{"item":"'+parseInt(a.item)+'","method":"'+(parseInt(clickedAddMethodNodeDataTree.method) + 1)+'","action":""}\' class="active treeview method-node">    <a href="#"><i class="fa fa-circle-o"></i> Method '+(parseInt(clickedAddMethodNodeDataTree.method) + 1)+' <i class="fa fa-angle-left pull-right"></i>    <span class="label pull-right bg-red delete-method-node"><i class="fa fa-times"></i></span>    </a>    <ul class="treeview-menu action-tree">    <li data-tree=\'{"item":"' + parseInt(clickedAddMethodNodeDataTree.item) + '","method":"'+(parseInt(clickedAddMethodNodeDataTree.method) + 1)+'","action":"1"}\' class="action-node active">    <a href="#"><i class="fa fa-circle-o"></i> Action 1 <span class="label pull-right bg-red delete-action-node"><i class="fa fa-times"></i></span></a>    </li>    <li data-tree=\'{"item":"1","method":"'+(parseInt(clickedAddMethodNodeDataTree.method) + 1)+'","action":"1"}\' class="add-action"><a href="#"><i class="fa fa-plus-square-o text-lime"></i> <span>Add New Action</span></a></li>    </ul>    </li>');

}

function addNewAction(el,clickedAddActionNodeDataTree){
    console.log('***** ' + clickedAddActionNodeDataTree.item);

    var a = $.extend(true, {}, clickedAddActionNodeDataTree);;
    a.item = parseInt(a.item);
    a.method = parseInt(a.method);
    a.action = parseInt(a.action) + 1;
    updateBreadcrum(a);

    el.append('<li data-tree=\'{"item":"'+parseInt(clickedAddActionNodeDataTree.item)+'","method":"'+(parseInt(clickedAddActionNodeDataTree.method))+'","action":"'+(parseInt(clickedAddActionNodeDataTree.action) + 1)+'"}\' class="active action-node">    <a href="#"><i class="fa fa-circle-o"></i> Action '+(parseInt(clickedAddActionNodeDataTree.action) + 1)+' <span class="label pull-right bg-red delete-action-node"><i class="fa fa-times"></i></span></a>    </li>');

}

$('.sidebar-menu').on('click', '.add-method', function() {

    $('.method-node').removeClass('active');

    var el = $(this);
    var clickedAddMethodNodeDataTree = el.data('tree');

    var methodTree = el.parent('.method-tree');
    addNewMethod(methodTree,clickedAddMethodNodeDataTree);
    el.remove();
    methodTree.append('<li data-tree=\'{"item":"'+(parseInt(clickedAddMethodNodeDataTree.item))+'","method":"'+(parseInt(clickedAddMethodNodeDataTree.method) + 1)+'","action":""}\' class="add-method"><a href="#"><i class="fa fa-plus-square-o text-aqua"></i> <span>Add New Method</span></a></li>');

});

$('.sidebar-menu').on('click', '.add-action', function() {

    $('.action-node').removeClass('active');

    var el = $(this);
    var clickedAddActionNodeDataTree = el.data('tree');

    var actionTree = el.parent('.action-tree');
    addNewAction(actionTree,clickedAddActionNodeDataTree);
    el.remove();
    actionTree.append('<li data-tree=\'{"item":"'+(parseInt(clickedAddActionNodeDataTree.item))+'","method":"'+(parseInt(clickedAddActionNodeDataTree.method))+'","action":"'+(parseInt(clickedAddActionNodeDataTree.action) + 1)+'"}\' class="add-action"><a href="#"><i class="fa fa-plus-square-o text-lime"></i> <span>Add New Action</span></a></li>');

});


$('.sidebar-menu').on('click', '.item-node', function(event) {
    //console.log($(event.target).parent().attr('class'));
    var targetNode = $(event.target).parent();

    var el = $(this);
    var clickedItemNodeDataTree = targetNode.data('tree');
    updateBreadcrum(clickedItemNodeDataTree);
});


$('.sidebar-menu').on('click', '.method-node', function() {
    //console.log($(event.target).parent().attr('class'));
    var targetNode = $(event.target).parent();

    var el = $(this);
    var clickedAddActionNodeDataTree = targetNode.data('tree');
    updateBreadcrum(clickedAddActionNodeDataTree);

    $('.method-node').removeClass('active');
    el.addClass( 'active' );

});

$('.sidebar-menu').on('click', '.action-node', function() {
    //console.log($(event.target).parent().attr('class'));
    var targetNode = $(event.target).parent();

    var el = $(this);
    var clickedAddActionNodeDataTree = targetNode.data('tree');
    updateBreadcrum(clickedAddActionNodeDataTree);
    $('.action-node').removeClass('active');
    el.addClass( 'active' );

});
$('.sidebar-menu').on('click', '.delete-action-node', function() {

    $('.action-node').removeClass('active');

    var el = $(this);

    var actionTree = el.parent().parent('.action-node');

    //todo: delete data from lsm
    var removeLSMData = actionTree.data('tree');
    console.log(removeLSMData);

    updateBreadcrum({"item":"","method":"","action":""});

    actionTree.remove();

});

$('.sidebar-menu').on('click', '.delete-method-node', function() {

    $('.method-node').removeClass('active');

    var el = $(this);

    var methodTree = el.parent().parent('.method-node');

    //todo: delete data from lsm
    var removeLSMData = methodTree.data('tree');
    console.log(removeLSMData);

    updateBreadcrum({"item":"","method":"","action":""});

    methodTree.remove();

});

