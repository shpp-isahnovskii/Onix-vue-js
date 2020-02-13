import { createModule, mutation, action, extractVuexModule } from "vuex-class-component";
import { TasksInterface } from "@/interfaces/TasksInterface.ts";
import {getTasks, postTask, deleteTask} from "@/service/tasksApi";

const VuexModule = createModule({
  namespaced: "tasks",
  strict: false,
});

export class TaskStore extends VuexModule {

  private taskStatuses = ['todo', 'inprogress', 'done'];
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
    const status = await postTask(task).then((responce: any) => responce.status);
    if(status === "ok") {
      return true;
    }
    return false;
  }
  //Post
  @mutation addingTask(task: TasksInterface) {
    this.tasksData.push(task);
  }

  //Delete
  @action async fetchDeleteTask(index: number) {
    const status = await deleteTask(index).then((responce: any) => responce.status);
    
    if(status === "ok") {
      return true;
    }
    return false;
  }
  //Delete
  @mutation delTask(index: number) {
    this.tasksData.splice(index, 1);
  }

  @mutation setTaskStatus(task : {id: number, status: string}) {
    this.tasksData[task.id].status = task.status;
  }

  /* change status: todo inprogress or done */
  @mutation nextTaskStatus(index: number) {
    const status = this.tasksData[index].status;
    const statuses = this.taskStatuses;
    let nextStatus = "";

    switch (status) {
      case statuses[0]: nextStatus = statuses[1];
      break;
      case statuses[1]: nextStatus = statuses[2];
      break;
      default: nextStatus = statuses[0];
      break;
    }
    this.tasksData[index].status = nextStatus;
  }

  /* This mutation can change task description and date by id */
  @mutation changeTaskData(task: {id: number, description: string, date: string }) {
    //find index of the task by ID
    const index = this.tasksData.findIndex( (element: TasksInterface) => element.id === task.id);

    this.tasksData[index].description = task.description;
    this.tasksData[index].date = task.date;
  } 
}