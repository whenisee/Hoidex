<template>
  <div class="jy" @click="closeMenu">
    <!-- （买入/卖出） -->
    <div class="tabs">
      <div :class="active==0?'bottom_line buy' : 'buy'" @click="handleBuy()">{{$t('dash.buy')}}</div>
      <div :class="active==1?'bottom_line sell' : 'sell'" @click="handleSell()">{{$t('dash.sell')}}</div>
    </div>

    <!-- 分类 -->
    <div class="attribute">
      <div>
        <span id="type" @click="openMenu">{{current_type}}</span>
        <i id="type_icon" class="iconfont icon-xialasanjiaoxingx"></i>
      </div>
      <div class="menu" v-if="show">
        <p
          @click="chooseType"
          v-for="(item, index) of transType"
          :class="{choose: current_choose == index? true : false}"
          :key="index"
          :id="index"
        >{{item}}</p>
      </div>
      <div class="flex">
        <div class="padding-lr">{{$t('dash.price')}}</div>
        <div class="flex-end">{{$t('dash.amount')}}</div>
      </div>
    </div>

    <!-- 数据 -->
    <div class="datas">
      <div class="datas_left">
        <div class="flex border flex-between" v-if="current_choose==0">
          <div>
            <!-- 价格 -->
            <input v-model="amount_first" type="number" min="0" />
          </div>
          <div class="center">{{$store.state.symbol | handleTrans}}</div>
        </div>
        <div class="border" v-if="current_choose==1">
          <p>{{$t('dash.price')}}</p>
          <p>{{$t('dash.bestPrice')}}</p>
        </div>
        <div
          class="padding bg-gray margin-b"
          v-show="current_choose==0"
        >≈ ￥{{amount_first | handleMoney}}</div>
        <div class="flex border flex-between">
          <!-- 数量 -->
          <input v-model="amount_second" />
          <div>{{$store.state.market}}</div>
        </div>
        <div>
          <div class="flex flex-between padding-tb">
            <div class="border-s">25%</div>
            <div class="border-s">50%</div>
            <div class="border-s">75%</div>
            <div class="border-s">100%</div>
          </div>
        </div>
        <div>
          <p>{{$t('dash.available')}}：0 {{usdt | handleTrans}}</p>
          <p>{{$t('dash.total')}}：--</p>
        </div>
      </div>
      <div class="datas_right">
        <!-- 卖出 -->
        <div
          class="flex flex-between sell_item"
          v-for="(item, index) of datas.depth.sell.slice(0,5)"
          :key="index"
        >
          <p class="f-red">{{item.price | handleDecimal(depth)}}</p>
          <p>{{item.account | handleDecimal(4)}}</p>
          <span class="rectangle_red" :style="{width: rectangleSell_width[index] + 'px'}"></span>
        </div>
        <!-- 美金人民币兑换 -->
        <div class="padding-tb padding f-26">
          {{$store.state.marketinfo.close}}
          <span
            class="f-gray"
          >≈￥{{$store.state.marketinfo.close | handleMoney}}</span>
        </div>
        <!-- 买入 -->
        <div
          class="flex flex-between sell_item"
          v-for="(item, index) of datas.depth.buy.slice(0,5)"
          :key="index+5"
        >
          <p class="f-green">{{item.price | handleDecimal(depth)}}</p>
          <p>{{item.account | handleDecimal(4)}}</p>
          <span class="rectangle_green" :style="{width: rectangleBuy_width[index] + 'px'}"></span>
        </div>
      </div>
    </div>

    <!-- 登录 -->
    <div class="login padding-lr flex flex-between">
      <div>
        <van-button
          v-if="!$store.state.online"
          type="info"
          @click="navToLogin()"
          style="padding: 20px 40px;line-height:0px;font-size:15px;"
        >{{$t('dash.login')}}/{{$t('dash.signUp')}}</van-button>
        <van-button
          v-if="$store.state.online"
          type="primary"
          @click="$router.push('/DASH_BTC/jy')"
          style="padding: 20px 40px;line-height:0px;font-size:15px;"
        >{{$t('dash.buy')}}{{$store.state.marketinfo.market}}</van-button>
      </div>
      <div class="center f-gray depth">
        <div class="depth_menu" v-if="depthShow">
          <p
            @click="chooseDepthType"
            v-for="(item, index) of depthType"
            :class="{choose: currentDepth_choose == index? true : false}"
            :key="index"
            :id="index"
          >{{item}}</p>
        </div>
        <span id="depth" @click="openDepth">{{current_depthType}}</span>
        <i id="depth_icon" class="iconfont icon-xialasanjiaoxingx"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 买入卖出按钮
      active: 0,
      // 买入卖出切换币种（可用）
      usdt: "USDT",
      // 交易类型
      transType: this.$t("dash.limit"),
      // 当前交易类型
      current_type: this.$t("dash.limit[0]"),
      // 选中交易类型高亮
      current_choose: 0,
      // 交易类型弹窗
      show: false,
      amount_first: 0,
      amount_second: 0,
      amount_show: true,
      rectangleBuy_width: [],
      rectangleSell_width: [],
      // 深度类型
      depthType: this.$t("dash.depth"),
      // 当前深度类型
      current_depthType: this.$t("dash.depth[0]"),
      // 选中深度类型高亮
      currentDepth_choose: 0,
      // 深度类型弹窗
      depthShow: false,
      depth: 6,
      // websock数据
      datas: {
        depth: {
          sell: [],
          buy: []
        },
        marketInfo: {},
        history_buy: [],
        history_sell: [],
        marketList: []
      },
      market_param: {
        type: "c2c",
        symbol: "usdt",
        order: "weigh",
        sort: "desc",
        market: "btc",
        think_var: "en"
      },
      precision: 2,
      ws: null
    };
  },
  methods: {
    // 买入
    handleBuy() {
      if (this.active !== 0) {
        this.active = 0;
        this.usdt = this.market_param.symbol;
      }
    },

    // 卖出
    handleSell() {
      if (this.active !== 1) {
        this.active = 1;
        this.usdt = this.$store.state.marketinfo.market;
      }
    },

    // 登录
    navToLogin() {
      this.$router.push("/login");
    },

    // 选择交易类型
    chooseType(e) {
      this.show = !this.show;
      this.current_type = e.target.textContent;
      this.current_choose = e.target.id;
    },

    // 选择深度类型
    chooseDepthType(e) {
      this.depthShow = !this.depthShow;
      this.current_depthType = e.target.textContent;
      this.currentDepth_choose = e.target.id;
      if (e.target.id == 0) {
        this.depth = 6;
      }
      if (e.target.id == 1) {
        this.depth = 4;
      }
      if (e.target.id == 2) {
        this.depth = 2;
      }
    },

    // 点击其他位置关闭下拉菜单
    closeMenu(e) {
      if (e.target.id !== "type" && e.target.id !== "type_icon") {
        this.show = false;
      }
      if (e.target.id !== "depth" && e.target.id !== "type_icon") {
        this.depthShow = false;
      }
    },

    // 打开、关闭交易类型下拉列表
    openMenu() {
      this.show = !this.show;
    },

    // 打开、关闭深度类型下拉列表
    openDepth() {
      this.depthShow = !this.depthShow;
    },

    // 数据初始化
    init() {
      if ("WebSocket" in window) {
        var ws = new WebSocket("WSS://exchange.gd-juzheng.com:2345/market");
        this.ws = ws;
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
        that.rectangleBuy_width = [];
        that.rectangleSell_width = [];
        that.datas = {
          depth: {
            sell: [],
            buy: []
          },
          marketInfo: {},
          history_buy: [],
          history_sell: [],
          marketList: []
        };
        that.datas.depth = res.depth;
        that.datas.marketInfo = res.marketInfo;
        that.datas.marketList = res.marketList;
        that.datas.history_buy = res.HistoryTrade.filter(
          item => item.direction == "buy"
        ).slice(0, 5);
        that.datas.history_sell = res.HistoryTrade.filter(
          item => item.direction == "sell"
        ).slice(0, 5);
        for (let i = 0; i < 5; i++) {
          if (!that.datas.depth.buy[i]) {
            console.log("0000");
            that.datas.depth.buy[i].price = 0;
          }
          if (!that.datas.history_buy[i]) {
            console.log("1111");
            that.datas.history_buy[i].price = 0;
          }
          if (!that.datas.depth.sell[i]) {
            console.log("2222");
            that.datas.depth.sell[i].price = 0;
          }
          if (!that.datas.history_sell[i]) {
            console.log("3333");
            that.datas.history_sell[i].price = 0;
          }
          var buy_price =
            (that.datas.depth.buy[i].price - that.datas.history_buy[i].price) *
            20;
          if (buy_price < 0) {
            buy_price = 0;
          }
          that.rectangleBuy_width.push(buy_price);
          var sell_price =
            (that.datas.depth.sell[i].price -
              that.datas.history_sell[i].price) *
            20;
          if (sell_price < 0) {
            sell_price = 0;
          }
          that.rectangleSell_width.push(sell_price);
          that.$store.commit("sendMarketInfo", res.marketInfo);
          that.$store.commit("sendMarketDepth", res.HistoryTrade);
        }
      };
      ws.onerror = function() {
        that.init();
      };
    }
  },
  created() {
    this.market_param.market = this.$store.state.market;
    this.market_param.symbol = this.$store.state.symbol;
    if (this.ws!=null) {
      console.log('ws init')
      this.ws.close();
    }
    this.init();
  },
  destroyed() {
    this.ws.close()
  },
  watch: {
    "$store.state.market": function() {
      console.log('ws close')
      this.market_param.market = this.$store.state.market;
      this.ws.close();
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.css");
.jy {
  background: rgb(29, 38, 53);
  box-sizing: border-box;
  .tabs {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    background: rgb(38, 48, 67);
    div {
      padding: 30px 0;
      margin: 0 30px;
      font-size: 28px;
      color: rgb(130, 142, 161);
    }
    .bottom_line {
      border-bottom: 4px solid rgb(36, 140, 245);
      color: #fff;
    }
  }
  .attribute {
    display: flex;
    padding: 30px;
    box-sizing: border-box;
    position: relative;
    div {
      font-size: 26px;
      color: rgb(130, 142, 161);
      flex: 1;
    }
    .menu {
      position: absolute;
      top: 70px;
      width: 200px;
      z-index: 100;
      background: rgb(29, 38, 53);
      padding: 10px 0;
      box-sizing: border-box;
      p {
        padding: 20px;
        box-sizing: border-box;
      }
    }
    i {
      display: inline-block;
      font-size: 10px;
      transform: scale(0.3);
      margin: 0px;
      padding: 0;
      color: #fff;
    }
  }

  .datas {
    display: flex;
    box-sizing: border-box;
    .datas_left,
    .datas_right {
      overflow: hidden;
      padding: 20px;
      flex: 1;
      p {
        padding: 10px;
        box-sizing: border-box;
      }
      input {
        border: none;
        background: rgb(29, 38, 53);
        width: 80%;
      }
      .sell_item {
        position: relative;
        .rectangle_red {
          position: absolute;
          right: 0;
          display: inline-block;
          opacity: 0.4;
          background: rgb(212, 47, 47);
          height: 35px;
          width: 30px;
          transition: width 0.5s linear;
        }
        .rectangle_green {
          position: absolute;
          right: 0;
          display: inline-block;
          opacity: 0.4;
          background: rgb(47, 212, 47);
          height: 35px;
          width: 30px;
          transition: width 1s linear;
        }
      }
    }
  }
  .choose {
    color: #fff;
    background: rgb(38, 48, 67);
  }
  .login {
    position: relative;
    i {
      color: white;
      display: inline-block;
      transform: scale(0.3);
      margin-left: -10px;
    }
    .depth_menu {
      position: absolute;
      width: 180px;
      top: -200px;
      right: 30px;
      z-index: 100;
      background: rgb(29, 38, 53);
    }
    .depth {
      p {
        font-size: 28px;
        box-sizing: border-box;
        padding: 20px;
      }
    }
  }
}
</style>