<template>
	<nav class="navbar">
	  	<div class="navbar-header">
	  		 <md-button class="md-icon-button btn-menu" @click.native="toggleSidebar">
	            <md-icon>menu</md-icon>
	         </md-button>
	         <button type="button" class="collapsed navbar-toggle" data-toggle="collapse" data-target="#menu" aria-expanded="false">
	         <span class="sr-only">Toggle navigation</span>
	         <span class="icon-bar"></span>
	         <span class="icon-bar"></span>
	         <span class="icon-bar"></span>
	         </button>
	    </div>
	    <div class="collapse navbar-collapse" id="menu">
	      <ul class="nav navbar-nav">
	      	<li>
		        <router-link to="/dashboard" class="selection"  exact>
		            <i class="fa fa-tachometer fa-fw" aria-hidden="true"></i> My Profile
		        </router-link>
	        </li>
	        <li>
	         <router-link to="/dashboard/account" class="selection" exact>
	            <i class="fa fa-info fa-fw" aria-hidden="true"></i> Account
	         </router-link> 
	        </li>
	        <li class="dropdown" :class="{open: showDropdown}" @mouseover="showDropdown = true" @mouseleave="showDropdown = false">
	          <a href="#" class="dropdown-toggle selection" role="button"> <i class="fa fa-credit-card fa-fw" aria-hidden="true"></i> Billing <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	          	<li>
		            <router-link to="/dashboard/billing/deposit" exact>
				        Deposit
				    </router-link>
			    </li>
			    <li>
				    <router-link to="/dashboard/billing/withdraw" exact>
				        Withdraw
				    </router-link>
			    </li>
			    <li>
				    <router-link to="/dashboard/billing/transaction" exact>
				        Transaction History
				    </router-link> 
			    </li>
	          </ul>
	        </li>
	        <li>
		        <router-link to="/dashboard/security" class="selection" exact>
				    <i class="fa fa-unlock-alt fa-fw" aria-hidden="true"></i> Password & Security
				</router-link>
			</li>
			<li>
				<router-link to="/dashboard/notification" class="selection" exact>
				    <i class="fa fa-comments fa-fw" aria-hidden="true"></i> Notification Settings
				</router-link>
			</li>
	      </ul>
	      
	      <ul class="nav navbar-nav navbar-right" style="float: right;">
	        <li><p class="navbar-text balance"><i class="fa fa-dollar"></i>{{ currentUser.balance.toLocaleString() }} <i class="fa fa-refresh btn-refresh" aria-hidden="true" @click="refreshBalance"></i></p></li>
	        <!-- <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li><a href="#">Action</a></li>
	            <li><a href="#">Another action</a></li>
	            <li><a href="#">Something else here</a></li>
	            <li role="separator" class="divider"></li>
	            <li><a href="#">Separated link</a></li>
	          </ul>
	        </li> -->
	      </ul>
	    </div><!-- /.navbar-collapse -->
	</nav>
</template>

<script>
	import { API_SERVER } from '../../api.js'
	export default {
		data(){
			return {
				billingSlide: false,
				showDropdown: false
			};
		},
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			}
		},
		methods: {
			toggleSidebar(){
				this.$emit('toogleSidebar');
			},
			refreshBalance(){
				console.log("sad");
				this.$http.get(API_SERVER + '/dashboard/balance').then(response => {
					console.log(response.body);
					this.$store.commit('setCurrentUser', response.body.currentUser);
				});
			}
		},
		created(){
			console.log('HI');
		}
	}
</script>

<style scoped>
.btn-menu{
	border: 0!important;
	background-color: transparent!important;
	margin-top: 3px;
 }

.btn-refresh{
	cursor: pointer;
}


li > a, li > a:hover{
	padding: 21px 18px;
	text-decoration: none!important;
}




ul:not(.md-list)>li+li{
	margin-top: 0px;
}

#menu {
	padding: 0px 100px;
}
.navbar{
	width: 100%;
	margin-bottom: 0 !important;
}

.navbar-header button{
	background-color: #476481;
	border: 1px solid #000;
}

.navbar-header .icon-bar{
	background-color: #fff;
}

.navbar-header{
	padding-top: 7px;
}

.navbar {
    background-color: transparent;
    height: 64px;
}

.navbar-fixed-top{
	z-index: 1;
}

.selection {
    font-size: 15px;
    color: #fff!important;
    text-align: center;
}

i{
	padding-right: 10px;
}

.dropdown-menu {
	width: 185px;
}

.dropdown-menu > li{
	margin: 10px 0;
	color: #000;
}

.dropdown-menu > li > a{
	padding: 10px 15px;
	color: #000;
}

.dropdown > a, .balance{
	color: #fff;
}

.balance{
	font-family: Lato;
	font-size: 1.25em;
    margin: 18px 0;
}

.selection:hover, .selection:active, .selection:focus, .nav .open>a{
	background-color: #476481;
	transition: 0.5s;
}

a:hover, a:active, a:link, a:visited {
    text-decoration: none;
}

.route-active, .route-active:hover{
    border-left: 10px;
    background-color: #476481;
    color: #fff !important;
}

.billing-list{
    padding-left: 40px;
    overflow: hidden;
}

.balance-heading{
    padding-left: 20px;
    padding-top: 25px;
    border-bottom: 1px solid #eee;
    height: 80px;
}

.balance > h2 {
    margin-bottom: 0px;
}

.billing-list > li > a {
    margin-left: 15px;
}

.price {
    font-family: Lato;
    font-weight: 300;
    font-size: 40px;
    padding-left: 30px;
    padding-top: 15px;
    display: inline-block;
}

hr {
   width: 80%; 
}

@media (max-width: 1375px) {
  .navbar-header {
      float: none;
  }
  .navbar-left,.navbar-right {
      float: none !important;
  }
  .navbar-toggle {
      display: block;
  }
  .navbar-collapse {
      border-top: 1px solid transparent;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .navbar-fixed-top {
      border-width: 0 0 1px;
  }
  .navbar-collapse.collapse {
      display: none!important;
  }
  .navbar-nav {
      float: none!important;
      margin-top: 7.5px;
  }
  .navbar-nav>li {
      float: none;
  }
  .navbar-nav>li>a {
      padding-top: 10px;
      padding-bottom: 10px;
  }
  .collapse.in{
      display:block !important;
  }
}
</style>