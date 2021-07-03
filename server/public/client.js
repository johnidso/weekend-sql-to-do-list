$(document).ready(onReady);

function onReady(){
    getTasks();
    $('#addButton').on("click", addTask);
    $('#toDoList').on("click", '.btn-success', completeTask);
    $('#toDoList').on("click", '.btn-danger', deleteTask);
}

function addTask() {
    let taskIn = $('#toDoIn').val();
    if(!taskIn){
        alert('Please add a task description.');
    } else{
        $.ajax({
            method: 'POST',
            url: '/list',
            data: {
                item: taskIn,
                isDone: false,
            }
        })
        .then(res => {
            $('#toDoIn').val('');
            getTasks();
        });
    }
}

function printTasks(taskArray){
    $('#toDoList').empty();
    for (let task of taskArray){
        if(task.is_done === false){
            $('#toDoList').append(`
            <li class="list-group-item" data-id="${task.id}">${task.item}
            <button class="btn btn-success rounded-0" data-id="${task.id}">Done</button>
            <button class="btn btn-danger rounded-0" data-id="${task.id}">Trash</button>
            </li> 
            `);
        } else if (task.is_done === true){
            $('#toDoList').append(`
            <li class="list-group-item" data-id="${task.id}">
            ${task.item} <button class="btn btn-danger rounded-0" data-id="${task.id}">Trash</button>
            </li> 
            `);
        }
    }
}

function getTasks(){
    $.ajax({
        method: 'GET', 
        url: '/list',
    })
    .then(response => {
        printTasks(response);
    })
    .catch(err => {
        alert('Cannot get tasks', err);
    });
}

function completeTask(){
    let taskId = $(this).data('id');
    console.log(taskId);
    $.ajax({
        method: 'PUT',
        url: `/list/${taskId}`
    })
    .then(response => {
        getTasks();
    })
    .catch(error => {
        alert('Error completing task', error);
    });
}

function deleteTask(){
    let taskId = $(this).data('id');
    $.ajax({
        method:'DELETE',
        url: `/list/${taskId}`
    })
    .then(response => {
        getTasks();
    })
    .catch(error => {
        alert('Error deleting record', error);
    });
}

/*
[] Create Task 
[] Show all tasks
[] Refresh after adding task
[] Task can be completed
[] Task can be deleted
[] When task is complete, change visual
*/