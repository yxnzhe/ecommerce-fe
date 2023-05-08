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
			
			<ProductBox v-for="product in latestProducts" v-bind:key="product.id" v-bind:product="product" />
		</div>
	</div>
</template>

<script>
import { supabase } from '@/supabase'
import ProductBox from '@/components/ProductBox.vue'

export default {
	name: 'HomePage',
	data() {
		return {
			latestProducts: []
		}
	},
	components: {
		ProductBox
	},
	mounted() {
		document.title = "Home | ZedStore"
		this.getLatestProducts()
	},
	methods: {
		async getLatestProducts() {
			this.$store.commit('setIsLoading', true)
			const { data, error } = await supabase
				.from('products')
				.select('*')
				.order('id', { ascending: false })
				.limit(4)

				if(error) {
					console.log(error)
				}
				console.log(data)

			this.latestProducts = data
			this.$store.commit('setIsLoading', false)
		}
	}
}
</script>