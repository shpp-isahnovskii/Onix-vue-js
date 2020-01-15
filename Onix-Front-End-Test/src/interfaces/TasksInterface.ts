export interface TasksInterface {
    title : string
    subtasks : {
      description: string
      time: string
      status: string
    }[]
}
