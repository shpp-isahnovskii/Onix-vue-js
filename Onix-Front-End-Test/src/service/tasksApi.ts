import axios from "./api";
import { TasksInterface } from "@/interfaces/TasksInterface"

//GET
const getTasks = () => axios.get('/tasks').then( (response : any) => response.data);

//POST
const postTask = (data: TasksInterface) => axios.post('/tasks', data).then( (response : any) => response.data);

//DEL
const deleteTask = (id: number) => axios.delete('/tasks/'+id).then( (response: any) => {
  // eslint-disable-next-line no-console
  console.log(response);
  
  return response.data});

//PUT (change something in task)
const changeTask = (id: number) => axios.put('/tasks/'+id).then ( (response: any) => response.data);


export {getTasks, postTask, deleteTask, changeTask};
