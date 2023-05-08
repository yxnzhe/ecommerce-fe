<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Search</h1>
                <h2 class="subtitle">Searching for... {{ query }}</h2>
            </div>
        </div>

        <ProductBox
            v-for="product in products"
            v-bind:key="product.id"
            v-bind:product="product"
        />
    </div>
</template>

<script>
import { supabase } from '@/supabase'
import ProductBox from '@/components/ProductBox.vue'
import { toast } from 'bulma-toast'

export default {
    name: 'SearchProduct',
    data() {
        return {
            products: [],
            query: '',
        }
    },
    components: {
        ProductBox
    },
    mounted() {
        document.title = `Search | ZedStore`

        let url = window.location.search.substring(1)
        let params = new URLSearchParams(url)

        if(params.get('query')) {
            this.query = params.get('query')
            this.performSearch()
        }
    },
    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true)

            const { data, error } = await supabase
                .from('products')
                .select(`*`)
                .ilike('name', `%${this.query}%`)
                .order('id', { ascending: false })

            if (error) {
                toast ({
                    message: 'Error getting products',
                    type: 'is-danger',
                    position: 'bottom-right',
                    duration: 2000,
                    dismissible: true,
                })
            }
            this.products = data
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>