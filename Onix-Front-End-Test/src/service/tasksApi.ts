import axios from "./api";
import { TasksInterface } from "@/interfaces/TasksInterface"


//GET
const getTasks = () => axios.get('/tasks').then( (responce : any) => responce.data);

//POST
const postTask = (data: TasksInterface) => axios.post('/tasks', data).then( (responce : any) => responce.data);

//DEL
const deleteTask = (id: number) => axios.delete('/tasks/'+id).then( (responce: any) => responce.data);

//PUT


export {getTasks, postTask, deleteTask};
