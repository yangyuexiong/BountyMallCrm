<template>
  <t-row :gutter="[16, 16]">
    <t-col v-for="(item, index) in PANE_LIST" :key="item.title" :xs="6" :xl="3">
      <t-card
        :title="item.title"
        :style="{ height: '168px' }"
        :class="{
          'dashboard-item': true,
          'dashboard-item--main-color': index == 0
        }"
      >
        <div class="dashboard-item-top">
          <span :style="{ fontSize: `${resizeTime * 36}px` }">{{
            item.number
          }}</span>
        </div>
        <div class="dashboard-item-left">
          <div
            v-if="index === 0"
            id="moneyContainer"
            class="dashboard-chart-container"
            :style="{
              width: `${resizeTime * 120}px`,
              height: `${resizeTime * 66}px`
            }"
          ></div>
          <div
            v-else-if="index === 1"
            id="refundContainer"
            class="dashboard-chart-container"
            :style="{
              width: `${resizeTime * 120}px`,
              height: `${resizeTime * 42}px`
            }"
          ></div>
          <span v-else-if="index === 2" :style="{ marginTop: `-24px` }">
            <usergroup-icon />
          </span>
          <span v-else :style="{ marginTop: '-24px' }">
            <file-icon />
          </span>
        </div>
        <template #footer>
          <div class="dashboard-item-bottom">
            <t-icon name="chevron-right" />
          </div>
        </template>
      </t-card>
    </t-col>
  </t-row>
</template>

<script>
export default {
  name: "DashboardBase"
};
</script>

<script setup>
import { onMounted, ref, onUnmounted, nextTick } from "vue";

import * as echarts from "echarts/core";
import { LineChart, BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

// 导入样式
import { constructInitDashboardDataset } from "../index";

echarts.use([LineChart, BarChart, CanvasRenderer]);

const resizeTime = ref(1);

// moneyCharts
let moneyContainer;
let moneyChart;
const renderMoneyChart = () => {
  if (!moneyContainer) {
    moneyContainer = document.getElementById("moneyContainer");
  }
  if (moneyContainer) {
    moneyChart = echarts.init(moneyContainer);
    moneyChart.setOption(constructInitDashboardDataset("line"));
  }
};

// refundCharts
let refundContainer;
let refundChart;
const renderRefundChart = () => {
  if (!refundContainer) {
    refundContainer = document.getElementById("refundContainer");
  }
  if (refundChart) {
    refundChart = echarts.init(refundContainer);
    refundChart.setOption(constructInitDashboardDataset("bar"));
  }
};

const renderCharts = () => {
  renderMoneyChart();
  renderRefundChart();
};

// chartSize update
const updateContainer = () => {
  if (
    document.documentElement.clientWidth >= 1400 &&
    document.documentElement.clientWidth < 1920
  ) {
    resizeTime.value = Number(
      (document.documentElement.clientWidth / 2080).toFixed(2)
    );
  } else if (document.documentElement.clientWidth < 1080) {
    resizeTime.value = Number(
      (document.documentElement.clientWidth / 1080).toFixed(2)
    );
  } else {
    resizeTime.value = 1;
  }
  moneyChart &&
    moneyChart.resize({
      width: resizeTime.value * 120,
      height: resizeTime.value * 66
    });
  refundChart &&
    refundChart.resize({
      width: resizeTime.value * 120,
      height: resizeTime.value * 42
    });
};

onMounted(() => {
  nextTick(() => {
    renderCharts();
    updateContainer();
  });
  window.addEventListener("resize", updateContainer, false);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateContainer);
});
</script>

<style lang="less" scoped>
.dashboard-item {
  padding: 8px;

  :deep(.t-card__footer) {
    padding-top: 0;
  }

  :deep(.t-card__title) {
    font-size: 14px;
    font-weight: 500;
  }

  :deep(.t-card__body) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    position: relative;
  }

  &:hover {
    cursor: pointer;
  }

  &-top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    > span {
      display: inline-block;
      color: @text-color-primary;
      font-size: 36px;
      line-height: 44px;
    }
  }

  &-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > .t-icon {
      cursor: pointer;
    }
  }

  &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 22px;
    color: @text-color-placeholder;
  }

  &-trend {
    margin-left: 8px;
  }

  &-left {
    position: absolute;
    top: 0;
    right: 32px;

    > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: @brand-color-1;
      border-radius: 50%;

      .t-icon {
        font-size: 24px;
        color: @brand-color;
      }
    }
  }

  // 针对第一个卡片需要反色处理
  &--main-color {
    background: @brand-color;
    color: @text-color-primary;

    :deep(.t-card__title),
    .dashboard-item-top span,
    .dashboard-item-bottom {
      color: @text-color-anti;
    }

    .dashboard-item-block {
      color: @text-color-anti;
      opacity: 0.6;
    }

    .dashboard-item-bottom {
      color: @text-color-anti;
    }
  }
}
</style>
