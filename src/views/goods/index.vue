<template>
  <page>
    <common-form
      layout="inline"
      :data="form"
      label-width="auto"
      :field-list="fieldList"
    />
    <t-table bordered :columns="columns" :data="tableData">
      <template #action>
        <t-button theme="default" size="small">删除</t-button>
        <t-button theme="primary" size="small">删除</t-button>
        <t-button theme="success" size="small">删除</t-button>
        <t-button theme="warning" size="small">删除</t-button>
        <t-button theme="danger" size="small">删除</t-button>
      </template>
    </t-table>
    <pagination
      v-model:list="tableData"
      v-model:do-request="getData"
      url="/api/project_page"
    />
  </page>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      form: ref({
        sex: ""
      }),
      fieldList: [
        {
          label: "性别",
          value: "sex",
          component: "t-input"
        }
      ],
      getData: false,
      tableData: ref([]),
      columns: ref([
        {
          colKey: "id",
          title: "ID",
          width: 100
        },
        {
          colKey: "project_name",
          title: "项目名称"
        },
        {
          title: "操作",
          width: 300,
          cell: "action",
          align: "center",
          fixed: "right"
        }
      ])
    };
  }
};
</script>
