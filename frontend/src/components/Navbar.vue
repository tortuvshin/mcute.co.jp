<template>
	<nav class="navbar-default navbar-inverse navbar navbar-inner navbar-fixed-top" :class="{'home-navbar-inner': isHomePage, 'home-navbar': isHomePage}" id="navbar">
	   <div class="container">
	      <div class="navbar-header">
	         <button type="button" class="collapsed navbar-toggle" :class="{'home-navbar-toggle': isHomePage}" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	         <span class="sr-only">Toggle navigation</span>
	         <span class="icon-bar"></span>
	         <span class="icon-bar"></span>
	         <span class="icon-bar"></span>
	         </button>
	         <router-link class="navbar-brand" :class="{'home-navbar-brand': isHomePage}" to="/"><i class="fa fa-gg fa-fw" aria-hidden="true"></i><span class="title"> ECJOB</span></router-link>
	      </div>
	      <!-- Collect the nav links, forms, and other content for toggling -->
	      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	          <ul class="nav navbar-nav" style="text-transform:none;" :class="{'home-navbar-nav': isHomePage}">
	            <li><router-link to="/project/post">Hire Freelancers</router-link></li>
	            <li><router-link to="/project/search">Work</router-link></li>
	            <li><router-link to="/support">Support Center</router-link></li>
	            <!--<li class="dropdown">-->
	            <!--  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>-->
	            <!--  <ul class="dropdown-menu">-->
	            <!--    <li><a href="#">Action</a></li>-->
	            <!--    <li><a href="#">Another action</a></li>-->
	            <!--    <li><a href="#">Something else here</a></li>-->
	            <!--    <li role="separator" class="divider"></li>-->
	            <!--    <li><a href="#">Separated link</a></li>-->
	            <!--    <li role="separator" class="divider"></li>-->
	            <!--    <li><a href="#">One more separated link</a></li>-->
	            <!--  </ul>-->
	            <!--</li>-->
	            </ul> 
	         <ul class="nav navbar-right navbar-nav" :class="{'home-navbar-nav': isHomePage}">
	            <template v-if="!currentUser">
		            <li><router-link to="/login">Log In</router-link></li>
		            <li><router-link to="/register">Sign Up</router-link></li>
	            </template>
	            <template v-else>
		            <li class="dropdown">
		               <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hi, {{currentUser.firstName }}  {{currentUser.lastName}}<span class="caret"></span></a>
		               <ul class="dropdown-menu">
		               	  <li class="text-center">Balance <i class="fa fa-dollar fa-fw" aria-hidden="true"></i><span class="balance">{{currentUser.balance}}</span></li>
		               	  <li role="separator" class="divider"></li>
		                  <li><router-link to="/dashboard"><i class="fa fa-tachometer fa-fw" aria-hidden="true"></i> Dashboard</router-link></li>
		                  <li><router-link to="/dashboard/project"><i class="fa fa-user fa-fw" aria-hidden="true"></i> My Project</router-link></li>
		                  <li role="separator" class="divider"></li>
		                  <li><a href="#" @click.prevent="logout"><i class="fa fa-sign-out fa-fw" aria-hidden="true"></i> Logout </a></li>
		               </ul>
		            </li>
	            </template>
	         </ul>
	      </div>
	      <!-- /.navbar-collapse -->
	   </div>
	</nav>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		props: ['isHomePage'],
		computed: {
			currentUser(){
				return this.$store.state.user.currentUser;
			}
		},
		methods: {
			...mapActions([
				'logout'
			])
		}
	}
</script>

<style scoped>
	ul:not(.md-list)>li+li{
		margin: 0;
	}
	.balance{
		font-family: Lato;
		font-size: 1.1em;
	}
	.navbar {
	    box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 3px rgba(12,13,14,0.1), 0 4px 20px rgba(12,13,14,0.035), 0 1px 1px rgba(12,13,14,0.025);
	}
	.dropdown-menu > li > a{
		padding: 10px 15px;
	}
	.dropdown-menu{
		min-width:201.77px; 
		font-size: 0.8em;
		z-index: 9999;
	}

	.navbar .nav > li > a{
		color: #000;
	}

	.navbar-inverse .navbar-nav>.open>a{
		background-color: #2c3e50;
	}

	.navbar{
		-webkit-transition: all 0.6s ease-out;
		-moz-transition: all 0.6s ease-out;
		-o-transition: all 0.6s ease-out;
		-ms-transition: all 0.6s ease-out;
		transition: all 0.6s ease-out;
		height: 70px;
		padding-top: 10px;
		z-index: 2;
	}
	.container-fluid{
		padding: 0 80px;
	}

	.navbar.scrolled {
		background: rgb(255, 255, 255);
	}

	.navbar-inverse .navbar-nav>.active>a:hover {
		background: transparent;
	}

	.navbar-inverse .navbar-nav>.active>a {
		background: transparent;
	}

	.navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover{
		color:black;
	}

	.navbar-nav>li>a:hover{
		color:black;
	}

	.navbar-inverse .navbar-nav {
		font-size: 18px;
		text-transform: uppercase;
	}

	.navbar-nav .open>a:hover{
		background-color: #2c3e50;
		color: white !important;
	}
	.navbar-inverse .navbar-collapse{
		border-color: #eee;
	}

	.navbar-inverse .navbar-nav .open .dropdown-menu .divider {
	    background-color: #eee;
	}

	.navbar-inverse .navbar-brand{
		color: black;
		font-size: 25px;
	}

	.navbar-inner {
		background: white;
		border-color: #e6e6e6;
	}

	.navbar-fixed-top .navbar-inner {
	    -webkit-border-radius: 0;
	    -moz-border-radius: 0;
	    border-radius: 0;
	}

	.navbar-inverse .navbar-toggle .icon-bar {
		background-color: black;
	}

	.navbar-inverse .navbar-toggle:focus, .navbar-inverse .navbar-toggle:hover {
	    background-color: #d3d3d3;
	}

	.title{
		letter-spacing: 5px;
		font-size: 30px;
	}

	/*For inverseNavbar*/
	.home-navbar-inner {
		background: transparent;
		border-color: transparent!important;
	}

	.home-navbar {
		box-shadow: 0px 0px 0px !important;
	}
	
	.home-navbar-nav li:hover{
		background-color: rgba(78, 102, 114,0.8);
		transition: 0.5s;
	}

	.home-navbar-nav > li > a {
		color: white!important;
	}

	.home-navbar-nav>.active>a {
		background: transparent!important;
	}

	.home-navbar-brand:focus, .home-navbar-brand:hover{
		color:black!important;
	}

	.home-navbar.scrolled {
		background: rgb(38, 50, 56)!important; 
	}

	.home-navbar-brand{
		color: white!important;
	}

	.home-navbar-brand:focus, .home-navbar-brand:hover{
		color: white!important;
	}

	.home-navbar-inverse .home-navbar-toggle{
		border-color: white!important;
	}

	.home-navbar-toggle .icon-bar{
		background-color: white!important;
	}

	@media (max-width: 1000px) {
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
	        top: 0;
	        border-width: 0 0 1px;
	    }

	    .collapse.in{
	    	margin-top: 12px;
	    }
	    
	    .collapsing, .in {
	    	background-color: white;
	    	margin-top: 12px;
	    }
		.collapsing ul li a, .in ul li a {color: black!important;}
		.collapsing ul li a:hover, .in ul li a:hover {color: rgb(157,155,159)!important;}
	    .navbar-collapse.collapse {
	        display: none!important;
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