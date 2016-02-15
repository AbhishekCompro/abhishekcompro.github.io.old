/**
 * Created by AbhishekK on 2/15/2016.
 */


var renderRunConfiguration = function(){

    $('.method').remove();

    var taskData =   JSON.parse(localStorage.getItem('taskData'));
    console.log('in conf render ' + taskData.items.length)

    var itemsInitCount = 0;
    for(var p=0;p<taskData.items.length;p++){

        if(taskData.items[p].init){
            itemsInitCount++;
        }
        else{
            //console.log($('#run-item-'+ (p+1) ).parent());
            //$('#run-item-'+ (p+1) ).parent().parent('.form-group').hide();
        }
    }

    for(var i=0;i<taskData.items.length;i++){

        if(taskData.items[i].init){

            $( '#run-item-'+ (i+1)  ).prop('checked', true);

            for(var j=0;j<taskData.items[i].methods.length;j++){

                if(taskData.items[i].methods[j].init){

                    if(j==0){
                        $('#item'+(i+1)+'-methods').append('<label class="method">                    <input type="radio" data-method="'+(j+1)+'" name="item'+(i+1)+'-method" class="flat-red" checked>                    Method '+(j+1)+'                    </label>');
                    }else{
                        $('#item'+(i+1)+'-methods').append('<label class="method">                    <input type="radio" data-method="'+(j+1)+'" name="item'+(i+1)+'-method" class="flat-red">                    Method '+(j+1)+'                    </label>');
                    }

                }
            }

        }
        else{

            //$('#run-item-'+ (i+1) ).parent().parent('.form-group').hide();
        }
    }
};



//run task data

var taskData;

var taskRunDataToXMl = function(){

    taskData =   JSON.parse(localStorage.getItem('taskData'));

    var xmlPre = '<?xml version="1.0" encoding="UTF-8"?><Task id="'+ taskData.id +'" name="'+ taskData.name +'">  <description>'+ taskData.description +'</description>  <friendlyTaskID>'+ taskData.id + taskData.scenario +'</friendlyTaskID>  <scenario name="'+ taskData.scenario +'">';

    var xmlPost =   '</scenario>    </Task>';


    var itemsInitCount = 0;
    for(var p=0;p<taskData.items.length;p++){

        if(taskData.items[p].init){
            itemsInitCount++;
        }
    }

    var taskDataPre = '<Items count="'+itemsInitCount+'">';
    var taskDataPost = '</Items>';

    for(var i=0;i<taskData.items.length;i++){

        // todo - update below loops on basis of user run config selection {handle item comment & skip item here}

        if(taskData.items[i].init){

            taskDataPre = taskDataPre + '<Item sno="'+(i+1)+'">';
            taskDataPost = '</Item>'+ taskDataPost;

            for(var j=0;j<taskData.items[i].methods.length;j++){

                if(taskData.items[i].methods[j].init){
                    taskDataPre = taskDataPre + '<Method group="'+taskData.items[i].methods[j].group+'" name="'+taskData.items[i].methods[j].group+'" sno="'+(j+1)+'"><Actions>';

                    taskDataPost = '</Actions></Method>'+ taskDataPost;

                    for(var k=0;k<taskData.items[i].methods[j].actions.length;k++){

                        if(taskData.items[i].methods[j].actions[k].init){
                            taskDataPre = taskDataPre + '<Action sno="'+(k+1)+'"><actionType name="'+(taskData.items[i].methods[j].actions[k].name).toString().trim().replace("()","")+'">';

                            for(var l=0;l<taskData.items[i].methods[j].actions[k].values.length;l++){
                                taskDataPre = taskDataPre + '<'+taskData.items[i].methods[j].actions[k].values[l].actKey+'>'+taskData.items[i].methods[j].actions[k].values[l].actVal+'</'+taskData.items[i].methods[j].actions[k].values[l].actKey+'>';
                            }

                            taskDataPre = taskDataPre + '</actionType></Action>';
                        }
                    }

                }
            }

        }
    }

    var updateRunXml = xmlPre + taskDataPre + taskDataPost + xmlPost;

    localStorage.setItem('updateRunXml', JSON.stringify(updateRunXml));
    console.log(updateRunXml);

    return updateRunXml;

};


var getRunTaskDataFromLsm = function(){
    return taskRunDataToXMl();
};



$( "#previewXml" ).on( "click", function() {
    var sampleRunXML = getRunTaskDataFromLsm();
    var prettyRunXML;

    prettyRunXML = vkbeautify.xml(sampleXML);
    console.log(prettyRunXML);

});

var updateRunXml = function(){
    localStorage.setItem('updateRunXml', JSON.stringify(''));



};

var updateRunJava = function(){
    localStorage.setItem('updateRunJava', JSON.stringify(''));
// todo - update below loops on basis of user run config selection {handle method to run here}

};




$( "#run-conf-sidebar" ).click(function() {
    renderRunConfiguration();
});

