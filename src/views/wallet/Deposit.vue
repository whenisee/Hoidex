<template>
  <div class="deposit" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <!-- 头部导航 -->
    <h2 :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <p @click="navBack" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        <i class="iconfont iconjiantou-copy" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
      </p>
      <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.recharge')}}</p>
      <p><span @click="navTo" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.record')}}</span></p>
    </h2>
    <!-- 内容区 -->
    <div class="content" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <!-- 币种头部 -->
      <ul class="flex" :style="[{'background':$store.state.mode?'#ededed':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        <li
          :class="['padding-large', item==currentCoin?'bottom_line':'', 'box']"
          v-for="item of coinDatas"
          :key="item"
          @click="chooseCoin(item)"
        >{{item}}</li>
      </ul>

      <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{currentCoin}}{{$t('wallet.address')}}</p>

      <div class="erweima">
        <div class="pic">
          <img :src="current_erweima" />
        </div>
      </div>

      <p class="bg-gray" @click="copy" :style="[{'background':$store.state.mode?'#ededed':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{current_link}}</p>

      <div class="amount p-center" >
        <span :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.amount')}}({{currentCoin}})</span>
        <input type="text" style="width: 40%" v-model="money" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"/>
      </div>

      <div class="center">
        <div class="purchase p-center" @click="submit">{{$t('wallet.buy')}}</div>
      </div>
    </div>
    <!-- 温馨提示 -->
    <article :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <p>
        <i class="iconfont icontishi"></i>{{$t('wallet.warning')}}
      </p>
      <section v-html="msg"></section>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coinDatas: [],
      // 二维码
      current_erweima: "",
      link: "",
      current_link: "",
      // 选择充值的币种
      currentCoin: "USDT",
      // 注意事项
      msg: '',
      money: ''
    };
  },
  created() {
    this.initData();
  },
  methods: {
    //初始化数据
    async initData() {
      let locale = sessionStorage.getItem("locale");
      const { data: res } = await this.axios.get(
        "https://exchange.gd-juzheng.com/api/Wallet/legal",
        {
          params: {
            verification: localStorage.getItem("token"),
            lang: locale,
            coin: this.currentCoin
          }
        }
      );
      this.coinDatas = res.data.getcoinList;
      this.currentCoin = res.data.one.coin;
      this.current_link = res.data.one.token;
      this.current_erweima =
        "https://exchange.gd-juzheng.com" + res.data.one.image;
      this.msg = res.data.msg;
    },
    navBack() {
      this.$router.back();
    },
    // 选择币种
    chooseCoin(item) {
      this.currentCoin = item;
      this.currentCoin = this.coinDatas[item];
      if (item == "USDT") {
        this.current_link = this.link[0];
      }
      if (item == "BTC") {
        this.current_link = this.link[1];
      }
      if (item == "ETH") {
        this.current_link = this.link[2];
      }
      this.initData();
    },
    // 复制链接
    copy() {
      this.$copyText(this.current_link).then(e => {
        this.$notify({
          message: "复制链接",
          type: "success",
          duration: 800
        });
      });
    },
    // 跳转到充币记录
    navTo() {
      this.$router.push("/wallet/record");
    },
    // 提交
    async submit() {
      let id;
      if (this.currentCoin == "USDT") {
        id = 3;
      }
      if (this.currentCoin == "BTC") {
        id = 5;
      }
      if (this.currentCoin == "ETH") {
        id = 4;
      }
      const { data: res } = await this.axios.get(
        "https://exchange.gd-juzheng.com/api/Wallet/recharge_add",
        {
          params: {
            token: localStorage.getItem("token"),
            id,
            money: this.money
          }
        }
      );
      if (res.code == 1) {
        this.$notify({
          message: "充值成功",
          type: "success",
          duration: 900
        });
        this.money = ''
      } else {
        this.$notify({
          message: "请输入购买数量",
          type: "warning",
          duration: 900
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.css");
.deposit {
  background: #010a2c;
  input {
    margin-left: 20px;
    background: #010a2c;
    outline: none;
    border: none;
    border-bottom: 2px solid #3573ff;
  }
  h2 {
    box-sizing: border-box;
    background: #010a2c;
    padding: 30px;
    display: flex;
    margin-bottom: 5px;
    p {
      font-size: 30px;
      flex: 1;
      &:nth-child(1) {
        flex: 0.2;
      }
      &:nth-child(3) {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .content {
    background: #010a2c;
    padding: 30px;
    p {
      padding: 30px 0;
      font-size: 28px;
      width: 100%;
      text-align: center;
    }
    .erweima {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 20px 0 40px 0;
      .pic {
        width: 350px;
        height: 350px;
        padding: 10px;
        background: #fff;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .amount {
      padding: 50px 0;
    }
    .purchase {
      width: 50%;
      padding: 30px 0;
      background: linear-gradient(
        90deg,
        rgba(54, 124, 239, 1) 0%,
        rgba(47, 175, 240, 1) 100%
      );
      font-size: 28px;
      letter-spacing: 5px;
    }
  }
  article {
    background: #010a2c;
    width: 100%;
    padding: 60px;
    box-sizing: border-box;
    color: rgb(130, 142, 161);
    p {
      padding: 5px 0;
      font-size: 26px;
      letter-spacing: 1px;
      line-height: 30px;
    }
    section {
      width: 100%;
      p {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>