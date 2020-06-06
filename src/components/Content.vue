<template>
  <div class="content">
    <!-- 头部信息分类 -->
    <div class="head_class">
      <div>
        <span>{{$t('message.market')}}</span>
        <span class="sort" @click="sort1">
          <i :class="[{'show': show1_up}, 'iconfont', 'icon-xialasanjiao-copy']"></i>
          <i :class="[{'show': show1_down}, 'iconfont', 'down', 'icon-xialasanjiao-copy']"></i>
        </span>
      </div>
      <div @click="sort2">
        <span>{{$t('message.price')}}</span>
        <span class="sort">
          <i :class="[{'show': show2_up}, 'iconfont', 'icon-xialasanjiao-copy']"></i>
          <i :class="[{'show': show2_down}, 'iconfont', 'down', 'icon-xialasanjiao-copy']"></i>
        </span>
      </div>
      <div>
        <span @click="sort3">{{$t('message.rate')}}</span>
        <span class="sort">
          <i :class="[{'show': show3_up}, 'iconfont', 'icon-xialasanjiao-copy']"></i>
          <i :class="[{'show': show3_down}, 'iconfont', 'down', 'icon-xialasanjiao-copy']"></i>
        </span>
      </div>
    </div>

    <!-- 信息内容 -->
    <div class="data_content">
      <div class="item" v-for="item of datas" :key="item.id" @click="handleNavTo(item.market, item.symbol)">
        <div :style="[{'color':!$store.state.mode?'#fff':'#000'}]">
          <i class="iconfont icon-shoucang"></i>
          {{item.market}}/{{item.symbol | handleUpper}}
        </div>
        <div>
          <p :style="[{'color':!$store.state.mode?'#fff':'#000'}]">{{item.open}}</p>
          <p class="second_s">≈ ￥ {{item.open | handleMoney}}</p>
        </div>
        <div>
          <div :class="item.changepercent>0? 'green':'red'">{{item.changepercent | handleNum}}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["datas"],
  data() {
    return {
      show1_up: false,
      show1_down: true,
      show2_up: false,
      show2_down: false,
      show3_up: false,
      show3_down: false
    };
  },
  methods: {
    handleNavTo(market, symbol) {
      var str = market + "/" + symbol;
      this.$store.commit('addMarket', str)
      this.$router.push({path: '/DASH_BTC/jy'})
    },

    // 条件排序--市场
    sort1() {
      var order = 'id'
      this.show2_up = false;
      this.show2_down = false;
      this.show3_up = false;
      this.show3_down = false;
      if (this.show1_up) {
        this.show1_down = true;
        this.show1_up = false;
        this.$store.commit('handleParam', {order, sort: 'desc'})
      } else {
        this.show1_down = false;
        this.show1_up = true;
        this.$store.commit('handleParam', {order, sort: 'asc'})
      }
    },

    // 条件排序--最新价
    sort2() {
      var order = 'close'
      this.show1_up = false;
      this.show1_down = false;
      this.show3_up = false;
      this.show3_down = false;
      if (this.show2_up) {
        this.show2_down = true;
        this.show2_up = false;
        this.$store.commit('handleParam', {order, sort: 'desc'})
      } else {
        this.show2_down = false;
        this.show2_up = true;
        this.$store.commit('handleParam', {order, sort: 'asc'})
      }
    },

    // 条件排序--涨跌幅
    sort3() {
      var order = 'changepercent'
      this.show1_up = false;
      this.show1_down = false;
      this.show2_up = false;
      this.show2_down = false;
      if (this.show3_up) {
        this.show3_down = true;
        this.show3_up = false;
        this.$store.commit('handleParam', {order, sort: 'desc'})
      } else {
        this.show3_down = false;
        this.show3_up = true;
        this.$store.commit('handleParam', {order, sort: 'asc'})
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  .head_class {
    display: flex;
    padding: 10px 20px;
    border-bottom: 1px solid #333;
    span {
      display: flex;
      align-items: center;
    }
    .show {
      color: red;
    }
    .sort {
      display: flex;
      flex-direction: column;
      .down {
        transform: scaleY(-1) scale(0.7);
      }
      i {
        line-height: 0.5;
        display: inline-block;
        transform: scale(0.7);
      }
    }
    div {
      color: rgb(130, 142, 161);
      padding: 10px 0;
      flex: 1;
      display: flex;
      justify-content: flex-end;
      &:nth-child(1) {
        flex: 1.1;
        margin-left: 4px;
        justify-content: flex-start;
      }
      i {
        font-size: 18px;
        margin: 0 10px;
      }
    }
  }
  .data_content {
    .item {
      display: flex;
      padding: 15px 20px;
      .discount {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        margin-bottom: 20px;
        background: rgb(28, 62, 93);
        color: rgb(36, 160, 245);
      }
      .green {
        color: green;
        background: rgb(25, 59, 68);
      }
      .red {
        color: red;
        background: rgb(57, 43, 62);
      }
      div {
        padding: 5px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        box-sizing: border-box;
        .second_s {
          color: rgb(130, 142, 161);
        }
        p {
          margin: 5px;
        }
        &:nth-child(1) {
          flex-direction: row;
          align-items: flex-start;
          flex: 1.3;
          display: flex;
          align-items: center;
          i {
            line-height: 30px;
            color: rgb(130, 142, 161);
            font-size: 26px;
            margin-right: 20px;
          }
        }
        &:nth-child(3) {
          div {
            padding: 15px 20px;
          }
        }
      }
    }
  }
}
</style>