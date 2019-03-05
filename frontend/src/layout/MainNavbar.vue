<template>
            
	<navbar position="fixed"
	        :transparent="transparent"
	        :color-on-scroll="colorOnScroll"
	        menu-classes="ml-auto">
		<template slot-scope="{toggle, isToggled}">
			
			<ul class="navbar-nav ml-auto">
				<li class="nav-item active">
					
				</li>
				<li class="nav-item">
					<a class="nav-link" href="" v-on:click="$router.push('/');">
						Home
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="" v-on:click="$router.push('/project/search');">
						Spaces
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="" v-on:click="$router.push('/artists');">
						Artists
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="" v-on:click="$router.push('/project/post');">
						Post a Space
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="" v-on:click="$router.push('/project/post');">
						Post a Art works
					</a>
				</li>
			</ul>
		</template>
		<template slot="navbar-menu">
			<li class="nav-item active">
					
			</li>
			<li class="nav-item" v-if="!currentUser">
				<a class="nav-link" href="" v-on:click="$router.push('/login');">
					Login
				</a>
			</li>
			<li class="nav-item" v-if="!currentUser">
				<a class="nav-link" href="" v-on:click="$router.push('/register');">
					Register
				</a>
			</li>

			<drop-down tag="li" :title="fullName" icon="now-ui-icons users_single-02" class="nav-item"  v-if="currentUser">
				<nav-link to="/dashboard">
					<i class="now-ui-icons users_circle-08"></i> Profile
				</nav-link>
				<nav-link to="/dashboard">
					<i class="now-ui-icons business_bulb-63"></i> User
				</nav-link>
				<a href="" v-on:click="logout" class="dropdown-item"> 
					<i class="now-ui-icons sport_user-run"></i> Logout
				</a>
			</drop-down>
		</template>
	</navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
import { mapActions } from 'vuex'
import { bus } from '../main.js'

export default {
	name: "main-navbar",
	props: {
		transparent: Boolean,
		colorOnScroll: Number
	},
	components: {
		DropDown,
		Navbar,
		NavbarToggleButton,
		NavLink,
		[Popover.name]: Popover
	},
	computed: {
		currentUser(){
			return this.$store.state.user.currentUser;
		},
		fullName(){
			return this.$store.state.user.currentUser.firstName + ' ' + this.$store.state.user.currentUser.lastName;
		},
	},
	methods: {
		...mapActions([
		'logout'
		])
	},
};
</script>

<style scoped>
</style>
