<template>
	<div class="loader">
      <md-spinner md-indeterminate class="md-accent"></md-spinner>
    </div>
</template>

<script>
	export default {

	}
</script>

<style scoped>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>