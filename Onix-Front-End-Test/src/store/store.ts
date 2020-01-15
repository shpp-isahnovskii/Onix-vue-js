import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store ({
  state: {
		tasks: [
			{ title: 'wake up', subtasks: [
				{ description: 'Making bed.', time: '7.00AM', status: 'done'},
				{ description: 'Washing face.', time: '7.05AM', status: 'inprogress'},
				{ description: 'Drinking a pint of lemon water.', time: '7.10AM', status: 'todo'},
				{ description: 'Making breakfast.', time: '7.15AM', status: 'todo'},
				{ description: 'Reviewing my goals.', time: '7.45AM', status: 'todo'},
				{ description: 'Writing down two to four important tasks for the day.', time: '7.50AM', status: 'todo'}
			]},
			{ title: 'go to the work', subtasks: [
				{ description: 'Suit up.', time: '8.00AM', status: 'todo'},
				{ description: 'Go out.', time: '8.10AM', status: 'todo'},
				{ description: 'Driving to the office.', time: '8.15AM', status: 'todo'},
				{ description: 'Talk to the manager.', time: '8.45AM', status: 'todo'},
				{ description: 'Planing work day.', time: '8.50AM', status: 'todo'},
				{ description: 'Work hard or easy.', time: '9.00AM', status: 'todo'},
			]}
		]
	}
});