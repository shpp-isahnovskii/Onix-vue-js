import { createModule, mutation, action, extractVuexModule } from "vuex-class-component";
import { UserInterface } from "@/interfaces/UserInterface.ts"

const VuexModule = createModule({
  namespaced: "user",
  strict: false,
})

export class UserStore extends VuexModule {

  private userData : UserInterface = {
    company: 'PROJECTUS',
    personal: {
      avatar: require('@/assets/images/people/avatar.jpg'),
      name: 'Jean Gonzales',
      role: 'Product Ovner'
    },
    tasks: {
      open: 12,
      closed: 372
    },
    notifications: 3
  }
  //increase tasks counter
  @mutation removeTaskCounter() {
    this.userData.tasks.open--;
    this.userData.tasks.closed++;
  }
  //reduce tasks counter
  @mutation addTaskCounter() {
    this.userData.tasks.open++;
  }
}