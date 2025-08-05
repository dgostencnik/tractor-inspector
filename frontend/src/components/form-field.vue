<script setup lang="ts">
import { Field } from "vee-validate";

const props = defineProps<{
  name: string;
  label: string;
  type: string;
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="props.type === 'textarea' ? 'textarea' : 'input'"
      :name="props.name"
      :type="props.type"
      class="w-full"
      :class="{ 'input-error': error && (type === 'text' || type === 'number'),
                'textarea-error': error && type === 'textarea',
                'input': type !== 'textarea',
                'textarea': type === 'textarea',
      }"
      :disabled="disabled"
    />
    <p v-if="error" class="label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>
