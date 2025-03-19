var addBtn = document.getElementById('addTask');
var inputTask = document.getElementById('inputTask');
var taskList = document.getElementById('tasklist');

function darkMode() {
    let body = document.body;
    let darkBtn = document.getElementById('dmicon');
    let head1 = document.getElementById('heading1');
    let isDarkMode = false;

    darkBtn.addEventListener('click', function() {
        if (isDarkMode) {
            darkBtn.style.color = 'black';
            head1.style.color = '';
            head1.style.backgroundColor = '';
            body.style.backgroundImage = 'linear-gradient(rgba(55, 55, 55, 0.482), rgba(0, 0, 0, 0.6)), url(bg.jpg)';
            isDarkMode = false;
        } else {
            darkBtn.style.color = 'white';
            head1.style.color = 'white';
            head1.style.backgroundColor = 'black';
            body.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.6)), url(bg.jpg)';
            isDarkMode = true;
        }
    });
}
darkMode();

function addTask() {
    let task = inputTask.value.trim();
    if (task) {
        createTask(task);
        inputTask.value = '';
    } else {
        alert('Please enter a task!');
    }
}
addBtn.addEventListener('click', addTask);

function createTask(task) {
    let list = document.createElement('li');
    list.style.color = 'white';
    list.style.fontSize = '18px';
    list.textContent = task;

    let statusLbl = document.createElement('text');
    statusLbl.textContent = 'Active';
    statusLbl.style.color = 'rgb(180, 255, 180)';
    statusLbl.style.position = 'absolute';
    statusLbl.style.right = '540px';
    list.appendChild(statusLbl);

    let editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.style.backgroundColor = 'lightgray';
    editBtn.style.padding = '5px 10px';
    editBtn.style.position = 'absolute';
    editBtn.style.right = '490px';
    editBtn.style.border = 'none';
    editBtn.style.cursor = 'pointer';
    editBtn.addEventListener('mouseover', function() {
        editBtn.style.color = 'gray';
    });
    editBtn.addEventListener('mouseout', function() {
        editBtn.style.color = 'black';
    });
    list.appendChild(editBtn);
    editBtn.addEventListener('click', function() {
        if(statusLbl.textContent == 'Active') {
            statusLbl.textContent = 'Completed';
            list.style.textDecoration = 'line-through';
            list.style.color = 'lightgray';
            statusLbl.style.color = 'pink';
        } else {
            statusLbl.textContent = 'Active';
            list.style.textDecoration = 'none';
            list.style.color = 'white';
            statusLbl.style.color = 'rgb(180, 255, 180)';
        }
    });
    
    let delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.style.color = 'red';
    delBtn.style.backgroundColor = 'lightgray';
    delBtn.style.border = 'none';
    delBtn.style.padding = '5px 10px';
    delBtn.style.position = 'absolute';
    delBtn.style.right = '450px';
    delBtn.style.cursor = 'pointer';
    delBtn.addEventListener('mouseover', function() {
        delBtn.style.color = 'rgb(255, 118, 118)';
    });
    delBtn.addEventListener('mouseout', function() {
        delBtn.style.color = 'red';
    });
    delBtn.addEventListener('click', function() {
        taskList.removeChild(list);
    });

    list.appendChild(delBtn);
    taskList.appendChild(list);
}

function filterTasks() {
    let allBtn = document.getElementById('all');
    let activeBtn = document.getElementById('active');
    let completedBtn = document.getElementById('completed');
    
    allBtn.addEventListener('click', function() {
        showAllTasks();
        buttonClicked(allBtn);
    });
    
    activeBtn.addEventListener('click', function() {
        showActiveTasks();
        buttonClicked(activeBtn);
    });
    
    completedBtn.addEventListener('click', function() {
        showCompletedTasks();
        buttonClicked(completedBtn);
    });
}

function showAllTasks() {
    let tasks = taskList.querySelectorAll('li');
    tasks.forEach(function(task) {
        task.style.display = 'block';
    });
}

function showActiveTasks() {
    let tasks = taskList.querySelectorAll('li');
    tasks.forEach(function(task) {
        let statusLbl = task.querySelector('text');
        if (statusLbl.textContent === 'Active') {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function showCompletedTasks() {
    let tasks = taskList.querySelectorAll('li');
    tasks.forEach(function(task) {
        const statusLbl = task.querySelector('text');
        if (statusLbl.textContent === 'Completed') {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function buttonClicked(activeButton) {
    let filterButtons = document.querySelectorAll('#all, #active, #completed');
    filterButtons.forEach(function(button) {
        button.style.backgroundColor = '';
        button.style.color = '';
    });
    
    activeButton.style.backgroundColor = 'pink';
}

filterTasks();