import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { UserInterface } from '@/interfaces/UserInterface'

Vue.use(Vuex);

export const user: Module<UserInterface> = {
	
}

export default new Vuex.Store ({
	state: {
		tasks: [],
		user: []
	},
	getters: {
		getTasks : st => st.tasks,
		getUser : st => st.user
	},
	actions: {
		loadTasks(context, tasks) {
			context.commit('loadTasks', tasks);
		},
		loadUser(context, user) {
			context.commit('loadUser', user);
		},
		closeTask(context, user) {
			context.commit('closeTask', user);
		}
	},
	mutations: {
		loadTasks(state, mutation) {
			state.tasks = mutation;
		},
		loadUser(state, mutation) {
			state.user = mutation;
		},
		closeTask(state, mutation) {
			// eslint-disable-next-line no-console
			console.log(state.user.tasks.open);
			
		}
	}
});