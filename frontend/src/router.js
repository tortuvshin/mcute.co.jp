import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/dashboard/Index.vue'
import RegisterOld from '@/views/RegisterOld.vue'
import Account from '@/views/dashboard/Account.vue'
import Deposit from '@/views/dashboard/billing/Deposit.vue'
import Withdraw from '@/views/dashboard/billing/Withdraw.vue'
import Transaction from '@/views/dashboard/billing/Transactions.vue'
import MyProject from '@/views/dashboard/Project.vue'
import Security from '@/views/dashboard/Password.vue'
import Notification from '@/views/dashboard/Notification.vue'

import Rating from '@/views/dashboard/project/Rating.vue'
import ProjectDetails from '@/views/dashboard/project/ProjectDetails.vue'

import PostProject from '@/views/project/Post.vue'
import ViewProject from '@/views/project/View.vue'
import SearchProject from '@/views/project/Search.vue'
import EditProject from '@/views/project/Edit.vue'

import ViewTickets from '@/views/support/ViewTickets.vue'
import ViewTicket from '@/views/support/ViewTicket.vue'
import CreateTicket from '@/views/support/CreateTicket.vue'

import ViewProfile from '@/views/profile/ViewProfile.vue'

import PaypalReturn from '@/views/dashboard/billing/PaypalReturn.vue'

// New Routes

import AppHeader from '@/layout/MainNavbar.vue'
import AppFooter from '@/layout/MainFooter.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'
import ContentList from '@/views/content/ContentList.vue'
import ContentCreate from '@/views/content/ContentCreate.vue'
import Error from '@/views/Error.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'Home',
      components: { header: AppHeader, default: Home, footer: AppFooter },
      props: { header: { colorOnScroll: 65 } }
    },
    {
      path: '/login',
      name: 'Login',
      components: { header: AppHeader, default: Login },
      props: { header: { colorOnScroll: 65 } }
    },
    {
      path: '/signup',
      name: 'Register',
      components: { header: AppHeader, default: RegisterOld, footer: AppFooter }
    },
    {
      path: '/list',
      components: {
			  header: AppHeader,
			  default: ContentList,
			  footer: AppFooter
      },
      name: 'ItemList'
    },
    {
      path: '/create',
      components: {
			  header: AppHeader,
			  default: ContentCreate,
			  footer: AppFooter
      },
      name: 'ContentCreate'
    },
    {
      path: '/artworks',
      components: {
			  header: AppHeader,
			  default: ContentList,
			  footer: AppFooter
      },
      name: 'ArtWorks'
    },
    { path: '/register', 
      name: 'Register',
      components: { header: AppHeader, default: Register },
      props: { header: { colorOnScroll: 65 } } 
    },
    { path: '/profile',
      components: { header: AppHeader, default: Profile, footer: AppFooter },
      props: { header: { colorOnScroll: 65 } },
      children: [
        { path: '', 
          components: 
          {
            header: AppHeader,
            default: Profile,
            footer: AppFooter
          }
          , name: 'MyProfile', meta: { auth: true } 
        },
        { path: 'account', component: Account, name: 'Account', meta: { auth: true } },
        { path: 'billing/deposit', component: Deposit, name: 'Deposit', meta: { auth: true } },
        { path: 'billing/withdraw', component: Withdraw, name: 'Withdraw', meta: { auth: true } },
        { path: 'billing/transaction', component: Transaction, name: 'Transaction', meta: { auth: true } },
        { path: 'security', component: Security, meta: { auth: true } },
        { path: 'notification', component: Notification, meta: { auth: true } }
      ]
    },
    { path: '/account', component: Account, name: 'Account', meta: { auth: true } },
    { path: '/dashboard/billing/return', component: PaypalReturn, meta: { auth: true } },
    { path: '/dashboard/project', component: MyProject, meta: { auth: true } },
    { path: '/dashboard/project/:id/rating', component: Rating, meta: { auth: true } },
    { path: '/dashboard/project/:id/details', component: ProjectDetails, meta: { auth: true } },
    { path: '/project/search', component: SearchProject, name: 'SearchProject', meta: { title: 'Browse Job' } },
    { path: '/project/post', component: PostProject, name: 'PostProject', meta: { auth: true, title: 'Post Job' } },
    { path: '/project/:id/edit', component: EditProject, name: 'EditProject', props: true, meta: { auth: true, title: 'Edit Job' } },
    { path: '/project/:id', component: ViewProject, name: 'ViewProject' },
    { path: '/support', component: ViewTickets, name: 'ViewTickets', meta: { auth: true, title: 'Support Center' } },
    { path: '/support/create', component: CreateTicket, name: 'CreateTicket', meta: { auth: true } },
    { path: '/support/:id', component: ViewTicket, name: 'ViewTicket', meta: { auth: true } },
    { path: '/profile/:username', component: ViewProfile, props: true, name: 'ViewProfile', meta: { title: 'View Profile' } },
    { path: '*', component: Error },
    {
      path: '/error',
      name: 'Error',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Error.vue')
    }
  ]
})
