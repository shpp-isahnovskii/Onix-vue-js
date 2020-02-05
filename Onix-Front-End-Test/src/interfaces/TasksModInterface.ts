import { TasksInterface } from "./TasksInterface"
export default interface TasksModInterface extends TasksInterface {
  expiration: number;
}