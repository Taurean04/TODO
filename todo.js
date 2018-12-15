console.log('Starting todo.js');
const fs = require('fs');
const moment = require('moment');
const fetchTodo = () => {
    try {
        let todoString = fs.readFileSync('todo-data.json')
        return JSON.parse(todoString);
    } catch (error) {
        return [];
    }
};
const saveTodo = todos => {
    fs.writeFileSync("todo-data.json", JSON.stringify(todos));
}
const getTodos = () => {
    let todos = fetchTodo();
    return todos;
}
const removeTodo = () => {
    let date = moment();
    let todos = fetchTodo();
    todos.forEach(todo => {
        if(date < todo.time){
            let  newTodo = todos.filter(todo => {
                return date >todo.time;
            })
        }
    })
    // let newTodo = todos.filter(todo => {
    //     if(date < todo.time){
    //         saveTodo(todos);
    //     }else{
    //         return todo.time > date;
    //     }
    // });
    saveTodo(newTodo);
    return newTodo.length !== todos.length;
}
const addTodo = (task, time) => {
    let todos = [];
    let todo = {
        task: task,
        time: time
    };
    todos = fetchTodo();
    let duplicateTodo = todos.filter(todo =>{
        return todo.task === task;
    });
    if(duplicateTodo.length === 0){
        todos.push(todo);
        saveTodo(todos);
        return todo;
    }
}
module.exports = {
    addTodo,
    getTodos,
    removeTodo
};