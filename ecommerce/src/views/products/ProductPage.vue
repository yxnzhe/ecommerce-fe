<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-4 product-images">
                    <div class="center-image">
                        <img class="smaller-image" v-bind:src="product.image" v-bind:alt="product.name" />
                    </div>
                </figure>

                
            </div>
            
            <div class="column is-3">
                
                <h1 class="title">{{ product.name }}</h1>
                <h2 class="subtitle">Brand: {{ product.brand }}</h2>
                <p class="mb-4 has-text-justified">{{ product.description }}</p>
                <p><strong>Price: </strong>RM {{ product.price }}</p>

                <div class="field has-addons mt-4">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity" />
                    </div>

                    <div class="control">
                        <a class="button is-purple" @click="addToCart">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from '@/supabase'
import { toast } from 'bulma-toast'

export default {
    name: 'ProductPage',
    data() {
        return {
            quantity: 1,
            product: []
        }
    },
    mounted() {
        this.getProduct()
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading', true)

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', this.$route.params.id)
                .single()
    
            if(error) {
                console.log(error)
            }
            this.product = data
            this.$store.commit('setIsLoading', false)
            document.title = `${this.product.name} | ZedStore`
        },

        addToCart() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }

            const item = {
                product: this.product,
                quantity: this.quantity
            }

            this.$store.commit('addToCart', item)

            toast({
                message: `${this.product.name} added to cart`,
                type: 'is-purple',
                position: 'bottom-right',
                duration: 2000,
                dismissible: true,
            })
        }
    }
}
</script>