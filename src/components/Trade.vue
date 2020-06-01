<template>
  <div class="trade">
    <p class="market">{{$t('message.market')}}</p>
    <div class="container">
      <div class="datas">
        <div class="item" v-for="item of datas" :key="item.id" @click="navToJY(item.market, item.symbol)">
          <i class="iconfont icon-shoucang"></i>
          <span>{{item.market}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["datas"],
  methods: {
    navToJY(market, symbol) {
      var str = market + '/' + symbol
      this.$store.commit('addMarket', str)
      this.$emit('close')
      this.$router.push({path: '/DASH_BTC/jy', query: { name: market }})
    }
  }
};
</script>

<style lang="less" scoped>
.trade {
  width: 10rem;
  height: 1100px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none; //取消滚动轴
  }
  color: rgb(130, 142, 161);
  box-sizing: border-box;
  .market {
    padding: 30px 80px;
    border-top: 1px solid rgba(41, 52, 72, 1);
    border-bottom: 1px solid rgba(41, 52, 72, 1);
  }
  .container {
    p {
      padding: 20px 30px;
      border-bottom: 1px solid rgba(41, 52, 72, 1);
      color: rgb(130, 142, 161);
    }
    .datas {
      margin-bottom: 80px;
      .item {
        padding: 20px 30px;
        color: rgb(130, 142, 161);
        i {
          margin: 0 20px 0 0;
        }
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>