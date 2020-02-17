import { createModule, mutation, action, extractVuexModule } from "vuex-class-component";
import { TasksInterface } from "@/interfaces/TasksInterface.ts";
import {getTasks, postTask, deleteTask, changeTask} from "@/service/tasksApi";

const VuexModule = createModule({
  namespaced: "tasks",
  strict: false,
});

export class TaskStore extends VuexModule {
  private tasksData : TasksInterface[] = [];

  //Get
  //get tasks from API
  @action async fetchTasks() {
    return await getTasks();
  }
  //Get
  //set fetched data to the tasksData
  @mutation loadTasks(tasks : any) {
    this.tasksData = tasks;
  }
  
  //Post
  //send new task to the server return 'ok' if server got it
  @action async fetchAddingTask(task : TasksInterface): Promise<boolean> {
    return await postTask(task).then((response: any) => {
      if(response.status === "ok") {
        return {status: true, id: response.id};
      }
      return {status: false, id: 0};
    });
  }
  //Post
  @mutation addingTask(task: TasksInterface) {
    this.tasksData.push(task);
  }

  //Delete
  @action async fetchDeleteTask(id: number): Promise<Object> {
    return await deleteTask(id).then((response: any) => {
      if(response.status === "ok") {
        return true;
      }
      return false;
    });
  }
  //Delete
  @mutation delTask(index: number) {
    this.tasksData.splice(index, 1);
  }
  //Change
  @action async fetchChangeTask(task: TasksInterface) {
    return await changeTask(task).then((response: any) => {

      if(response.status === "ok") {
        return true
      }
      return false
    });
  }

  /* change task data */
  @mutation changeTaskData(task: TasksInterface) {
    const index = this.tasksData.findIndex( (element: TasksInterface) => element.id === task.id);
    
    if(index !== -1) {
      this.tasksData[index] = task;
    }
  }
}