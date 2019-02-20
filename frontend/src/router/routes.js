const Home = resolve => require(['../views/Home.vue'], resolve);
// import Login = resolve => require(['../views/Login.vue'
const Login = resolve => require(['../views/Login.vue'], resolve);
const Register = resolve => require(['../views/Register.vue'], resolve);

const Error = resolve => require(['../views/ErrorPage.vue'], resolve);

const Index = resolve => require(['../views/dashboard/Index.vue'], resolve);
const Account = resolve => require(['../views/dashboard/Account.vue'], resolve);
const Deposit = resolve => require(['../views/dashboard/billing/Deposit.vue'], resolve);
const Withdraw = resolve => require(['../views/dashboard/billing/Withdraw.vue'], resolve);
const Transaction = resolve => require(['../views/dashboard/billing/Transactions.vue'], resolve);
const MyProject = resolve => require(['../views/dashboard/Project.vue'], resolve);
const Security = resolve => require(['../views/dashboard/Password.vue'], resolve);
const Notification = resolve => require(['../views/dashboard/Notification.vue'], resolve);

const Rating = resolve => require(['../views/dashboard/project/Rating.vue'], resolve);
const ProjectDetails = resolve => require(['../views/dashboard/project/ProjectDetails.vue'], resolve);

const PostProject = resolve => require(['../views/project/Post.vue'], resolve);
const ViewProject = resolve => require(['../views/project/View.vue'], resolve);
const SearchProject = resolve => require(['../views/project/Search.vue'], resolve);
const EditProject = resolve => require(['../views/project/Edit.vue'], resolve);

const ViewTickets = resolve => require(['../views/support/ViewTickets.vue'], resolve);
const ViewTicket = resolve => require(['../views/support/ViewTicket.vue'], resolve);
const CreateTicket = resolve => require(['../views/support/CreateTicket.vue'], resolve);

const ViewProfile = resolve => require(['../views/profile/ViewProfile.vue'], resolve);

const Profile = resolve => require(['../components/profile/Profile.vue'], resolve);

const PaypalReturn = resolve => require(['../views/dashboard/billing/PaypalReturn.vue'], resolve);


export const routes = [
	{ path: '', component: Home, name:'Home'},
	{ path: '/login', component: Login, name:'Login' },
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
];
