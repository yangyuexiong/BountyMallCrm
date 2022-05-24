<template>
  <t-checkbox-group v-bind="$attrs" :value="value">
    <t-checkbox v-for="item in options" :label="item.value" :key="item.value">
      {{ item.label }}
    </t-checkbox>
  </t-checkbox-group>
</template>

<script>
export default {
  props: ["field", "value", "listInfo"],
  computed: {
    options({ listInfo, field }) {
      return listInfo && listInfo[field?.list];
    }
  }
};
</script>
