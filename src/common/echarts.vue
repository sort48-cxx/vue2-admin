<template>
  <div class="line1">
    <div id="line1" class style="width: 100%;height:450px;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/tooltip";
import { setInterval } from "timers";
export default {
  mounted() {
    this.drawLine();
  },
  props: ["sevenDate", "sevenDay"],
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("line1"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "走势图"
        },
        //color:['#5793f3', '#675bba', '#d14a61'],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.sevenDay
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新注册用户",
            type: "line",
            stack: "总量",
            data: this.sevenDate[0]
          },
          {
            name: "新增订单",
            type: "line",
            stack: "总量",
            data: this.sevenDate[1]
          },
          {
            name: "新增管理员",
            type: "line",
            stack: "总量",
            data: this.sevenDate[2]
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.line1 {
  display: flex;
  justify-content: center;
}
</style>