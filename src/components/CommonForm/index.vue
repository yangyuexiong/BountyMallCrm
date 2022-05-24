<template>
  <t-form
    v-bind="$attrs"
    id="business-common-form"
    ref="form"
    :data="data"
    :rules="rules"
    :label-width="labelWidth"
    @keyup.enter.native="search"
  >
    <t-form-item
      v-for="(field, idx) in fieldList"
      :key="idx"
      :label="field.label"
      :name="field.value"
      :label-width="field.labelWidth"
    >
      <template #label>
        <template v-if="field.scopedSlotsLabel">
          <slot :name="field.scopedSlotsLabel" />
        </template>
        <template v-else-if="field.label">{{ field.label }}</template>
      </template>
      <template v-if="$slots[field.scopedSlots]">
        <slot :name="field.scopedSlots" />
      </template>
      <template v-else>
        <span v-if="field.prefix" :class="field.prefixClass">{{
          field.prefix
        }}</span>
        <component
          v-model="data[field.value]"
          v-bind="getProps(field)"
          v-on="field.on"
          :field="field"
          :list-info="listInfo"
          :is="field.component"
        />
        <span v-if="field.suffix" :class="field.suffixClass">{{
          field.suffix
        }}</span>
      </template>
    </t-form-item>
    <template v-if="$slots.actions">
      <t-form-item>
        <slot name="actions" v-bind="{ ref: $refs }" />
      </t-form-item>
    </template>
    <template v-else>
      <t-form-item>
        <div class="flex form-action" :class="{ 'dialog-actions': dialog }">
          <span :class="{ 'row-reverse': actionAlign !== 'left' }">
            <t-button @click="search" type="primary">{{
              confirmText
            }}</t-button>
            <t-button @click="reset">{{ resetText }}</t-button>
          </span>
        </div>
      </t-form-item>
    </template>
    <slot></slot>
  </t-form>
</template>

<script>
import TRadio from "./components/Radio.vue";
import TSelect from "./components/Select.vue";
import TCheckbox from "./components/Checkbox.vue";
import RemoteSelect from "./components/RemoteSelect.vue";
export default {
  name: "common-form",
  components: {
    TRadio,
    TSelect,
    TCheckbox,
    RemoteSelect
  },
  props: {
    labelWidth: {
      type: String
    },
    // 表单数据
    data: {
      type: Object
    },
    // 相关字段
    fieldList: {
      type: Array
    },
    // 验证规则
    rules: {
      type: Object
    },
    // 相关的列表
    listInfo: {
      type: Object
    },
    // 确认的文集
    confirmText: {
      type: String,
      default: "查询"
    },
    // 重置的文字
    resetText: {
      type: String,
      default: "重置"
    },
    actionAlign: {
      type: String,
      default: "left"
    },
    dialog: {
      type: Boolean
    }
  },
  methods: {
    getProps({ component, label, extraProps }) {
      const props = extraProps || {};
      if (!props.placeholder) {
        props.placeholder =
          component === "el-input" ? `请输入${label}` : `请选择${label}`;
      }
      return props;
    },
    validate() {
      return this.$refs.form.validate();
    },
    async search() {
      await this.$refs.form.validate();
      this.$emit("search");
    },
    reset() {
      this.$refs.form.reset();
      this.$emit("reset");
    }
  }
};
</script>

<style lang="scss">
#business-common-form {
  .input-text-left input {
    text-align: left;
  }
}
.form-action {
  .el-button {
    margin: 0 5px;
  }
}
.dialog-actions {
  width: 100%;
  justify-content: flex-end;
}
</style>
