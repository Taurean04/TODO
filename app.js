console.log("Starting app.js")
const fs = require('fs');
const os = require('os');
const todos = require('./todo.js');
const _ = require('lodash');
const yargs = require('yargs');
const moment = require('moment');
const argv = yargs.argv;
console.log(yargs.argv);
const command = argv._[0]
if(command === 'add'){
    console.log('Adding things TO-DO');
    let todo = todos.addTodo(argv.task, moment(argv.time, 'hh:mm', true));
    if (todo){
        console.log(`Task: ${todo.task}`);
        console.log(`Time: ${todo.time}`);
    }else{
        console.log('Task already exists');
    }
}else if(command === 'todo'){
    console.log('Things TO-DO');
    let allTodo = todos.getTodos();
    if(allTodo){
        allTodo.forEach(todo => {
            console.log(`Task: ${todo.task}, To be done by: ${todo.time}`);
        });
    }else{
        console.log('Task already exists');
    }
}else if(command === 'remove'){
    console.log('Removing from list');
    let removedTask = todos.removeTodo();
    if(removedTask){
        console.log('Task Removed/Completed');
    }else{
        console.log('No task was removed');
    }
}else{
    console.log('Command not recognized');
}