import { createModule, mutation, action, extractVuexModule } from "vuex-class-component";
import { TasksInterface } from "@/interfaces/TasksInterface.ts"

const VuexModule = createModule({
  namespaced: "tasks",
  strict: false,
})

export class TaskStore extends VuexModule {

  private taskStatuses = ['todo', 'inprogress', 'done'];

  private tasksData : TasksInterface[] = [
    {id: 0, title: 'task1', description: 'Making bed.', date: '2020-01-27T07:00', status: 'done'},
    {id: 1, title: 'task2', description: 'Washing face.', date: '2020-01-27T07:05', status: 'inprogress'},
    {id: 2, title: 'task3', description: 'Drinking a pint of lemon water.', date: '2020-01-27T07:10', status: 'todo'},
    {id: 3, title: 'task4', description: 'Making breakfast.', date: '2020-01-28T07:15', status: 'todo'},
    {id: 4, title: 'task5', description: 'Reviewing my goals.', date: '2020-01-28T07:45', status: 'todo'},
    {id: 5, title: 'task7', description: 'Writing down two to four important tasks for the day.', date: '2020-02-01T07:50', status: 'todo'},
    {id: 6, title: 'task8', description: 'Suit up.', date: '2020-02-02T08:00', status: 'todo'},
    {id: 7, title: 'task9', description: 'Go out.', date: '2020-02-02T08:10', status: 'todo'},
    {id: 8, title: 'task10', description: 'Driving to the office.', date: '2020-02-18T08:15', status: 'todo'},
    {id: 9, title: 'task11', description: 'Talk to the manager.', date: '2020-02-18T08:45', status: 'todo'},
    {id: 10, title: 'task12', description: 'Planing work day.', date: '2020-03-01T08:50', status: 'todo'},
    {id: 11, title: 'task13', description: 'Work hard or easy.', date: '2020-03-29T09:00', status: 'todo'},
  ];

  @mutation deleteTask(index: number) {
    this.tasksData.splice(index, 1);
  }

  @mutation setTaskStatus(task : {id: number, status: string}) {

    // eslint-disable-next-line no-console
    console.log(task.id + " " + task.status);
    
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

  @mutation addingTask(task : TasksInterface) {
    this.tasksData.push(task);
  }

  /* This mutation can change task description and date by id */
  @mutation changeTaskData(task: {id: number, description: string, date: string }) {
    //find index of the task by ID
    const index = this.tasksData.findIndex( (element: TasksInterface) => element.id === task.id);

    this.tasksData[index].description = task.description;
    this.tasksData[index].date = task.date;
  } 
}