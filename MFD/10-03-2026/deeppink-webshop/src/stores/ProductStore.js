import { defineStore } from "pinia";
import { computed, ref } from "vue";
import productsJson from '@/products.json';

export const useProductStore = defineStore('product',() => {
    const products = ref([]);
    const maxPrice = ref(100);

    const productsWithMaxPrice = computed(() => {
        return products.value.filter((product) => {
            return product.price <= maxPrice.value;
        }); 
    });

    const fetchProducts = async () => {
        products.value = productsJson;
    };
    (async () => {
        await fetchProducts();
    })();

    return { products, productsWithMaxPrice, maxPrice };
});