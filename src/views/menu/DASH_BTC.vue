<template>
  <div class="trade">
    <!-- 头部数据 -->
    <div class="headDatas" v-if="active">
      <div>
        <p class="bg-white ft-large" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{marketinfo.close}}</p>
        <p style="width: 120%">≈ ￥{{marketinfo.close | handleMoney}}</p>
      </div>
      <div>
        <p>{{$t('dash.change')}}</p>
        <p
          :class="['bg-change', {'f-color': marketinfo.changepercent>0?false : true}]"
        >{{marketinfo.changepercent | handleNumAll}}%</p>
      </div>
      <div>
        <p>{{$t('dash.vol')}}</p>
        <p class="bg-white" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{marketinfo.amount | handleDecimal(4)}} {{marketinfo.market}}</p>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">
      <router-view />
    </div>

    <!-- 底部导航栏 -->
    <div class="navBars" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <div>
        <router-link :class="show" to="/DASH_BTC/jy">{{tabs[0]}}</router-link>
      </div>
      <div>
        <router-link to="/DASH_BTC/kx">{{tabs[1]}}</router-link>
      </div>
      <div>
        <router-link to="/DASH_BTC/jj">{{tabs[2]}}</router-link>
      </div>
      <div>
        <router-link to="/DASH_BTC/cj">{{tabs[3]}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: this.$t("dash.tabs"),
      market_param: {
        type: "c2c",
        symbol: "usdt",
        order: "weigh",
        sort: "desc",
        market: "btc",
        think_var: "en"
      },
      precision: 2,
      ws: null,
      marketinfo: {},
      depth: {},
      HistoryTrade: [],
      // 简介
      datas: '<p>暂无数据！</p>',
      // 总数据
      origin: {}
    };
  },
  computed: {
    // 头部数据在简介中不显示
    active: function() {
      if (this.$route.path.slice(10, 12) == "jj") {
        return false;
      }
      return true;
    },
    show: function() {
      if (this.$route.path.slice(10, 12) == "jy") {
        return "router-link-exact-active";
      }
      return "";
    }
  },
  watch: {
    "$store.state.market": function() {
      this.market_param.market = this.$store.state.market;
      this.ws.close();
      this.init();
    }
  },
  created() {
    this.market_param.market = this.$store.state.market;
    this.market_param.symbol = this.$store.state.symbol;
    if (this.ws != null) {
      this.ws.close();
    }
    this.init();
  },
  destroyed() {
    this.ws.close();
  },
  methods: {
    init() {
      if ("WebSocket" in window) {
        this.ws = new WebSocket("WSS://hoidex.com:2345/market");
        var ws = this.ws
      }
      var params = {
        type: this.market_param.type,
        market_list: this.market_param,
        market_symbol: this.market_param.market + this.market_param.symbol,
        precision: this.precision
      };
      var that = this;
      ws.onopen = function() {
        if (that.ws.readyState == 1) {
          ws.send(JSON.stringify(params));
        }
      };
      ws.onmessage = function(e) {
        setTimeout(() => {
          if (that.ws.readyState == 1) {
            ws.send(JSON.stringify(params));
          }
        }, 1000);
        var res = JSON.parse(e.data);
        that.origin = res
        that.marketinfo = res.marketInfo;
        that.depth = res.depth;
        that.HistoryTrade = res.HistoryTrade;
        let lang = sessionStorage.getItem("locale");
        if (lang == "zh") {
          that.datas = res.marketInfo.zh_content;
        }
        if (lang == "jp") {
          that.datas = res.marketInfo.jp_content;
        }
        if (lang == "ko") {
          that.datas = res.marketInfo.ko_content;
        }
        if (lang == "en") {
          that.datas = res.marketInfo.en_content;
        }
      };
    }
  }
};
</script>

<style lang="less" scoped>
.trade {
  .headDatas {
    padding: 30px 0;
    display: flex;
    box-sizing: border-box;
    .bg-change {
      color: green;
    }
    div {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .bg-white {
        color: #fff;
        text-align: right;
      }
      .ft-large {
        font-size: 30px;
      }
    }
    div:nth-child(1) {
      margin-right: 180px;
      align-items: flex-start;
    }
    p {
      margin: 10px 0;
      color: rgb(130, 142, 161);
    }
  }
  .f-color {
    color: red !important;
  }
  .navBars {
    z-index: 2000;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    background: rgb(28, 39, 53);
    div {
      flex: 1;
      height: 80px;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: rgba(130, 142, 161, 1);
      }
      .router-link-exact-active {
        color: rgba(237, 244, 248, 1) !important;
        background-color: rgba(38, 48, 67, 1);
      }
    }
  }
}
</style>