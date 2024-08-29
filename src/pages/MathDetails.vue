<template>
	<div class="math-details">
	  <slot/>
	</div>
</template>


<style lang="scss">
.math-details {
	width: 400px;
	box-sizing: border-box;
	padding: 20px;
	text-align: left;

	ul {
		padding-inline-start: 16px;
	}

	li {
		margin-bottom: 10px;
	}
}
</style>