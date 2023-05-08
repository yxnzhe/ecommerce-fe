<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">{{ category.length > 0 ? category[0].category.name : '' }}</h2>
            </div>

            <ProductBox v-for="product in category" v-bind:key="product.id" v-bind:product="product" />

        </div>
    </div>
</template>

<script>
import { supabase } from '@/supabase'
import { toast } from 'bulma-toast'
import ProductBox from '@/components/ProductBox.vue'

export default {
    name: 'CategoryPage',
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    components: {
        ProductBox
    },
    mounted() {
        this.getCategory()
    },
    watch: {
        '$route.params.id': function() {
            this.getCategory()
        }
    },
    methods: {
        async getCategory() {
            this.$store.commit('setIsLoading', true)

            const { data, error } = await supabase
                .from('products')
                .select(`*, category("name")`)
                .eq('category', this.$route.params.id)
                
                if (error) {
                    toast ({
                        message: 'Error getting category',
                        type: 'is-danger',
                        position: 'bottom-right',
                        duration: 2000,
                        dismissible: true,
                    })
                }

                this.category = data
                this.$store.commit('setIsLoading', false)
                document.title = `${this.category[0].category.name} | ZedStore`
        }
    }
}
</script>