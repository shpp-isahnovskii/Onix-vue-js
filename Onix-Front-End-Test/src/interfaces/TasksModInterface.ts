import { TasksInterface } from "./TasksInterface"
export default interface TasksModInterface extends TasksInterface {
  id: number,
  expiration: number
}