// Add task functionality  --  Complete
// Clear task functionality  -- Complete
// Delete task functionality
// Search task functionality


const btnAdd = document.getElementById("add_btn");

const ol = document.querySelector(".task_list>ol");
const search = document.getElementById('searchInput');
search.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks)
btnAdd.addEventListener('click', addTask);

function addTask(e){
  let input = document.getElementById("taskInput");
  
  if(input.value !== ''){
    let element = document.createElement('li');
    let deleteItem = document.createElement('span');

    deleteItem.innerHTML = '❌';
    deleteItem.setAttribute("class", "del")
    deleteItem.addEventListener('click', deleteTask)

    element.innerHTML = input.value;
    element.appendChild(deleteItem)
    ol.appendChild(element)
    
    storeTaskInLocalStorage(input.value)
    input.value = '';
  }
  else{
    alert("Task can't be empty")
  }
  e.preventDefault();
}


function clearTask(){
  ol.innerHTML = ""
  localStorage.removeItem("tasks")
}

function deleteTask(e){
  let item = e.target.parentElement
  removeFromLS(item)
  item.remove();

}

function filterTask(e){
  let text = e.target.value;

  let li = document.querySelectorAll('.task_list>ol>li')
  li.forEach(element => {
    let item = element.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      element.style.display = ''
    }
    else{
      element.style.display = 'none'
    }
  });

}

// store data in local storage

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    let element = document.createElement('li');
    let deleteItem = document.createElement('span');

    deleteItem.innerHTML = '❌';
    deleteItem.setAttribute("class", "del")
    deleteItem.addEventListener('click', deleteTask)

    element.innerHTML = task;
    element.appendChild(deleteItem)
    ol.appendChild(element)
  })
}


function removeFromLS(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  let li = taskItem;
  li.removeChild(li.lastChild)

  tasks.forEach((task, index)=>{
    if(li.textContent.trim() === task){
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}