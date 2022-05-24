<template>
  <t-row :gutter="16" class="row-container">
    <t-col :xs="12" :xl="6">
      <t-card title="销售订单排名" class="dashboard-rank-card">
        <template #actions>
          <t-radio-group default-value="dateVal">
            <t-radio-button value="dateVal">本周</t-radio-button>
            <t-radio-button value="monthVal">近三个月</t-radio-button>
          </t-radio-group>
        </template>
        <t-table
          :data="SALE_TEND_LIST"
          :columns="SALE_COLUMNS"
          row-key="productName"
        >
          <template #index="{ rowIndex }">
            <span :class="getRankClass(rowIndex)">
              {{ rowIndex + 1 }}
            </span>
          </template>
          <template #operation="slotProps">
            <a class="t-button-link" @click="rehandleClickOp(slotProps)"
              >详情</a
            >
          </template>
        </t-table>
      </t-card>
    </t-col>
    <t-col :xs="12" :xl="6">
      <t-card title="销售订单排名" class="dashboard-rank-card">
        <template #actions>
          <t-radio-group default-value="dateVal">
            <t-radio-button value="dateVal">本周</t-radio-button>
            <t-radio-button value="monthVal">近三个月</t-radio-button>
          </t-radio-group>
        </template>
        <t-table
          :data="BUY_TEND_LIST"
          :columns="BUY_COLUMNS"
          row-key="productName"
        >
          <template #index="{ rowIndex }">
            <span :class="getRankClass(rowIndex)">
              {{ rowIndex + 1 }}
            </span>
          </template>
          <template #operation="slotProps">
            <a class="t-button-link" @click="rehandleClickOp(slotProps)"
              >详情</a
            >
          </template>
        </t-table>
      </t-card>
    </t-col>
  </t-row>
</template>

<script setup>
import {
  SALE_TEND_LIST,
  BUY_TEND_LIST,
  SALE_COLUMNS,
  BUY_COLUMNS
} from "../constants.js";

const rehandleClickOp = val => {
  console.log(val);
};
const getRankClass = index => {
  return ["dashboard-rank", { "dashboard-rank__top": index < 3 }];
};
</script>

<style lang="less" scoped>
.dashboard-rank-card {
  padding: 8px;

  :deep(.t-card__header) {
    padding-bottom: 24px;
  }

  :deep(.t-card__title) {
    font-size: 20px;
    font-weight: 500;
  }
}

.dashboard-rank__cell {
  display: inline-flex;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  background-color: @gray-color-5;
  align-items: center;
  justify-content: center;
  font-weight: 700;

  &--top {
    background: @brand-color;
  }
}
</style>
