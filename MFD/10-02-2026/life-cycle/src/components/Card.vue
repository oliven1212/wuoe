<script setup>
    defineProps({
        title: String,
    });
</script>
<template>
    <div class="card">
        <header>
            <h2>
                {{ title }}
            </h2>
        </header>
        <main>
            <slot>
                <p>
                    Empty card
                </p>
            </slot>
        </main>
    </div>
</template>
