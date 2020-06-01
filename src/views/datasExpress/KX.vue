<template>
  <div class="kx">
    <!-- 价格图表 -->
    <div class="changeChart flex">
      <div>{{$t('dash.priceChart')}}</div>
      <div>
        <i
          v-for="(item, index) of pic_choose"
          :key="index"
          :class="['iconfont', item, current_pic==index?'isChoosed' : '']"
          @click="choosePic(index)"
        ></i>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content" v-show="show">
      <!-- 根据时间切换 -->
      <ul class="flex">
        <li
          v-for="(item, index) of time_choose"
          :key="item.id"
          :class="[active==index?'active':'']"
          @click="chooseTime(index)"
        >{{item.time}}</li>
      </ul>
      <!-- more -->
      <div class="more" v-if="more_show">
        <span v-for="item of more" :key="item.id" @click="chooseMore(item.time)">{{item.time}}</span>
      </div>
      <!-- 图表区 -->
      <div class="chart">
        <div id="tv_chart_container"></div>
      </div>
    </div>
    <div v-show="!show">
      <div id="echart" ref="myechart" style="height: 400px;width:10rem"></div>
    </div>
  </div>
</template>

<script>
import TVjsApi from "./tradingview/index";
let jsApi = null;
export default {
  data() {
    return {
      time_choose: [
        { time: "Line", id: 0 },
        { time: "1min", id: 1 },
        { time: "5min", id: 2 },
        { time: "15min", id: 3 },
        { time: "30min", id: 4 },
        { time: "60min", id: 5 },
        { time: "more", id: 6 }
      ],
      active: 1,
      current_pic: 0,
      pic_choose: ["icontubiaozoushitu", "icontubiaozhuxingtu"],
      // 图表内容的切换
      show: true,
      jsApi: null,
      more: [
        { time: "240min", id: 0 },
        { time: "1D", id: 1 },
        { time: "5D", id: 2 },
        { time: "1W", id: 3 },
        { time: "1M", id: 4 }
      ],
      more_show: false
    };
  },
  mounted() {
    jsApi = new TVjsApi("GXC-USDT");
    jsApi.init(); //图表初始化
    this.jsApi = jsApi;
    this.initEcharts();

    // 点击其他位置关闭下拉时间菜单
    let that = this;
    document.addEventListener("click", function(e) {
      if (e.target.className != "active") {
        that.more_show = false;
      }
    });
  },
  methods: {
    // 选择时间
    chooseTime(index) {
      this.active = index;

      if (index == 0) {
        this.jsApi.widgets.chart().setChartType(3);
        this.jsApi.widgets.chart().setResolution("1");
        this.jsApi.studies.forEach(item => {
          item.then(id =>
            this.jsApi.widgets
              .activeChart()
              .getStudyById(id)
              .setVisible(false)
          );
        });
      } else {
        this.jsApi.widgets.chart().setChartType(1);
        this.jsApi.studies.forEach(item => {
          item.then(id =>
            this.jsApi.widgets
              .activeChart()
              .getStudyById(id)
              .setVisible(true)
          );
        });
        switch (index) {
          case 1:
            this.jsApi.widgets.chart().setResolution("1");
            break;
          case 2:
            this.jsApi.widgets.chart().setResolution("5");
            break;
          case 3:
            this.jsApi.widgets.chart().setResolution("15");
            break;
          case 4:
            this.jsApi.widgets.chart().setResolution("30");
            break;
          case 5:
            this.jsApi.widgets.chart().setResolution("60");
            break;
          case 6:
            this.more_show = !this.more_show;
            break;
        }
      }
    },
    // 选择更多时间
    chooseMore(time) {
      switch (time) {
        case "240min":
          this.time_choose[6].time = time;
          this.jsApi.widgets.chart().setResolution("240");
          break;
        case "1D":
          this.time_choose[6].time = time;
          this.jsApi.widgets.chart().setResolution("1D");
          break;
        case "5D":
          this.time_choose[6].time = time;
          this.jsApi.widgets.chart().setResolution("5D");
          break;
        case "1W":
          this.time_choose[6].time = time;
          this.jsApi.widgets.chart().setResolution("1W");
          break;
        case "1M":
          this.time_choose[6].time = time;
          this.jsApi.widgets.chart().setResolution("1M");
          break;
      }
      this.more_show = false;
    },
    // 选择图表
    choosePic(index) {
      this.current_pic = index;
      if (index == 0) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    // 初始化echarts
    initEcharts() {
      var echarts = require("echarts");
      var echartCloth = this.$refs.myechart;
      var myChart = echarts.init(echartCloth);
      // 获取深度数据
      let depth = this.$store.state.marketDepth;
      let buyDepth = depth.filter(item => item.direction == "buy");
      let sellDepth = depth.filter(item => item.direction == "sell");
      var option = {
        tooltip: {},
        xAxis: {
          splitLine: {
            show: false
          },
          data: []
        },
        grid: {
        },
        textStyle: {
          color: "#aaa"
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: "line",
            symbol: "none",

            lineStyle: {
              color: "#41B37D"
            },
            areaStyle: {
              color: "rgba(18, 179, 125, 0.5)"
            },
            data: []
          },
          {
            type: "line",
            symbol: "none",
            lineStyle: {
              color: "#D74E5A"
            },
            areaStyle: {
              color: "rgba(196, 50, 77, 0.5)"
            },
            data: []
          }
        ]
      };
      buyDepth.forEach((item, index) => {
        option.series[0].data.push([index, item.price]);
      });
      sellDepth.forEach((item, index) => {
        option.series[1].data.push([index + buyDepth.length, item.price]);
      });
      myChart.setOption(option);
    }
  },
  destroyed() {
    jsApi.destoryinstance().then(bool => {
      if (bool) {
        jsApi = null;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.kx {
  width: 100%;
  box-sizing: border-box;
  #tv_chart_container {
    height: 100%;
  }
  .flex {
    display: flex;
  }
  .changeChart {
    z-index: 1000;
    position: relative;
    padding: 25px 30px;
    box-sizing: border-box;
    background: rgb(38, 48, 67);
    div {
      font-size: 30px;
      &:nth-child(1) {
        flex: 4;
      }
      &:nth-child(2) {
        flex: 0.7;
        i {
          margin: 0 10px;
          color: rgb(105, 120, 145);
        }
      }
    }
    .isChoosed {
      color: rgb(36, 160, 245) !important;
    }
  }
  ul {
    position: relative;
    background: rgb(29, 38, 53);
    outline: none;
    z-index: 1000;
    padding: 20px 20px;
    box-sizing: border-box;
    li {
      color: rgb(76, 87, 105);
      padding: 10px 15px;
    }
    .active {
      color: #fff;
      border-bottom: 3px solid rgb(36, 160, 245);
    }
  }
  .chart {
    height: 100%;
  }
  
  .content {
    width: 100%;
    height: 11rem;
    position: relative;
    .more {
      width: 100%;
      background: rgb(38, 48, 67);
      position: absolute;
      display: flex;
      span {
        display: inline-flex;
        justify-content: center;
        padding: 20px;
        flex: 1;
      }
    }
  }
}
</style>