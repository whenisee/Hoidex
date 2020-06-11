<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <div id="nav" :style="[{'background':$store.state.mode?'#ededed':'#1d2635'}]">
      <div @click="closePop()">
        <router-link to="/">
          <img :src="$store.state.mode?require('./assets/home02.png'):require('./assets/home01.png')" alt />
        </router-link>
      </div>
      <!-- 头部协议选择 -->
      <div class="declaration" @click="showDeclaration()" v-if="showTitle" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        {{title}}
        <i class="iconfont icon-xialasanjiaoxingx"></i>
      </div>

      <!-- 头部币种选择 -->
      <div class="declaration" @click="showTrade()" v-if="showTradeTitle" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        {{tradeTitle}}
        <i class="iconfont icon-xialasanjiaoxingx"></i>
      </div>
      <div class="mode" v-if="showMode">
        <ul>
          <li :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{mode}}</li>
          <li>
            <van-Switch v-model="isChoose" size="14px" @change="changeMode"></van-Switch>
          </li>
        </ul>
      </div>
      <!-- 头部菜单选择 -->
      <div class="list">
        <div @click="closePop()">
          <router-link v-if="showLogin" to="login" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('message.login')}}/{{$t('message.signUp')}}</router-link>
        </div>
        <div>
          <i class="iconfont icon-zhankai" @click="handlePopup" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
        </div>
      </div>
    </div>

    <!-- 视图区 -->
    <div class="content" :style="[{'background': $store.state.mode ? '#fff' : '#1d2635'}]">
      <router-view />
    </div>
    <!-- 菜单弹出层 -->
    <transition name="fade">
      <div class="expand" v-show="show" :style="[{'background': $store.state.mode ? '#fff' : '#1d2635'}]">
        <!-- 登录注册 -->
        <div class="container">
          <div
            class="btn login_in"
            :style="[{'background': $store.state.mode ? '#fff' : '#1d2635'}, {'color':!$store.state.mode?'#fff':'#1d2635'}]"
            @click="login()"
            v-if="!$store.state.online"
          >{{$t('message.login')}}</div>
          <div
            class="btn sign_up"
            @click="sighUp()"
            v-if="!$store.state.online"
          >{{$t('message.signUp')}}</div>
        </div>
        <!-- 菜单列表 -->
        <div class="nav_second">
          <div @click="handleMoney()">
            <i class="iconfont icon-jiaoyi trans"></i>
            {{$t('message.CurrencyTrading')}}
          </div>
          <div @click="handleUser()">
            <i class="iconfont icon-icon-user-light"></i>
            {{$t('message.account')}}
          </div>
          <div @click="handleMessage()">
            <i class="iconfont icon-xiaoxi1"></i>
            {{$t('message.message')}}
          </div>
          <div @click="handleLanguage()">
            <i class="iconfont iconshezhi"></i>
            {{$t('message.language')}}
          </div>
          <div @click="handleNew()">
            <i class="iconfont iconchenggong"></i>
            {{$t('message.new')}}
          </div>
          <div @click="handleIssue()">
            <i class="iconfont iconshenqing"></i>
            {{$t('message.currency')}}
          </div>
          <div @click="handleWallet()">
            <i class="iconfont iconqianbao"></i>
            {{$t('wallet.wallet')}}
          </div>
          <!-- 退出 -->
          <div @click="handleExit()" v-if="$store.state.online">
            <i class="iconfont icontuichu"></i>
            {{$t('message.exit')}}
          </div>
        </div>
      </div>
    </transition>

    <!-- 用户协议弹出层 -->
    <van-popup
      v-model="declarationShow"
      position="top"
      :style="[{'margin-top': '50px'}, {'height': '700px'}, {'background': $store.state.mode? '#fff' : '#1d2635'}]"
    >
      <!-- 协议列表 -->
      <div class="titleMenu">
        <div @click="navTo(0)" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('agreement.title[0]')}}</div>
        <div @click="navTo(1)" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('agreement.title[1]')}}</div>
        <div @click="navTo(2)" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('agreement.title[2]')}}</div>
        <div @click="navTo(3)" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('agreement.title[3]')}}</div>
      </div>
    </van-popup>

    <!-- 币种弹出层 -->
    <van-popup
      v-model="tradeShow"
      position="top"
      :style="[{'margin-top': '50px'}, {'background': $store.state.mode? '#fff' : '#1d2635'}]"
      z-index:2000
    >
      <!-- 币种列表 -->
      <div class="tradeTitleMenu">
        <Search></Search>
        <van-tabs
          v-model="active"
          color="rgb(34, 141, 215)"
          :background="$store.state.mode? '#fff' : '#1d2635'"
          :border="false"
          title-inactive-color="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
          line-width="50"
        >
          <van-tab :title="$t('message.optional')">
            <Trade :datas="home_datas" @close="close"></Trade>
          </van-tab>
          <van-tab title="USDT">
            <Trade :datas="usdt_datas" @close="close"></Trade>
          </van-tab>
          <van-tab title="BTC">
            <Trade :datas="btc_datas" @close="close"></Trade>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Search from "./components/Search";
import Trade from "./components/Trade";
export default {
  name: "app",
  components: {
    Search,
    Trade
  },
  data() {
    return {
      active: 1,
      show: false,
      // 协议弹出层
      declarationShow: false,
      title: this.$t("agreement.title[1]"),
      // 币种弹出层
      tradeShow: false,
      tradeTitle: "BTC/USDT",
      home_datas: [],
      usdt_datas: [],
      btc_datas: [],
      ws: null,
      ws02: null,
      url: 1,
      // 模式选择
      isChoose: false,
      mode: '白天'
    };
  },
  computed: {
    // 根据路由判断是否隐藏登录注册模块
    showLogin: function() {
      if (this.$route.path !== "/" || this.$store.state.online) {
        return false;
      }
      return true;
    },
    // 显示头部协议标题
    showTitle: function() {
      if (this.$route.path.slice(0, 4) !== "/cms") {
        return false;
      }
      return true;
    },
    // 显示头部币种标题
    showTradeTitle: function() {
      if (this.$route.path.slice(0, 5) !== "/DASH") {
        return false;
      }
      return true;
    },
    // 首页显示夜间模式
    showMode: function() {
      if (this.$route.path !== "/") {
        return false;
      }
      return true;
    }
  },
  methods: {
    // 菜单弹出框
    handlePopup() {
      this.declarationShow = false;
      this.tradeShow = false;
      this.show = !this.show;
    },
    // 选择模式
    changeMode(value) {
      if (value == false) {
        this.mode = '白天'
        this.$store.commit('handleMode', true)
      } else {
        this.mode = '夜间'
        this.$store.commit('handleMode', false)
      }
    },
    // 协议弹出框
    showDeclaration() {
      this.show = false;
      this.declarationShow = !this.declarationShow;
    },
    // 子组件关闭
    close() {
      this.tradeShow = !this.tradeShow;
    },
    // 币种弹出层
    showTrade() {
      this.show = false;
      this.tradeShow = !this.tradeShow;
    },

    // 关闭弹出框
    closePop() {
      this.declarationShow = false;
      this.show = false;
      this.tradeShow = false;
    },

    // 登录
    login() {
      this.$router.push({ path: "/login" });
      this.handlePopup();
    },

    // 注册
    sighUp() {
      this.$router.push({ path: "/signUp" });
      this.handlePopup();
    },

    // 币币交易
    handleMoney() {
      this.$router.push({ path: "/DASH_BTC" });
      this.handlePopup();
    },

    // 用户中心
    handleUser() {
      this.$router.push({ path: "/user" });
      this.handlePopup();
    },

    // 消息
    handleMessage() {
      this.$router.push({ path: "/message" });
      this.handlePopup();
    },

    // 语言
    handleLanguage() {
      this.$router.push({ path: "/setLang" });
      this.handlePopup();
    },

    // 打新专区
    handleNew() {
      this.$router.push({ path: "/new" });
      this.handlePopup();
    },

    // 上币申请
    handleIssue() {
      this.$router.push({ path: "/apply" });
      this.handlePopup();
    },

    // 钱包资产
    handleWallet() {
      this.$router.push({ path: "/wallet" });
      this.handlePopup();
    },
    // 协议列表跳转
    navTo(url) {
      this.url = url;
      switch (url) {
        case 0:
          this.$router.push({ path: "/cms/aboutus" });
          this.title = this.$t("agreement.title[0]");
          this.showDeclaration();
          break;
        case 1:
          this.$router.push({ path: "/cms/agreement" });
          this.title = this.$t("agreement.title[1]");
          this.showDeclaration();
          break;
        case 2:
          this.$router.push({ path: "/cms/privacy" });
          this.title = this.$t("agreement.title[2]");
          this.showDeclaration();
          break;
        case 3:
          this.$router.push({ path: "/cms/declaration" });
          this.title = this.$t("agreement.title[3]");
          this.showDeclaration();
          break;
      }
    },

    // 退出登录
    handleExit() {
      localStorage.removeItem("token");
      localStorage.removeItem("userinfo");
      this.handlePopup();
      this.$store.commit("edit", false);
      this.$router.push("/");
      this.$notify({ type: "success", message: "退出登录！", duration: 800 });
    },
    init() {
      var that = this;
      if ("WebSocket" in window) {
        this.ws = new WebSocket("WSS://exchange.gd-juzheng.com:2345");
        var ws = this.ws
      }
      var param = {
        type: "index",
        symbol: "USDT",
        order: "weigh",
        sort: "desc",
        market: "",
        think_var: "en"
      };

      ws.onopen = function() {
        if (that.ws.readyState == 1) {
          setTimeout(() => {
            ws.send(JSON.stringify(param));
          }, 500);
        }
      };
      ws.onmessage = function(e) {
        var res = JSON.parse(e.data);
        // that.btc_datas = res;
        that.usdt_datas = res;
      };

      if ("WebSocket" in window) {
        var ws02 = new WebSocket("WSS://exchange.gd-juzheng.com:2345");
        this.ws02 = ws02;
      }
      var param02 = {
        type: "index",
        symbol: "BTC",
        order: "weigh",
        sort: "desc",
        market: "",
        think_var: "en"
      };

      ws02.onopen = function() {
        if (that.ws02.readyState == 1) {
          setTimeout(() => {
            ws02.send(JSON.stringify(param02));
          }, 500);
        }
      };
      ws02.onmessage = function(e) {
        var res = JSON.parse(e.data);
        that.btc_datas = res;
        // that.usdt_datas = res
      };
    }
  },
  created() {
    // console.log(this.$store.state.mode)
    // this.$store.commit("tradingView", TradingView);
    if (localStorage.getItem("token")) {
      this.$store.commit("edit", true);
    }
    this.init();
  },
  watch: {
    "$store.state.market_symbol": function() {
      this.tradeTitle = this.$store.state.market_symbol;
    },
    "$store.state.home_datas": function() {
      this.home_datas = this.$store.state.home_datas;
      this.usdt_datas = this.$store.state.home_datas;
    },
    "$store.state.locale": function() {
      this.title = this.$t(`agreement.title[${this.url}]`);
    }
  }
};
</script>
<style lang="less" scoped>
.expand {
  position: fixed;
  top: 90px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3000;
}
.fade-enter-active,
.fade-leave-active {
  transition: left 0.5s;
}
.fade-enter,
.fade-leave-to {
  left: 100%;
}
.van-popup {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
}
#nav {
  z-index: 3000;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  // 模式选择
  .mode {
    ul {
      display: flex;
      width: 80%;
      justify-content: space-evenly;
      li {
        display: flex;
        align-items: center;
      }
    }
  }
  div {
    flex: 1;
    &:nth-child(2) {
      flex: .5
    }
    display: flex;
    align-items: center;
    div {
      display: flex;
      justify-content: flex-end;
    }
    a {
      font-size: 26px;
    }
    i {
      font-size: 28px;
      margin: 0 30px;
    }
  }
  .declaration {
    flex: 1.2 !important;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    font-size: 28px;
    i {
      font-size: 10px;
      transform: scale(0.5);
      margin: 0;
      padding: 0;
      color: rgb(130, 142, 161);
    }
  }
  .list {
    display: flex;
    justify-content: flex-end;
    div:nth-child(2) {
      flex: 0.3;
    }
  }
  img {
    width: 2.45rem;
  }
}

.titleMenu {
  div {
    width: 100%;
    padding: 30px;
    font-size: 26px;
    color: #fff;
    border-bottom: 1px solid #333;
  }
}

.content {
  width: 100%;
  position: absolute;
  top: 90px;
  bottom: 0;
  &::-webkit-scrollbar {
    display: none; //取消滚动轴
  }
}

.container {
  width: 10rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  padding: 40px 0 0 0;
  .btn {
    width: 4rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login_in {
    border: 1px solid rgb(36, 160, 245);
    color: #fff;
  }
  .sign_up {
    background: rgb(36, 160, 245);
    border: 1px solid rgb(36, 160, 245);
    color: #fff;
  }
}
.nav_second {
  box-sizing: border-box;
  width: 100%;
  padding: 50px;
  div {
    padding: 30px 0;
    width: 100%;
    color: rgb(130, 142, 161);
  }
  i {
    font-size: 28px;
    margin-right: 10px;
  }
}
.trans {
  display: inline-block;
  transform: rotate(-90deg);
}
</style>
