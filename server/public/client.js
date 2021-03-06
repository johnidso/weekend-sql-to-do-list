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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please add a task to submit.',
          })
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
            <section class="row row-cols-lg justify-content-lg-center">
                <li class="list-group-item col-md-8" data-id="${task.id}">
                    <span>${task.item}</span>
                    <button class="btn btn-success rounded-0 col-md-3 float-end" data-id="${task.id}"><i class="fas fa-check"></i></button>
                    <button class="btn btn-danger rounded-0 col-md float-end" data-id="${task.id}"><i class="fas fa-trash"></i></i></button>
                </li> 
            </section
            `);
        } else if (task.is_done === true){
            let taskDateTime = moment(task.task_time).format('MMMM Do YYYY, h:mm:ss a');
            console.log(taskDateTime);
            $('#toDoList').append(`
            <section class="row row-cols-lg justify-content-lg-center">
                <li class="list-group-item-success col-md-8" data-id="${task.id}">
                    <s>${task.item}</s> : completed ${taskDateTime}
                    <button class="btn btn-danger rounded-0 col-md float-end" data-id="${task.id}"><i class="fas fa-trash"></i></button>
                </li> 
            </section>
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
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
        if (result.isConfirmed) {
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
            Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
            )
        }
    });
}

/*
[x] Create Task 
[x] Show all tasks
[x] Refresh after adding task
[x] Task can be completed
[x] Task can be deleted
[x] When task is complete, change visual
*/