<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <div id="nav">
      <div @click="closePop()">
        <router-link to="/">
          <img src="./assets/home.png" alt />
        </router-link>
      </div>
      <!-- 头部协议选择 -->
      <div class="declaration" @click="showDeclaration()" v-if="showTitle">
        {{title}}
        <i class="iconfont icon-xialasanjiaoxingx"></i>
      </div>

      <!-- 头部币种选择 -->
      <div class="declaration" @click="showTrade()" v-if="showTradeTitle">
        {{tradeTitle}}
        <i class="iconfont icon-xialasanjiaoxingx"></i>
      </div>

      <!-- 头部菜单选择 -->
      <div class="list">
        <div @click="closePop()">
          <router-link v-if="showLogin" to="login">{{$t('message.login')}}/{{$t('message.signUp')}}</router-link>
        </div>
        <div>
          <i class="iconfont icon-zhankai" @click="handlePopup"></i>
        </div>
      </div>
    </div>

    <!-- 清除定位的盒子 -->
    <div class="block"></div>

    <!-- 视图区 -->
    <div class="content">
      <router-view />
      <!-- 菜单弹出层 -->
    <van-popup v-model="show" position="right">
      <!-- 登录注册 -->
      <div class="container">
        <div
          class="btn login_in"
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
        <div @click="handleLanguage()">{{$t('message.language')}}</div>
        <div @click="handleNew()">{{$t('message.new')}}</div>
        <div @click="handleIssue()">{{$t('message.currency')}}</div>
        <div @click="handleExit()" v-if="$store.state.online">{{$t('message.exit')}}</div>
      </div>
    </van-popup>

    <!-- 用户协议弹出层 -->
    <van-popup
      v-model="declarationShow"
      position="top"
      style="margin-top: 50px; height: 700px; background: rgb(29, 38, 53);"
    >
      <!-- 协议列表 -->
      <div class="titleMenu">
        <div @click="navTo(0)">{{$t('agreement.title[0]')}}</div>
        <div @click="navTo(1)">{{$t('agreement.title[1]')}}</div>
        <div @click="navTo(2)">{{$t('agreement.title[2]')}}</div>
        <div @click="navTo(3)">{{$t('agreement.title[3]')}}</div>
      </div>
    </van-popup>

    <!-- 币种弹出层 -->
    <van-popup
      v-model="tradeShow"
      position="top"
      style="margin-top: 50px; background: rgb(29,38,53)"
      z-index:2000
    >
      <!-- 币种列表 -->
      <div class="tradeTitleMenu">
        <Search></Search>
        <van-tabs
          v-model="active"
          color="rgb(34, 141, 215)"
          background="rgb(29,38,53)"
          :border="false"
          title-active-color="rgba(237, 244, 248, 1)"
          title-inactive-color="#aaa"
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
      active: 0,
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
      url: 1
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
    }
  },
  methods: {
    // 菜单弹出框
    handlePopup() {
      this.declarationShow = false;
      this.tradeShow = false;
      this.show = !this.show;
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
      this.$notify({ type: "success", message: "退出登录！" });
    },
    init() {
      var that = this;
      if ("WebSocket" in window) {
        var ws = new WebSocket("WSS://exchange.gd-juzheng.com:2345");
        this.ws = ws;
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
          }, 2000);
        }
      };
      ws.onmessage = function(e) {
        var res = JSON.parse(e.data);
        that.btc_datas = res;
      };
    }
  },
  created() {
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
.van-popup {
  width: 100%;
  background: rgb(29, 38, 53);
  position: fixed;
  // top: 100px;
  // bottom: 0;
}
#nav {
  z-index: 3000;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  background: rgb(29, 38, 53);
  div {
    flex: 1;
    display: flex;
    align-items: center;
    div {
      display: flex;
      justify-content: flex-end;
    }
    a {
      color: #fff;
      font-size: 26px;
    }
    i {
      font-size: 28px;
      color: #fff;
      margin: 0 30px;
    }
  }
  .declaration {
    flex: 1.2;
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

.block {
  width: 100%;
  height: 100px;
  background: rgb(29, 38, 53);
}

.content {
  width: 100%;
  position: absolute;
  top: 100px;
  bottom: 0;
  background: rgb(29, 38, 53);
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
    background: rgb(29, 38, 53);
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
