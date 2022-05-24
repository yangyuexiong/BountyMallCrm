<template>
  <t-select v-bind="$attrs" :value="value" clearable>
    <t-option v-for="item in options" v-bind="item" :key="item.value" />
  </t-select>
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
