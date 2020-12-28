//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

//Event handling, uder interaction is what starts the code execution.
let taskInput=document.getElementById("new-task");//Add a new task.
let addButton=document.getElementsByTagName("button")[0];//first button
let incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
let completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

//New task list item
let createNewTaskElement=function(taskString){
	let listItem=document.createElement("li");
	let checkBox=document.createElement("input");//input(checkbox)
	let label=document.createElement("label");//label
	let editInput=document.createElement("input");//input(text)
	let editButton=document.createElement("button");//edit button
	let deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";
	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}
//adding a new task
let addTask=function(){
	console.log("Add Task...");	
	var listItem=createNewTaskElement(taskInput.value);//Create new list item with text from the #new-task
	incompleteTaskHolder.appendChild(listItem);//Append listItem to incompleteTaskHolder
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value="";
}
//Edit an existing task.
let editTask=function(){
	console.log("Edit Task...");
	console.log("Change 'edit' to 'save'");

	var listItem=this.parentNode;

	var editInput=listItem.querySelector('input[type=text]');
	var label=listItem.querySelector("label");
	var containsClass=listItem.classList.contains("editMode");
			//If class of the parent is .editmode
			if(containsClass){
					//switch to .editmode
					//label becomes the inputs value.
				label.innerText=editInput.value;
			}else{
				editInput.value=label.innerText;
			}
			//toggle .editmode on the parent.
			listItem.classList.toggle("editMode");
}
//Delete task.
let deleteTask=function(){
		console.log("Delete Task...");
		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		ul.removeChild(listItem);//Remove the parent list item from the ul.
}


//Mark task completed
let taskCompleted=function(){
	console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
			bindTaskEvents(listItem, taskIncomplete);

}

let taskIncomplete=function(){
	console.log("Incomplete Task...");
	//Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #incomplete-tasks.
	var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}

//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
	//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");

			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}
//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}
// Issues with usabiliy don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Shange edit to save when you are in edit mode.