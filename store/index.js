import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		topIdList: [],
		nextId: ''
	},
	mutations: {
		INIT_CHANGE(state, playload) {
			state.topIdList = playload;
		},
		NEXT_ID(state, playload) {
			for (var i = 0; i < state.topIdList.length; i++) {
				if (state.topIdList[i].id == playload) {
					state.nextId = state.topIdList[i + 1].id;
				}
			}
		}
	}
});
