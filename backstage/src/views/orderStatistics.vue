<template>
  <div>
    <container>
      <template v-slot:headSection>
        <div class="headSection">
          统计营业额
        </div>
      </template>
      <template v-slot:contentBox>
        <div v-if="flag">
          <v-chart class="chart" :option="option" ref="chart" />
        </div>
        <div v-if="!flag">
          <div class="item-skeleton">
            <content-loader
              primaryColor="#f3f3f3"
              secondaryColor="#cccccc"
              width="881"
              height="400"
            >
              <rect x="130" y="40" rx="3" ry="3" width="500" height="200" />
            </content-loader>
          </div>
        </div>
      </template>
    </container>
  </div>
</template>

<script>
import container from '../components/container/container'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import storage from '../storage/storage'
import { ContentLoader} from 'vue-content-loader'

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);
export default {
  components: {
    container,
    VChart,
    ContentLoader
  },
  data() {
    return {
      token: '',
      result: {},
      flag: false,
      option: {
        title: {
          text: "最近十日营业额",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
          {
            data: [120, {
                value: 200,
                itemStyle: {
                    color: '#a90000'
                }
            }, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
    }
  },
  methods: {
  },
  async created() {
    this.token = storage.getItem('token')
    let res = await this.axios.get('/order/findRecent',{
      headers: {
        token: this.token
      }
    });
    this.result = res.data.data
    this.flag = true
    this.option.xAxis.data = this.result.timeTenRecent.reverse();
    this.option.series[0].data = this.result.profitTenRecent.reverse()
  },
  mounted() {
    window.onresize = () => {
      this.$refs.chart.resize()
    }
  }
}
</script>

<style>
.headSection {
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  border-bottom: 1px solid #e9e9e9;
}

.chart {
  height: 400px;
  width: 100%;
  min-width: 780px;
}

</style>
