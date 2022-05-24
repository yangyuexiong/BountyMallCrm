<template>
  <t-card>
    <t-row>
      <t-col :xs="12" :xl="9">
        <t-card
          :bordered="false"
          title="出入库概览"
          subtitle="(件)"
          :class="{ 'dashboard-overview-card': true, 'overview-panel': true }"
        >
          <template #actions>
            <t-date-picker
              class="card-date-picker-container"
              theme="primary"
              mode="date"
              range
              :default-value="LAST_7_DAYS"
              @change="onStokeDataChange"
            />
          </template>
          <div
            id="stokeContainer"
            ref="stokeContainer"
            style="width: 100%; height: 351px"
            class="dashboard-chart-container"
          ></div>
        </t-card>
      </t-col>
      <t-col :xs="12" :xl="3">
        <t-card
          :bordered="false"
          :class="{ 'dashboard-overview-card': true, 'export-panel': true }"
        >
          <template #actions>
            <t-button>导出数据</t-button>
          </template>
          <t-row>
            <t-col :xs="6" :xl="12">
              <t-card
                :bordered="false"
                subtitle="本月出库总计（件）"
                class="inner-card"
              >
                <div class="inner-card__content">
                  <div class="inner-card__content-title">1726</div>
                </div>
              </t-card>
            </t-col>
            <t-col :xs="6" :xl="12">
              <t-card
                :bordered="false"
                subtitle="本月入库总计（件）"
                class="inner-card"
              >
                <div class="inner-card__content">
                  <div class="inner-card__content-title">226</div>
                  <div class="inner-card__content-footer">自从上周以来</div>
                </div>
              </t-card>
            </t-col>
          </t-row>
        </t-card>
      </t-col>
    </t-row>
  </t-card>
</template>

<script>
export default {
  name: "DashboardBase"
};
</script>

<script setup>
import { onMounted, ref, onUnmounted, nextTick } from "vue";

import * as echarts from "echarts/core";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { LAST_7_DAYS } from "@/utils/date";
import { LIGHT_CHART_COLORS } from "@/config/global";

// 导入样式
import { constructInitDataset } from "../index.js";

echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
]);

const resizeTime = ref(1);

// stokeCharts
let stokeContainer;
let stokeChart;
const renderStokeChart = () => {
  if (!stokeContainer) {
    stokeContainer = document.getElementById("stokeContainer");
  }
  stokeChart = echarts.init(stokeContainer);
  stokeChart.setOption(
    constructInitDataset({ dateTime: LAST_7_DAYS, ...LIGHT_CHART_COLORS })
  );
};

const renderCharts = () => {
  renderStokeChart();
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

  stokeChart.resize({
    width: stokeContainer.clientWidth,
    height: stokeContainer.clientHeight
  });
};

onMounted(() => {
  renderCharts();
  nextTick(() => {
    updateContainer();
  });
  window.addEventListener("resize", updateContainer, false);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateContainer);
});

const onStokeDataChange = checkedValues => {
  stokeChart.setOption(
    constructInitDataset({ dateTime: checkedValues, ...LIGHT_CHART_COLORS })
  );
};
</script>

<style lang="less" scoped>
.dashboard-overview-card {
  :deep(.t-card__header) {
    padding-bottom: 24px;
  }

  :deep(.t-card__title) {
    font-size: 20px;
    font-weight: 500;
  }

  &.overview-panel {
    border-right: none;
  }

  &.export-panel {
    border-left: none;
  }
}

.inner-card {
  padding: 24px 0;

  :deep(.t-card__header) {
    padding-bottom: 0;
  }

  &__content {
    &-title {
      font-size: 36px;
      line-height: 44px;
    }

    &-footer {
      display: flex;
      align-items: center;
      line-height: 22px;
      color: @text-color-placeholder;

      .trend-tag {
        margin-left: 4px;
      }
    }
  }
}
</style>
