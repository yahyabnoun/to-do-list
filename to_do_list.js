// Selectors
const todoInput=document.querySelector('.todo-input')
const todobutton=document.querySelector('.todo-button')
const todoList=document.querySelector('.todo-list')
const filterOption=document.querySelector('.filter-todo')

// Event Listenets
document.addEventListener('DOMContentLoaded',getTodo)
todobutton.addEventListener('click',addtodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filtertodo)


// Functions

function addtodo(e) {
    //Prevent form submitting
    e.preventDefault()

    //Todo Div
    const todoDiv=document.createElement('div')
    todoDiv.classList.add('todo')

    const newTodo=document.createElement('li')
    newTodo.innerText=todoInput.value
    newTodo.classList.add('todo-item')

    todoDiv.appendChild(newTodo)

    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)

    // check mark button 
    const completedButton=document.createElement('button')
    completedButton.innerHTML='<i class="bi bi-check2-circle"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    // check trashButton button 
    const trashButton=document.createElement('button')
    trashButton.innerHTML='<i class="bi bi-trash-fill"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
    todoInput.value=""

}

function deleteCheck(e) {
    const item=e.target
    //DELETE TODO
    if (item.classList[0]==="trash-btn") {
        const todo=item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend',function () {
            todo.remove()
        })
    }

    //check mark 
    if (item.classList[0]==="complete-btn") {
        const todo=item.parentElement
        todo.querySelector("li").classList.toggle("todo-item-checked")
        todo.classList.toggle("todo-checked")

    }
}

function filtertodo(e) {

    const todo=document.getElementsByClassName("todo")
    
    for (let index = 0; index < todo.length; index++) {
        if (e.target.value=="all") {
            todo[index].style.display='flex'
        }


        if (e.target.value=="completed") {

            if (todo[index].classList.contains("todo-checked")) {
                todo[index].style.display='flex'
            }else{
                todo[index].style.display='none'
            }

        }
        if (e.target.value=="uncompleted") {

            if (!todo[index].classList.contains("todo-checked")) {
                todo[index].style.display='flex'
            }else{
                todo[index].style.display='none'
            }

        }

    }


}


function saveLocalTodos(todo) {
    //CHECK --- HEY DO I already have thing in there?
    let todos
    if (localStorage.getItem('todos')===null) {
        todos=[]
        
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}


function getTodo() {
    //CHECK --- HEY DO I already have thing in there?
    let todos
    if (localStorage.getItem('todos')===null) {
        todos=[]
        
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (todo) {
            //Todo Div
    const todoDiv=document.createElement('div')
    todoDiv.classList.add('todo')

    const newTodo=document.createElement('li')
    newTodo.innerText=todo
    newTodo.classList.add('todo-item')

    todoDiv.appendChild(newTodo)


    // check mark button 
    const completedButton=document.createElement('button')
    completedButton.innerHTML='<i class="bi bi-check2-circle"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)

    // check trashButton button 
    const trashButton=document.createElement('button')
    trashButton.innerHTML='<i class="bi bi-trash-fill"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
    });
}

function removeLocalTodos(todo) {
    
    let todos
    if (localStorage.getItem('todos')===null) {
        todos=[]
        
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex=todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem('todos',JSON.stringify(todos))

}
