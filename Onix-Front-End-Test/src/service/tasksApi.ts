import axios from "./api";


//GET
const GET_TASKS_API = axios.get('/tasks').then( (responce : any) => responce.data)
  .catch((err: string)=> {
    // eslint-disable-next-line no-console
    console.error(err);
});

//POST

//PUT

//DEL
    

export {GET_TASKS_API};
