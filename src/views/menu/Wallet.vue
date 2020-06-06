<template>
  <div class="wallet" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <article>
      <p>{{$t('wallet.total')}}</p>
      <p>{{to_btc}} ≈ {{$t('wallet.moneySymbol')}} {{to_fabi}}</p>
    </article>
    <h2 class="title">{{$t('wallet.wallet')}}</h2>
    <div class="table">
      <!-- 表格头 -->
      <ul class="thead flex">
        <li>{{$t('wallet.type')}}</li>
        <li>{{$t('wallet.available')}}</li>
        <li>{{$t('wallet.frozen')}}</li>
        <li>{{$t('wallet.valuation')}}</li>
        <li>{{$t('wallet.operate')}}</li>
      </ul>
      <ul class="flex" v-for="(item,index) of coinDatas" :key="item.id">
        <li :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{item.market}}</li>
        <li :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{item.account}}</li>
        <li class="f-green">{{item.lock_account}}</li>
        <li class="f-gray">
          {{item.to_btc}}
          <span>≈{{$t('wallet.moneySymbol')}}{{item.to_fabi}}</span>
        </li>
        <li style="position: relative">
          <i class="iconfont iconjiantouarrow486 f-gray" @click="showOpera(index)"></i>
          <div
            class="operate"
            style="position: absolute;"
            v-if="operaShow && index==currentItemIndex"
            :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"
          >
            <p
              v-for="(operaItem, i) of operaList"
              :key="i"
              @click="chooseOpera(i, item.market)"
              :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
            >{{operaItem}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制操作显示
      operaShow: false,
      coinDatas: {},
      operaList: [this.$t('wallet.recharge'), this.$t('wallet.withdrawal'), this.$t('wallet.transaction')],
      currentItemIndex: 0,
      // 头部总资产
      to_btc: 0,
      to_fabi: 0
    };
  },
  created() {
    this.initData();
    let that = this;
    document.addEventListener("click", function(e) {
      if (e.target.className != "iconfont iconjiantouarrow486 f-gray") {
        that.operaShow = false;
      }
    });
  },
  methods: {
    // 请求用户数据
    async initData() {
      let token = localStorage.getItem("token");
      const {data: res} = await this.axios
        .get(
          "https://exchange.gd-juzheng.com/api/Wallet/index",{
            params: {
              'verification': localStorage.getItem('token')
            }
          }
        )
       this.coinDatas = res.data.moneyList
       this.to_btc = res.data.to_btc
       this.to_fabi = res.data.to_fabi
    },
    // 选择操作
    chooseOpera(index, market) {
      // 跳转{操作，币种}
      if (index === 0) {
        this.$router.push("/wallet/deposit");
      }
      if (index === 1) {
        this.$router.push("/wallet/withdrawal");
      }
      if (index === 2) {
        this.handleNavTo(market)
      }
    },
    showOpera(index) {
      this.operaShow = !this.operaShow;
      this.currentItemIndex = index;
    },
    // 跳转到相应的页面
    handleNavTo(market, symbol='USDT') {
      console.log(market)
      var str = market + "/" + symbol;
      this.$store.commit("addMarket", str);
      this.$router.push({ path: "/DASH_BTC/jy"});
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.css");
.wallet {
  box-sizing: border-box;
  background: #010a2c;
  article {
    background: #3468dd;
    padding: 30px;
    p {
      padding: 20px 0;
      &:nth-child(2) {
        font-size: 36px;
        font-weight: bold;
      }
    }
  }
  h2 {
    padding: 30px;
    font-size: 30px;
  }
  .table {
    padding: 0 30px 30px 30px;
    .thead {
      color: #8495aa;
    }
    ul {
      padding: 20px 0;
      border-bottom: 1px solid #8495aa;
      width: 100%;
      li {
        flex: .6;
        display: flex;
        justify-content: flex-end;
        word-break: break-all;
        &:nth-child(1) {
          justify-content: flex-start;
          flex: 0.4;
        }
        &:nth-last-child(1) {
          flex: 0.42;
          .operate {
            top: 40px;
            width: 180%;
            background: rgb(20, 32, 54);
            z-index: 100;
            p {
              padding: 20px;
              text-align: center;
              &:nth-child(2) {
                box-sizing: border-box;
                border: 1px solid rgb(40, 38, 54);
                border-left: none;
                border-right: none;
              }
            }
          }
        }
        &:nth-last-child(2) {
          flex-direction: column;
          align-items: flex-end;
          span {
            display: flex;
            width: 100%;
            justify-content: flex-end;
            padding: 10px 0;
          }
        }
      }
    }
  }
}
</style>