<template>
  <div class="cj" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <div class="title" :style="[{'background':$store.state.mode?'#ededed':'#2e2e2e'},{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('dash.recentTrades')}}</div>
    <section>
      <div class="attribute">
        <p>{{$t('dash.price')}}({{$parent.marketinfo.symbol | handleTrans}})</p>
        <p>{{$t('dash.volume')}}({{$parent.marketinfo.market}})</p>
        <p>{{$t('dash.time')}}</p>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) of $parent.HistoryTrade" :key="index">
          <p :style="{color: item.direction=='buy'?'green':'red'}">{{item.price}}</p>
          <p>{{item.amount | handleDecimal(4)}}</p>
          <p>{{item.ts}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
  },
  destroyed() {
  }
};
</script>

<style lang="less" scoped>
.cj {
  background: rgb(29, 38, 53);
  padding-bottom: 80px;
  font-size: 28px;
  .title {
    padding: 30px;
    box-sizing: border-box;
    background: rgb(38, 48, 67);
  }
  section {
    font-size: 25px;
    padding: 20px;
    .attribute {
      display: flex;
      justify-content: center;
      p {
        padding: 10px 0;
        font-size: 26px;
        display: flex;
        justify-content: center;
        &:nth-child(1) {
          display: flex;
          justify-content: flex-start;
        }
        &:nth-last-child(1) {
          display: flex;
          justify-content: flex-end;
          margin-right: 10px;
        }
      }
    }
    p {
      flex: 1;
      color: rgb(130, 142, 161);
    }
    .content {
      font-size: 26px;
      padding: 20px 0;
      &::-webkit-scrollbar {
        display: none; //取消滚动轴
      }
      .item {
        display: flex;
        p {
          padding: 10px 0;
          display: flex;
          justify-content: center;
          &:nth-child(1) {
            display: flex;
            justify-content: flex-start;
            color: red;
          }
          &:nth-last-child(1) {
            display: flex;
            justify-content: flex-end;
            color: red;
          }
        }
      }
    }
  }
}
</style>