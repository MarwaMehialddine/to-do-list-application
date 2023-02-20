//task1:select the user name
const nameInput=document.querySelector('#name');
//const username = localStorage.setItem('usernome',nameInput.value)
//ls 3 : saving the username to local storage, stored it in a variable to grab it
const username = localStorage.getItem('nameInput') || ''
// the change event since the username is changing
nameInput.addEventListener('change', e => {
    localStorage.setItem('username',e.target.value)
})
console.log('hi')

//task2:select the whole form
const newTodoForm=document.querySelector('#new-todo-form');

//task3:create array to select all to do
//ls 2: JSON.parse means that we are transorming the json string to an object to be able to access the values in it
let todos = JSON.parse(localStorage.getItem('todos')) || [] ;

//task 4 : add event listen an event listener for submit event
newTodoForm.addEventListener('submit', e  =>{
    //task 5 : prevent relaoding when submiting form
    e.preventDefault(); //e=event
//task 6 :call the add  to do function
 addTodo(e)
 
})
// task 7 create the to do function
function addTodo(e){
    //task 7.1 make a todo object with its characterisitics
    const todo={
        content: e.target.elements.content.value ,
        category: e.target.elements.category.value  ,
        done:  false ,
        createdAt:  new Date().getTime() ,
    }
// task 7.2 add it to the todos array
todos.push(todo);
//ls 1 : adding all the todos to the localstorage 1 
localStorage.setItem('todos', JSON.stringify(todos));
console.log(todos);
//task 7.3 render todo (display todo)
displayTodos();
//task 7.4 reset the form
e.target.reset()
}
//task 7.3.1 create the displaytodo function
function displayTodos(){
    const todoList = document.querySelector('#todo-list')
    todoList.innerHTML=''
    todos.forEach(todo=>{
      const todoItem = document.createElement('div');
    const label =document.createElement('label');
    const input =document.createElement('input');
    const span =document.createElement('span');
    const content =document.createElement('div');
    const actions =document.createElement('div');
    const edit = document.createElement('button');
    const deleteButton = document.createElement('button');
    input.type="checkbox";
    input.checked=todo.done;
    span.classList.add('bubble');
		
    if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');
    todoItem.classList.add('item');
     content.innerHTML=` <input type='text' value= '${todo.content}' readonly>`;
     edit.innerHTML='Edit';
     deleteButton.innerHTML='Delete';
       label.appendChild(input);
       label.appendChild(span);
       actions.appendChild(edit);
       actions.appendChild(deleteButton);
       todoItem.appendChild(label);
       todoItem.appendChild(content);
       todoItem.appendChild(actions);
       todoList.appendChild(todoItem)
       // for displaying done strikethrough
		if (todo.done) {
			todoItem.classList.add('done');
		}

    // functionality for the checkbox
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			displayTodos()

		})

       edit.addEventListener('click', e => {
        const contentInput = content.querySelector('input')
        contentInput.removeAttribute('readonly');
        contentInput.focus();
        contentInput.addEventListener('blur', e =>{
          contentInput.setAttribute('readonly', true) ;
          todo.content = e.target.value;
          localStorage.setItem('todos', Json.stringify(todos));
          displayTodos();
        })
       })

       deleteButton.addEventListener('click', e =>{
           todos = todos.filter ( td => td!=todo)
           localStorage.setItem('todos', JSON.stringify(todos))
           displayTodos();
        })

    })
    
}
