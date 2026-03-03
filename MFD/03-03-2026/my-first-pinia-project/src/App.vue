<script setup>

</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink :to="{name: 'create'}">Create Todo</RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'list'}">Todo List</RouterLink>
      </li>
    </ul>
  </nav>
  <br><br>
  <hr>
  <br><br>
  <RouterView />
  
</template>
