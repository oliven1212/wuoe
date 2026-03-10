<script setup>
    import { useProductStore } from '@/stores/ProductStore';
    import { ref } from 'vue';

    const productStore = useProductStore();
    //Imagine some fancy code to get the most expensive product, though it should be in the store
    const maxPrice = ref(27000);
    //same as above but for min price
    const minPrice = ref(0);
</script>
<template>
    <div>
        <h2>Products</h2>

        <div 
        v-for="(product, index) in productStore.productsWithMaxPrice"
        :key="index"
        >
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }}</p>
            
        </div>
        <input v-model="productStore.maxPrice" type="range" :min="minPrice" :max="maxPrice">
    </div>
</template>