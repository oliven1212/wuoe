<script setup>
</script>

<template>
<div>
    <RouterLink :to="{ name: 'product-create' }">Opret nyt produkt</RouterLink>
    Product View - Sparkle
    <hr>
    <RouterView/>
</div>
</template>
