<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Section Title',
  },
})
</script>

<template>
  <section>
    <h4>{{ props.title }}</h4>
    <slot />
  </section>
</template>
