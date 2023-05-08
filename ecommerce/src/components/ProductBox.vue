<template>
    <div class="column is-3">
        <div class="box">
            <figure class="image mb-4 product-images">
                <img v-bind:src="product.image" v-bind:alt="product.name" />
            </figure>

            <h3 class="is-size-4 mb-2">{{ product.name }}</h3>
            <p class="is-size-6 has-text-grey">RM {{ product.price }}</p>
            
            <router-link v-bind:to="'/products/' + product.id" class="button is-purple mt-4">View Details</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductBox",
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>