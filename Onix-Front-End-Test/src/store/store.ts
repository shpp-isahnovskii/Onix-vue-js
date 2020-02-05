import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
		loadTasks: (context, tasks) => {
			context.commit('reloadTasks', tasks);
		},
		loadUser: (context, user) => {
			context.commit('reloadUser', user);
		}
	},
	mutations: {
		reloadTasks: (state, mutation) => {
			state.tasks = mutation;
		},
		reloadUser: (state, mutation) => {
			state.user = mutation;
		},
	}
});