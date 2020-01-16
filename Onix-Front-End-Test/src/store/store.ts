import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store ({
	state: {
		tasks: []
	},
	getters: {
		getTasks : st => {
			return st.tasks;
		}
	},
	actions: {
		load(context, tasks) {
			context.commit('loadTasks', tasks)
		}
	},
	mutations: {
		loadTasks(state, mutation) {
			state.tasks = mutation;
		}
	}
});