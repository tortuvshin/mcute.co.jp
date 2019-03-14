<template>

	<navbar position="fixed"
	        :transparent="transparent"
	        :color-on-scroll="colorOnScroll"
	        menu-classes="ml-auto">
		<template slot-scope="{toggle, isToggled}">
			<router-link v-popover:popover1 class="navbar-brand" to="/">
				{{ $t('navigation.title') }}
			</router-link>
		</template>
		<template slot="navbar-menu">
				<router-link class="nav-item" tag="li" to="/artworks">
					<a class="nav-link">
						{{ $t('navigation.artworks') }}
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/project/search">
					<a class="nav-link">
						{{ $t('navigation.spaces') }}
					</a>
				</router-link>
				
				<router-link class="nav-item" tag="li" to="/project/post">
					<a class="nav-link">
						{{ $t('navigation.post-space') }}
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/project/post">
					<a class="nav-link">
						{{ $t('navigation.post-artwork') }}
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/login" v-if="!currentUser">
					<a class="nav-link">
						{{ $t('navigation.login') }}
					</a>
				</router-link>
				<router-link class="nav-item" tag="li" to="/register" v-if="!currentUser">
					<a class="nav-link">
						{{ $t('navigation.register') }}
					</a>
				</router-link>
				
			<drop-down tag="li" :title="language" class="nav-item">
				<a class="dropdown-item" href="javascript:void(0);"
           @click="changeLang('en-US')">English
				</a>
				<a class="dropdown-item" href="javascript:void(0);"
           @click="changeLang('ja-JP')">日本語
				</a>
			</drop-down>
			<drop-down tag="li" :title="fullName" icon="intelligo-icons users_single-02" class="nav-item"  v-if="currentUser">
				<nav-link to="/profile">
					<i class="intelligo-icons users_circle-08"></i> Profile
				</nav-link>
				<a href="" v-on:click="logout" class="dropdown-item">
					<i class="intelligo-icons sport_user-run"></i> Logout
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
	data () {
    return { 
				language: 'en-US',
				locales: ['en-US', 'ja-JP'] 
			}
  },
  methods: {
    ...mapActions([
      'logout'
		]),
		changeLang(locale){
			this.$i18n.locale = locale
			this.language = locale
		}
  }
}
</script>

<style scoped>
</style>
