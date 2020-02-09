import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store ({
	state: {
		tasks: [],
		user: [],
		articles: []
	},
	getters: {
		getTasks : st => st.tasks,
		getUser : st => st.user,
		getArticles: st => st.articles
	},
	actions: {
		loadTasks: (context, tasks) => {
			context.commit('reloadTasks', tasks);
		},
		loadUser: (context, user) => {
			context.commit('reloadUser', user);
		},
		loadArticles: (context, articles) => {
			context.commit('reloadArticle', articles);
		}
	},
	mutations: {
		reloadTasks: (state, mutation) => {
			state.tasks = mutation;
		},
		reloadUser: (state, mutation) => {
			state.user = mutation;
		},
		reloadArticle: (state, mutation) => {
			state.articles = mutation;
		}
	}
});