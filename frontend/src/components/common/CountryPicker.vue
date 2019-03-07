<template>
	<div class="country-picker">
	    <label for="movie">Select country</label>
	    <md-select v-model="country" required>
	        <md-option v-for="country in Object.keys(countries)" :value="country">{{ countries[country] }}</md-option>
	    </md-select>
    </div>
</template>

<script>
import countries from '../../assets/json/countries.json'
export default {
  data () {
    return {
      country: this.value,
      countries: countries
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    country (val) {
      this.countrySelected(val)
    }
  },
  methods: {
    countrySelected (value) {
      this.$emit('change')
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
.country-picker{
	width: 100%;
}

label{
	font-weight: 500;
}
</style>
