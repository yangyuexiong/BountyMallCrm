<template>
  <t-select
    v-bind="$attrs"
    :value="value"
    filterable
    remote
    clearable
    :multiple="multiple"
    :value-key="valueKey"
    :remote-method="getList"
  >
    <template v-if="multiple">
      <t-option
        v-for="item in options"
        :value="item"
        :label="item[labelKey]"
        :key="item.value"
      />
    </template>
    <template v-else>
      <t-option
        v-for="item in options"
        :value="item[valueKey]"
        :label="item[labelKey]"
        :key="item.value"
      />
    </template>
  </t-select>
</template>
<script>
import { map } from "lodash";
import { post } from "@/utils/request";
export default {
  props: {
    value: null,
    url: String,
    multiple: Boolean,
    valueKey: {
      type: String,
      default: "value"
    },
    labelKey: {
      type: String,
      default: "label"
    },
    dataKey: {
      type: String,
      default: "id"
    }
  },
  data() {
    return {
      options: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(value = "") {
      const { url, labelKey, valueKey } = this;
      const { records } = await post(url, {
        page: 1,
        size: 100,
        pageNum: 1,
        pageSize: 100,
        project_id: this.$store.getters.project_id,
        [labelKey]: typeof value === "string" ? value : ""
      });
      this.options = map(records, item => ({
        ...item,
        [labelKey]: item[this.labelKey],
        [valueKey]: item[this.dataKey]
      }));
    }
  }
};
</script>
