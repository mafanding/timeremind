var startTime=document.getElementById('start_time');
var endTime=document.getElementById('end_time');
var minute=document.getElementById('minute');
var save=document.getElementById('save');
var ToolObject=new Object();
ToolObject.createOptionNode=function (a,b){
	var option=document.createElement('option');
	option.value=b;
	option.textContent=b;
	a.appendChild(option);
}
for (var i=0;i<24;i++){
	ToolObject.createOptionNode(startTime,i);
	ToolObject.createOptionNode(endTime,i);
}
for (var i=0;i<60;i++){
	ToolObject.createOptionNode(minute,i);
}
save.addEventListener('click',function(e){
	var inputs=document.getElementsByTagName('input');
	for(var i=0;i<inputs.length;i++){
		if (inputs.item(i).checked) {
			localStorage[inputs.item(i).id]=1;
		}else{
			localStorage[inputs.item(i).id]=0;
		}
	}
	var selects=document.getElementsByTagName('select');
	for(var i=0;i<selects.length;i++){
		localStorage[selects.item(i).id]=selects.item(i).value;
	}
});
function loadLocalStorageValue(){
	var inputs=document.getElementsByTagName('input');
	var selects=document.getElementsByTagName('select');
	for(var i=0;i<inputs.length;i++){
		if(localStorage[inputs.item(i).id]==1){
			inputs.item(i).checked=true;
		}
	}
	for(var i=0;i<selects.length;i++){
		if(localStorage[selects.item(i).id]){
			selects.item(i).selectedIndex=localStorage[selects.item(i).id];
		}
	}
}
window.addEventListener('load',loadLocalStorageValue);