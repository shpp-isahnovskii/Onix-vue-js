import Vue from 'vue';
import Vuex from 'vuex';
import { UserStore } from "./modules/userStore";
import { TaskStore } from "./modules/taskStore";
import { ActivityStore } from "./modules/activityStore";
import { extractVuexModule } from "vuex-class-component";

Vue.use(Vuex);

export default new Vuex.Store ({
  modules: {
    ...extractVuexModule( UserStore ),
		...extractVuexModule( TaskStore ),
		...extractVuexModule( ActivityStore )
  }
})