$(document).ready(onReady);

function onReady(){

}

function addTask() {
    let taskIn = $('#toDoIn').val();
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
        // display tasks function here
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