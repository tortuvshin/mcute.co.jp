import { API_SERVER } from '../../api.js'
import { bus } from '../../main.js'
import Vue from 'vue'

const LOGIN_URL = API_SERVER + '/login';
const REGISTER_URL = API_SERVER + '/register';

const state = {
	currentUser: JSON.parse(window.localStorage.getItem('currentUser')) || null,
	token: window.localStorage.getItem('token') || null
}

const getters = {
}

const actions = {
	login(context, payload) {
		const POST_DATA = payload.user;
		const ref = payload.ref;
	    Vue.http.post(LOGIN_URL, POST_DATA).then(response => {   
	      context.commit('setCurrentUser', response.body.currentUser);
	      context.commit('setToken', response.body.token); 
	      ref.loginSuccess(response.body);
	    }, response => {
	    	ref.loginFail(response.body);
	    });  
	},
	register(context, payload) {
		const POST_DATA = payload.user;
		const ref = payload.ref;
		Vue.http.post(REGISTER_URL, POST_DATA).then(response => {
	      context.commit('setCurrentUser', response.body.currentUser);
	      context.commit('setToken', response.body.token); 
	      ref.registerSuccess(response.body);
	    }); 
	},
	logout(context) {
		context.commit('setCurrentUser', null);
		context.commit('setToken', null);
		location.reload();
	}
}

const mutations = {
	setCurrentUser(state, currentUser){
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
		state.currentUser = currentUser;
	},
	setToken(state, token){
		var value = 'JWT ' + token;
		// When logging out
		if (!token){
			value = null;
			localStorage.removeItem('token');
		}else{
			localStorage.setItem('token', value);
		}
		state.token = value;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}