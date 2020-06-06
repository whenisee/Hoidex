<template>
  <div class="kx">
    <!-- 价格图表 -->
    <div class="changeChart flex" :style="[{'background':$store.state.mode?'#f7efef':'#2e2e2e'}]">
      <div :style="{'color':!$store.state.mode?'#fff':'#1d2635'}">{{$t('dash.priceChart')}}</div>
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
      <ul class="flex" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
        <li
          v-for="(item, index) of time_choose"
          :key="item.id"
          :class="[active==index?'active':'']"
          @click="chooseTime(index)"
        >{{item.time}}</li>
      </ul>
      <!-- more -->
      <div class="more" v-if="more_show" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
        <span v-for="item of more" :key="item.id" @click="chooseMore(item.time)" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{item.time}}</span>
      </div>
      <!-- 图表区 -->
      <div class="chart">
        <div id="tv_chart_container"></div>
      </div>
    </div>
    <div v-show="!show">
      <div id="echart" ref="myechart" style="height: 430px;width:10rem" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"></div>
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
        { time: "4h", id: 0 },
        { time: "1D", id: 1 },
        { time: "1W", id: 2 },
        { time: "1M", id: 3 }
      ],
      more_show: false,
      datas: [],
      market: "",
      symbol: ""
    };
  },
  mounted() {
    this.initEcharts();
    this.initKline()
    // 点击其他位置关闭下拉时间菜单
    let that = this;
    document.addEventListener("click", function(e) {
      if (e.target.className != "active") {
        that.more_show = false;
      }
    });
  },
  methods: {
    // 初始K线
    initKline() {
      this.market = this.$store.state.market.toLowerCase();
      this.symbol = this.$store.state.symbol;
      let str = this.market + this.symbol
      jsApi = new TVjsApi(str);
      if(this.$store.state.mode == true) {
        jsApi.changeSkin('white')
      } else {
        jsApi.changeSkin('black')
      }
      jsApi.init(); //图表初始化
      this.jsApi = jsApi;
    },
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
        case "1D":
          this.time_choose[6].time = time;
          this.jsApi.widgets.chart().setResolution("1D");
          break;
        case "1W":
          this.time_choose[6].time = time;
          this.jsApi.widgets.chart().setResolution("1W");
          break;
        case "4h":
          this.time_choose[6].time = time;
          this.jsApi.widgets.chart().setResolution("240");
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
      let buyDepth = this.$parent.depth.buy;
      let sellDepth = this.$parent.depth.sell;
      // let history = this.$parent.HistoryTrade
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            snap: true
          }
        },
        xAxis: {
          splitLine: {
            show: false,
            interval: 0
          },
          type: "value",
          scale: true,
          splitNumber: 7,
          axisLabel: {
            interval: 0
          },
          data: []
        },
        grid: {
          // left: "12%",
          show: true,
          containLabel: true,
          borderColor: "rgb(144,144,125)"
        },
        textStyle: {
          color: "#aaa"
        },
        yAxis: {
          splitLine: {
            show: false
          },
          position: "right",
          // boundaryGap: ["20%", "20%"],
          min: 0
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
      option.series[0].data.push([32.11, 2550.52]);
      option.series[0].data.push([67.11, 2350.12]);
      option.series[0].data.push([88.11, 2150]);
      option.series[0].data.push([101.11, 2050]);
      option.series[0].data.push([107.11, 2010.01]);
      option.series[0].data.push([110.11, 1990.54]);
      option.series[0].data.push([132.97, 1880]);
      option.series[0].data.push([152.97, 1690]);
      option.series[0].data.push([195.97, 1690.45]);
      option.series[0].data.push([211.97, 1630]);
      option.series[0].data.push([281.85, 1500]);
      option.series[0].data.push([341.97, 1400]);
      option.series[0].data.push([367.11, 1257.98]);
      option.series[0].data.push([377.52, 1211.3]);
      option.series[0].data.push([380, 1200]);
      option.series[0].data.push([382.54, 1160]);
      option.series[0].data.push([390, 1100]);
      option.series[0].data.push([400, 1000]);
      option.series[0].data.push([410.55, 974]);
      option.series[0].data.push([416, 651]);
      option.series[0].data.push([420.51, 323]);
      option.series[0].data.push([423, 99]);
      option.series[0].data.push([444, 12]);
      option.series[1].data.push([449, 8]);
      option.series[1].data.push([452, 22]);
      option.series[1].data.push([475.12, 222]);
      option.series[1].data.push([531.51, 222]);
      option.series[1].data.push([543.01, 651]);
      option.series[1].data.push([590, 1010]);
      option.series[1].data.push([610.55, 1510]);
      option.series[1].data.push([770, 1810]);
      option.series[1].data.push([781.55, 1912.2]);
      option.series[1].data.push([797.11, 2011.25]);
      option.series[1].data.push([811.25, 2314.2]);
      option.series[1].data.push([987.12, 2541.9]);
      option.series[1].data.push([1000, 2845.2]);
      option.series[1].data.push([1100, 2845.2]);
      option.series[1].data.push([1400, 2845.2]);
      // buyDepth.forEach((item, index) => {
      //   option.series[0].data.push([item.price, item.account]);
      // });
      // sellDepth.forEach((item, index) => {
      //   option.series[1].data.push([item.price, item.account]);
      // });
      myChart.setOption(option);
    }
  },
  destroyed() {
    jsApi.destoryinstance().then(bool => {
      if (bool) {
        jsApi = null;
      }
    });
  },
  watch: {
    "$parent.depth": function() {
      this.initEcharts();
    },
    "$store.state.market": function() {
      this.market = this.$store.state.market.toLowerCase();
      this.initKline()
    },
    "$store.state.symbol": function() {
      this.symbol = this.$store.state.symbol;
      this.initKline()
    },
    "$store.state.mode": function() {
      this.initKline()
    }
  }
};
</script>

<style lang="less" scoped>
.kx {
  width: 100%;
  box-sizing: border-box;
  background: rgb(29, 38, 53);
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
      border-bottom: 3px solid rgb(36, 160, 245);
    }
  }
  .chart {
    height: 95%;
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