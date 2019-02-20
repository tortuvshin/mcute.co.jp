import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import user from './modules/user'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state:{
		socketID: '',
	},
	actions,
	getters,
	mutations,
	modules: {
		user
	}
});