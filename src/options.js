var startTime=document.getElementById('start_time');
var endTime=document.getElementById('end_time');
var minute=document.getElementById('minute');
var save=document.getElementById('save');
var ignoreHour=document.getElementById('ignore_hour');
var ToolObject=new Object();
var $=new Object();
$.setIcon=function (a){
    var detail=new Object();
    detail.imageData =a;
    chrome.browserAction.setIcon(detail);
    return this;
}
$.createElement=function (a){
    this.previousElement=this.currentElement;
    this.currentElement=document.createElement(a);
    return this;
}
$.getContext2D=function (){
    return this.currentElement.getContext("2d");
}
$.setIconState=function (a){
    var ctx=$.createElement('canvas').getContext2D();
    ctx.rect(0, 0, 20, 20);

    ctx.beginPath();
    ctx.arc(10, 10, 9, 0, 2 * Math.PI, false);
    ctx.fillStyle = a;
    ctx.fill();

    $.setIcon(ctx.getImageData(0, 0, 20, 20));
}
$.setIconOff=function (){
    this.setIconState("rgba(100,100,100,0.6)");
    return this;
}
$.setIconOn=function (){
    this.setIconState("rgba(0,180,0,0.6)");
    return this;
}
$.setTipTitle=function (a){
    var detail=new Object();
    detail.title=a;
    chrome.browserAction.setTitle(detail);
    return this;
}
ToolObject.createOptionNode=function (b){
	var option=document.createElement('option');
	option.value=b;
	option.textContent=b;
	this.previousNode=this.currentNode;
	this.currentNode=option;
	return this;
}
ToolObject.createCheckboxNode=function (b,c){
	var checkbox=document.createElement('input');
	checkbox.type='checkbox';
	checkbox.value=b;
	checkbox.id=c;
	this.previousNode=this.currentNode;
	this.currentNode=checkbox;
	return this;
}
ToolObject.createTdNode=function (b){
	var td=document.createElement('td');
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
ToolObject.updateIconState=function (){
	if(localStorage['power']==1){
        $.setIconOn().setTipTitle('On');
    }else{
        $.setIconOff().setTipTitle('Off');
    }
}
for (var i=0;i<24;i++){
	ToolObject.createOptionNode(i).appendTo(startTime);
	ToolObject.createOptionNode(i).appendTo(endTime);
}
for (var i=0;i<60;i++){
	ToolObject.createOptionNode(i).appendTo(minute);
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
	ToolObject.updateIconState();
});
function loadLocalStorageValue(){
	var selects=document.getElementsByTagName('select');
	for(var i=0;i<selects.length;i++){
		if(localStorage[selects.item(i).id]){
			selects.item(i).selectedIndex=localStorage[selects.item(i).id];
		}
	}
	updateIgnoreHourValue();
	var inputs=document.getElementsByTagName('input');
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