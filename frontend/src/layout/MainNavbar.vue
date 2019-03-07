<template>

	<navbar position="fixed"
	        :transparent="transparent"
	        :color-on-scroll="colorOnScroll"
	        menu-classes="ml-auto">
		<template slot-scope="{toggle, isToggled}">
			<router-link v-popover:popover1 class="navbar-brand" to="/">
				MCute Matching System
			</router-link>
		</template>
		<template slot="navbar-menu">
			
				<router-link class="nav-item" tag="li" to="/project/search">
					<a class="nav-link">
						Spaces
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/artist">
					<a class="nav-link">
						Artist
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/project/post">
					<a class="nav-link">
						Post a Space
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/project/post">
					<a class="nav-link">
						Post a Artworks
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/login" v-if="!currentUser">
					<a class="nav-link">
						Login
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/register" v-if="!currentUser">
					<a class="nav-link">
						Register
					</a>
				</router-link>
				

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
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components'
import { Popover } from 'element-ui'
import { mapActions } from 'vuex'
import { bus } from '../main.js'

export default {
  name: 'main-navbar',
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
    currentUser () {
      return this.$store.state.user.currentUser
    },
    fullName () {
      return this.$store.state.user.currentUser.firstName + ' ' + this.$store.state.user.currentUser.lastName
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
</style>
