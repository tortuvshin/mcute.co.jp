import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import Error from "../views/ErrorPage.vue";

import Index from "../views/dashboard/Index.vue";
import Account from "../views/dashboard/Account.vue";
import Deposit from "../views/dashboard/billing/Deposit.vue";
import Withdraw from "../views/dashboard/billing/Withdraw.vue";
import Transaction from "../views/dashboard/billing/Transactions.vue";
import MyProject from "../views/dashboard/Project.vue";
import Security from "../views/dashboard/Password.vue";
import Notification from "../views/dashboard/Notification.vue";

import Rating from "../views/dashboard/project/Rating.vue";
import ProjectDetails from "../views/dashboard/project/ProjectDetails.vue";

import PostProject from "../views/project/Post.vue";
import ViewProject from "../views/project/View.vue";
import SearchProject from "../views/project/Search.vue";
import EditProject from "../views/project/Edit.vue";

import ViewTickets from "../views/support/ViewTickets.vue";
import ViewTicket from "../views/support/ViewTicket.vue";
import CreateTicket from "../views/support/CreateTicket.vue";

import ViewProfile from "../views/profile/ViewProfile.vue";

import Profile from "../components/profile/Profile.vue";

import PaypalReturn from "../views/dashboard/billing/PaypalReturn.vue";

import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import AdminHeader from "../layout/AdminHeader";
import AdminFooter from "../layout/AdminFooter";
import Components from "../views/Component.vue";
import Admin from "../views/Admin.vue";
import Register1 from "../views/Register.1.vue";
import Profile1 from "../views/Profile.vue";

Vue.use(Router);

export default new Router ({
	mode: 'history',
	linkExactActiveClass: "active",
	linkActiveClass: 'active',
	routes: [
		
		  {
			path: "/components",
			name: "components",
			components: {
			  header: AppHeader,
			  default: Components,
			  footer: AppFooter
			}
		  },{
			path: "/admin",
			name: "admin",
			components: {
			  header: AdminHeader,
			  default: Admin,
			  footer: AdminFooter
			}
		  },
		  {
			path: "/login",
			name: "login",
			components: {
			  header: AppHeader,
			  default: Login,
			  footer: AppFooter
			}
		  },
		  {
			path: "/signup",
			name: "register",
			components: {
			  header: AppHeader,
			  default: Register1,
			  footer: AppFooter
			}
		  },
		{ 
			path: '', 
			components: {
			  header: AppHeader,
			  default: Home,
			  footer: AppFooter
			},
			name:'Home'
		},
		{ path: '/register', component: Register, name:'Register'},
		{ path: '/dashboard', component: Index, children: [
			{ path: '', component: Profile, name: 'MyProfile', meta: { auth: true }},
			{ path: 'account', component: Account, name:'Account', meta: { auth: true }},
			{ path: 'billing/deposit', component: Deposit, name:'Deposit', meta: { auth: true }},
			{ path: 'billing/withdraw', component: Withdraw, name:'Withdraw', meta: { auth: true }},
			{ path: 'billing/transaction', component: Transaction, name:'Transaction', meta: { auth: true }},
			{ path: 'security', component: Security, meta: {auth: true}},
			{ path: 'notification', component: Notification, meta: {auth: true}}
		]}, 
		{ path: '/dashboard/billing/return', component: PaypalReturn, meta: {auth: true}},
		{ path: '/dashboard/project', component: MyProject, meta: {auth: true}},
		{ path: '/dashboard/project/:id/rating', component: Rating, meta: {auth: true}},
		{ path: '/dashboard/project/:id/details', component: ProjectDetails, meta: {auth: true}},
		{ path: '/project/search', component: SearchProject, name: 'SearchProject', meta: { title: 'Browse Job'}},
		{ path: '/project/post', component: PostProject, name: 'PostProject', meta: { auth: true, title: 'Post Job'}},
		{ path: '/project/:id/edit', component: EditProject, name: 'EditProject',props: true, meta: { auth: true, title: 'Edit Job' }},
		{ path: '/project/:id', component: ViewProject, name: 'ViewProject'},
		{ path: '/error', component: Error, name: 'error', name: 'Error'},
		{ path: '/support', component: ViewTickets, name: 'ViewTickets', meta: { auth: true, title: 'Support Center' }},
		{ path: '/support/create', component: CreateTicket, name: 'CreateTicket',  meta: { auth: true } },
		{ path: '/support/:id', component: ViewTicket, name: 'ViewTicket', meta: { auth: true }},
		{ path: '/profile/:username', component: ViewProfile, props: true, name: 'ViewProfile', meta: {title: 'View Profile'}},
		{ path: '*', component: Error}
	],
	scrollBehavior: to => {
		if (to.hash) {
		  return { selector: to.hash };
		} else {
		  return { x: 0, y: 0 };
		}
	  }
});
