<template>
	<div class="home">
		<section class="hero is-medium is-dark mb-6">
			<div class="hero-body has-text-centered">
				<p class="title mb-6">Welcome to ZedStore</p>
				<p class="subtitle">Place your order with my brand new shopping tools.</p>
			</div>
		</section>

		<div class="columns is-multiline">
			<div class="column is-12">
				<h2 class="is-size-2 has-text-centered">Latest products</h2>
			</div>

			<div class="column is-3" v-for="product in latestProducts" v-bind:key="product.id">
				<div class="box">
					<figure class="image mb-4">
						<img v-bind:src="product.image" v-bind:alt="product.name" />
					</figure>

					<h3 class="is-size-4">{{ product.name }}</h3>
					<p class="is-size-6 has-text-grey">{{ product.price }}</p>

					View Details
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomePage',
	data() {
		return {
			latestProducts: []
		}
	},
	mounted() {
		document.title = "Home | ZedStore"
	},
	computed: {
		user() {
			return this.$store.state.currentUser;
		}
	}
}
</script>