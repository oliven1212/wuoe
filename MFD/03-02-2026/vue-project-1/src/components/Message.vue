<script setup>
    import { ref } from 'vue';

    const isPasswordVisible = ref(false);
    const password = ref('');
</script>
<template>
    <div>
        <button @click="isPasswordVisible = !isPasswordVisible;">Show password</button>
        <p>{{ password }}</p>
        <input 
           :type="isPasswordVisible ? 'text': 'password'" 
            v-model="password"
            :class="{ 
                error: password.length < 8,
                success: password.length >= 8 }"
        />
    </div>
</template>

<style scoped>
    input{
        outline: none;
    }
    .error{
        border: red 1px solid;
    }
    .success{
        border: lightgreen 1px solid;
    }
</style>