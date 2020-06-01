<template>
  <div class="trade">
    <!-- 头部数据 -->
    <div class="headDatas" v-if="active">
      <div>
        <p class="bg-white ft-large">{{$store.state.marketinfo.close}}</p>
        <p>≈ ￥{{$store.state.marketinfo.close | handleMoney}}</p>
      </div>
      <div>
        <p>{{$t('dash.change')}}</p>
        <p
          :class="['bg-change', {'f-color': $store.state.marketinfo.changepercent>0?false : true}]"
        >{{$store.state.marketinfo.changepercent | handleNumAll}}%</p>
      </div>
      <div>
        <p>{{$t('dash.vol')}}</p>
        <p
          class="bg-white"
        >{{$store.state.marketinfo.amount | handleDecimal(4)}} {{$store.state.marketinfo.market}}</p>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">
      <router-view />
    </div>

    <!-- 底部导航栏 -->
    <div class="navBars">
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
      tabs: this.$t('dash.tabs')
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
      if(this.$route.path.slice(10, 12) == "jy") {
        return 'router-link-exact-active'
      }
      return ''
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