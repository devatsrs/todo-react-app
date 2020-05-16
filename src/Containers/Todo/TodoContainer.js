
import React, { useState } from 'react'
import { FormControlLabel, Checkbox, IconButton, Dialog, DialogTitle } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import "./style.css";

import CanvasJSReact from './canvasjs.react';

const TaskChart = ({ tasks }) => {

    let completed = tasks.filter((task) => task.completed === true).length;
    let total = tasks.length;
    let completedper = (completed / total * 100).toFixed(2);
    let remainingper = (100 - completedper).toFixed(2);

    const options = {
        animationEnabled: true,
        exportEnabled: false,
        height: 165,
        data: [{

            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
                { y: completedper, label: "Completed" },
                { y: remainingper, label: "Remaining" },
            ]
        }]
    }
    return (
        <div className="shadow p-1 bg-white todo_round ">
            <CanvasJSReact.CanvasJSChart options={options} />
        </div>

    );
}


const TasksCompleted = ({ tasks }) => {
    return (

        <div className="shadow p-4 bg-white todo_round ">
            <h3>Task Completed</h3>
            <span className="display-4">{tasks.filter((task) => task.completed === true).length}</span>
            <span className="h3">/ {tasks.length}</span>
        </div>

    );
}

const TasksLatest = ({ tasks }) => {

    const latest = 3;
    return (
        <div className="shadow p-4 bg-white todo_round ">
            <h3>Latest Tasks</h3>
            <ul className="pl-0" style={{ listStylePosition: "inside" }}>
                {tasks.slice(0, latest).map(task => (<li key={task.id} className={task.completed ? "line_through" : ""}  >{task.text}</li>))}
            </ul>
        </div>

    );
}


const NewTaskModal = ({ show, setShow, SubmitNewTask }) => {

    const [task, settask] = useState("");


    const handleClose = (e) => setShow(false);

    function handlechange(value) {

        settask(value);
    }


    function handleAddTask(e) {

        e.preventDefault();
        setShow(false);
        SubmitNewTask(task);

    }

    return (

        <Dialog ref={React.useRef(null)} onClose={handleClose} aria-labelledby="simple-dialog-title" open={show}>
            <DialogTitle id="simple-dialog-title">+ New Task</DialogTitle>
            <div className=" pl-4 pr-4 pb-4    ">
                <form className="form-signin" onSubmit={handleAddTask}  >
                    <div className="form-group">
                        <input type="text" name="task" id="task" className="form-control" placeholder="Task Name" autoFocus onChange={(e) => handlechange(e.target.value)} />
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" >+ New Task</button>
                </form>
            </div>
        </Dialog>

    )
}

const NoTask = ({ newTask, handleShow }) => {

    return (
        <div className="row h-100">
            <div className="my-auto mx-auto col-sm-12 col-lg-4 col-12">
                <div className="shadow p-5 bg-white todo_round ">
                    <h3 className="text-center mb-4">You have no task.</h3>
                    <div className="text-center">
                        <button className="btn btn-lg btn-primary " onClick={handleShow} >+ New Task</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Todo = ({ todo, change, complete, remove }) => {

    // Each Todo
    if (todo) {

        return (
            <li className="list-group-item" key={todo.id} >

                <div className="row">
                    <div className="col-md-6 d-flex flex-row">


                        <FormControlLabel
                            className={todo.completed ? "line_through" : ""}
                            control={
                                <Checkbox
                                    checked={todo.completed ? "true" : ""}
                                    onChange={(e) => complete(todo.id, e.target.checked)}
                                    color="default"
                                />
                            }
                            label={todo.text}
                        />
                    </div>

                    <div className="col-md-6 d-flex flex-row-reverse">

                        <IconButton aria-label="delete" onClick={() => remove(todo.id)} >
                            <Delete fontSize="small" />
                        </IconButton>
                    </div>
                </div>
            </li>
        )
    } else {
        return "";
    }


}


const TodoList = ({ todos, change, complete, remove }) => {

    const todoNode = todos.map(value => <Todo key={value.id} change={change} complete={complete} todo={value} remove={remove} />);

    return (<ul className="list-group m-t-2">{todoNode}</ul>);


}
export default function TodoContainer() {

    // { "id": 1, "text": "This is task 1", completed: true },
    // { "id": 2, "text": "This is task 2", completed: false },
    // { "id": 3, "text": "This is task 3", completed: false },
    // { "id": 4, "text": "This is task 4", completed: false },
    // { "id": 5, "text": "This is task 5", completed: false },


    const [todos, settodos] = useState([]);
    const [filteredTodos, setfilteredTodos] = useState([]);

    const [show, setShow] = useState(false);

    const handleShow = (e) => setShow(true);

    function changeTodoStates(newTodos) {
        settodos(newTodos);
        setfilteredTodos(newTodos);
    }
    function handleAddTask(value) {

        changeTodoStates([...todos, { "id": Date().toString(), "text": value, completed: false }]);
    }

    function handleRemove(id) {

        const newTodos = todos.filter((todo) => {
            if (todo.id !== id) return todo;
            return false;
        });
        changeTodoStates(newTodos);

    }

    function handleChange(e, id) {

        const newTodos = todos.filter((todo) => {
            if (todo.id !== id) return todo;
            return false;
        });

        return changeTodoStates(newTodos);
    }
    function handleCompleted(id, completed) {

        const updatedTodos = todos.filter((todo) => {
            if (todo.id === id) {
                todo.completed = completed
                return todo;
            }
            return todo;

        });

        changeTodoStates(updatedTodos);
    }

    function handleSearch(search) {

        //https://dev.to/iam_timsmith/lets-build-a-search-bar-in-react-120j
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (search !== "") {
            // Assign the original list to currentList
            currentList = todos;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.text.toLowerCase();
                // change search term to lowercase
                const filter = search.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = todos;
        }
        // Set the filtered state based on what our rules added to newList
        setfilteredTodos(newList);

    }

    return (
        <div className="container h-75">

            {todos.length > 0 ? (
                <div className="row">
                    <div className="col-4 col-sm-4 col-md-4"><TasksCompleted tasks={todos} /></div>
                    <div className="col-4 col-sm-4 col-md-4"><TasksLatest tasks={todos} /></div>
                    <div className="col-4 col-sm-4 col-md-4"><TaskChart tasks={todos} /></div>
                </div>)
                : ""}

            {todos.length === 0 ? <NoTask newTask={handleAddTask} handleShow={handleShow} /> : ""}

            {show && (<NewTaskModal show={show} setShow={setShow} SubmitNewTask={handleAddTask}></NewTaskModal>)}

            {todos.length > 0 ? (

                <div className="container">

                    <div className="row pt-5">

                        <div className="col-md-6 d-flex flex-row">
                            <h3>Tasks</h3>
                        </div>

                        <div className="col-md-6 d-flex d-flex  ">
                            <input
                                type="text"
                                name="search"
                                className="form-control mr-3 flex-row-reverse"
                                placeholder="Search by tasks name"
                                onChange={(e) => { handleSearch(e.target.value) }}
                            />
                            <button onClick={handleShow}
                                className="btn btn-sm btn-primary text-nowrap"
                                type="button"
                            >+ New Task</button>

                        </div>
                    </div>
                    <div className="pt-4">
                        <TodoList todos={filteredTodos} change={handleChange} complete={handleCompleted} remove={handleRemove} />
                    </div>
                </div>
            ) : ""}


        </div>

    )
}
