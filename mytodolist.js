// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const toDoEntryBox = document.getElementById('todo-entry-box');
    const toDoList = document.getElementById('todo-list');
    const clearButton = document.getElementById('clear-completed-button');
    const emptyButton = document.getElementById('empty-button');
    const saveButton = document.getElementById('save-button');

    addButton.addEventListener('click', addToDoItem);
    clearButton.addEventListener('click', clearCompletedToDoItems);
    emptyButton.addEventListener('click', emptyList);
    saveButton.addEventListener('click', saveList);

    toDoEntryBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addToDoItem();
        }
    });

    function addToDoItem() {
        const itemText = toDoEntryBox.value.trim();
        if (itemText) {
            newToDoItem(itemText, false);
            toDoEntryBox.value = '';
            toDoEntryBox.focus();
        }
    }

    function newToDoItem(itemText, completed) {
        const toDoItem = document.createElement('li');
        toDoItem.textContent = itemText;
        
        if (completed) {
            toDoItem.classList.add('completed');
        }

        toDoItem.addEventListener('dblclick', toggleToDoItemState);
        toDoList.appendChild(toDoItem);
    }

    function toggleToDoItemState() {
        this.classList.toggle('completed');
    }

    function clearCompletedToDoItems() {
        const completedItems = document.querySelectorAll('#todo-list .completed');
        completedItems.forEach(item => item.remove());
    }

    function emptyList() {
        if (confirm('Are you sure you want to empty the entire list?')) {
            toDoList.innerHTML = '';
        }
    }

    function saveList() {
        const toDos = [];
        document.querySelectorAll('#todo-list li').forEach(item => {
            toDos.push({
                task: item.textContent,
                completed: item.classList.contains('completed')
            });
        });

        localStorage.setItem('toDos', JSON.stringify(toDos));
        
        // Show save confirmation
        const saveMsg = document.createElement('div');
        saveMsg.textContent = 'List saved!';
        saveMsg.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #8a9a5b;
            color: white;
            padding: 10px 20px;
            border-radius: 3px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: fadeOut 2s forwards;
        `;
        document.body.appendChild(saveMsg);
        
        setTimeout(() => {
            saveMsg.remove();
        }, 2000);
    }

    function loadList() {
        const savedToDos = localStorage.getItem('toDos');
        if (savedToDos) {
            const toDos = JSON.parse(savedToDos);
            toDos.forEach(todo => {
                newToDoItem(todo.task, todo.completed);
            });
        }
    }

    loadList();
});