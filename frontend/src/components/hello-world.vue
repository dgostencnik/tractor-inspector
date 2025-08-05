<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{ name: string }>()
</script>

<template>
  <h1>Hello {{ props.name }} <Icon icon="tabler:sun" /></h1>
</template>
