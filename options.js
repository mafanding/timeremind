var $=document;
var startTime=$.getElementById('start_time');
var endTime=$.getElementById('end_time');
var minute=$.getElementById('minute');
var save=$.getElementById('save');
var ignoreHour=$.getElementById('ignore_hour');
var ToolObject=new Object();
ToolObject.createOptionNode=function (b){
	var option=$.createElement('option');
	option.value=b;
	option.textContent=b;
	this.previousNode=this.currentNode;
	this.currentNode=option;
	return this;
}
ToolObject.createCheckboxNode=function (b,c){
	var checkbox=$.createElement('input');
	checkbox.type='checkbox';
	checkbox.value=b;
	checkbox.id=c;
	this.previousNode=this.currentNode;
	this.currentNode=checkbox;
	return this;
}
ToolObject.createTdNode=function (b){
	var td=$.createElement('td');
	td.textContent=b;
	this.previousNode=this.currentNode;
	this.currentNode=td;
	return this;
}
ToolObject.appendTo=function (a){
	a.appendChild(this.currentNode);
	return this;
}
ToolObject.appendChild=function (a){
	this.currentNode.appendChild(a);
	return this;
}
ToolObject.clearChildren=function (a){
	while (a.lastChild) {
	  a.removeChild(a.lastChild);
	}
}
ToolObject.resetCurrentNode=function (){
	this.currentNode=this.previousNode;
	return this;
}
for (var i=0;i<24;i++){
	ToolObject.createOptionNode(i).appendTo(startTime);
	ToolObject.createOptionNode(i).appendTo(endTime);
}
for (var i=0;i<60;i++){
	ToolObject.createOptionNode(i).appendTo(minute);
}
save.addEventListener('click',function(e){
	var inputs=$.getElementsByTagName('input');
	for(var i=0;i<inputs.length;i++){
		if (inputs.item(i).checked) {
			localStorage[inputs.item(i).id]=1;
		}else{
			localStorage[inputs.item(i).id]=0;
		}
	}
	var selects=$.getElementsByTagName('select');
	for(var i=0;i<selects.length;i++){
		localStorage[selects.item(i).id]=selects.item(i).value;
	}
});
function loadLocalStorageValue(){
	var selects=$.getElementsByTagName('select');
	for(var i=0;i<selects.length;i++){
		if(localStorage[selects.item(i).id]){
			selects.item(i).selectedIndex=localStorage[selects.item(i).id];
		}
	}
	updateIgnoreHourValue();
	var inputs=$.getElementsByTagName('input');
	for(var i=0;i<inputs.length;i++){
		if(localStorage[inputs.item(i).id]==1){
			inputs.item(i).checked=true;
		}
	}
}
window.addEventListener('load',loadLocalStorageValue);
function updateIgnoreHourValue(){
	var prefix='ignore_';
	ToolObject.clearChildren(ignoreHour);
	ignoreHour.appendChild(ToolObject.createTdNode('ignore hour：').currentNode);
	for(var i=parseInt(startTime.value);i<=parseInt(endTime.value);i++){
		ToolObject.createTdNode(i).createCheckboxNode(i,prefix+i).appendTo(ToolObject.previousNode).resetCurrentNode().appendTo(ignoreHour);
	}
}
startTime.addEventListener('change',updateIgnoreHourValue);
endTime.addEventListener('change',updateIgnoreHourValue);