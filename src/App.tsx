import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType ={
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType ={
    [key:string]:TaskType[]
}
function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    // let todolistId1 = v1();
    // let todolistId2 = v1();
    //
    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {id: todolistId1, title: "What to learn"},
    //     {id: todolistId2, title: "What to buy"}
    // ])
    //
    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId1]:{
    //         data:[
    //             {id: v1(), title: "HTML&CSS1111", isDone: true},
    //             {id: v1(), title: "JS1111", isDone: true}
    //         ],
    //         filter: "all"
    //     } ,
    //     [todolistId2]:{
    //         data:[
    //             {id: v1(), title: "HTML&CSS22222", isDone: true},
    //             {id: v1(), title: "JS2222", isDone: true}
    //         ],
    //         filter: "all"
    //     }
    // });

  ///////////////////////////////////////////////////////////
    // let [todolists, setTodolists] = useState<TodolistsType[]>([
    //         {id: v1(), title: 'What to learn', filter: 'active'},
    //         {id: v1(), title: 'What to buy', filter: 'all'},
    //     ]
    // )
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");
///////////////////////////////////////////////////

    const removeTodolist=(todolistID:string)=>{
        setTodolists(todolists.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]
        console.log(tasks)
    }

    function removeTask(todolistID:string, taskId: string) {
        setTasks({...tasks, [todolistID]:tasks[todolistID].filter(el=>el.id!==taskId)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }
    function addTask(todolistID:string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }
    function changeStatus(todolistID:string, taskId: string, isDone: boolean) {

        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el=>el.id===taskId ?{...el, isDone}:el)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasks]);
    }


    // let tasksForTodolist = tasks;
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(todolistID: string,  value: FilterValuesType) {
        // setFilter(value);
        setTodolists(todolists.map(el=>el.id===todolistID ?{...el, filter: value} :el));
    }


    return (
        <div className="App">
            {todolists.map(el=>{

                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist   key={el.id}
                                todolistID={el.id}
                                title={el.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={el.filter}
                                removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
