<template>
  <div class="withdrawal" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <!-- 头部导航 -->
    <h2 :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <p @click="navBack" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        <i class="iconfont iconjiantou-copy" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
      </p>
      <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.withdrawal')}}</p>
    </h2>
    <div class="form" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <!-- 币种 -->
      <div class="acount">
        <div class="flex b_line coin" @click="handleActive('coin')">
          <input type="text" readonly v-model="form.coin" class="inp01" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"/>
          <p class="center">
            <i class="iconfont iconjiantouarrow486" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
          </p>
        </div>
        <transition name="fade">
          <section v-if="isActiveCoin">
            <p
              v-for="(item, index) of coinDatas"
              :key="index"
              @click="handleChoose(item, 'coin')"
            >{{item}}</p>
          </section>
        </transition>
      </div>
      <!-- 提币地址 -->
      <div class="acount">
        <div class="flex b_line" @click="handleActive('addr')">
          <input
            type="text"
            readonly
            v-model="form.addr"
            class="inp02"
            :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"
            :placeholder="$t('wallet.coinaddress')"
          />
          <p class="center">
            <i class="iconfont iconjiantouarrow486" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
          </p>
        </div>
        <transition name="fade">
          <section v-if="isActiveAddr">
            <p
              v-for="(item, index) of addrDatas"
              :key="item.id"
              @click="handleChoose(index, 'addr')"
            >{{item.token}} - {{item.tip}}</p>
          </section>
        </transition>
      </div>
      <!-- 数量 -->
      <div class="acount">
        <div class="flex b_line">
          <input type="number" :placeholder="$t('wallet.Enterquantity')" v-model="form.amount" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]" />
          <p class="f-blue nowrap" @click="handleAll">{{$t('wallet.Allcoins')}}</p>
        </div>
        <ul>
          <li
            v-for="item of available"
            :key="item"
          >{{item.coin}} {{$t('wallet.Availablequantity')}} {{item.amount}}</li>
        </ul>
      </div>
      <!-- 立即提币 -->
      <div class="submit">
        <div class="sub" @click="submit">{{$t('wallet.Submitimmediately')}}</div>
        <p class="manageAddr" @click="manageAddr">{{$t('wallet.Manageaccount')}}</p>
      </div>
    </div>

    <!-- 温馨提示 -->
    <article>
      <p style="color: #fff;">温馨提示</p>
      <section v-html="tips"></section>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActiveCoin: false,
      isActiveAddr: false,
      form: {
        coin: "USDT",
        addr: "",
        amount: "",
        cash_token_id: ""
      },
      coinDatas: ["", "", ""],
      addrDatas: [],
      // 可提数量
      available: [
        { coin: "", amount: "" },
        { coin: "", amount: "" },
        { coin: "", amount: "" }
      ],
      verification: "",
      tips: ''
    };
  },
  created() {
    let that = this;
    document.addEventListener("click", function(e) {
      if (e.target.className != "inp01") {
        that.isActiveCoin = false;
      }
      if (e.target.className != "inp02") {
        that.isActiveAddr = false;
      }
    });
    this.verification = localStorage.getItem("token");
    this.initData();
    this.getAddr();
    this.getInfo()
  },
  methods: {
    navBack() {
      this.$router.back();
    },
    // 显示选择的币种
    handleActive(type) {
      if (type == "coin") {
        this.isActiveCoin = !this.isActiveCoin;
      }
      if (type == "addr") {
        this.isActiveAddr = !this.isActiveAddr;
      }
    },
    // 下拉选择
    handleChoose(index, type) {
      if (type == "coin") {
        this.form.coin = index;
      }
      if (type == "addr") {
        this.form.addr =
          this.addrDatas[index].token + "-" + this.addrDatas[index].tip;
        this.form.cash_token_id = this.addrDatas[index].id;
      }

      this.isActiveCoin = false;
      this.isActiveAddr = false;
    },
    // 获取地址
    async getAddr() {
      const { data: res } = await this.axios.get(
        "https://exchange.gd-juzheng.com/api/user/get_my_cash_token",
        {
          params: {
            verification: this.verification
          }
        }
      );
      if (res.code == 1) {
        this.addrDatas = res.data;
      }
    },
    // 提现全部
    handleAll() {
      if (this.form.coin == "USDT") {
        this.form.amount = this.available[0].amount;
      }
      if (this.form.coin == "BTC") {
        this.form.amount = this.available[1].amount;
      }
      if (this.form.coin == "ETH") {
        this.form.amount = this.available[2].amount;
      }
    },
    // 管理提币地址
    manageAddr() {
      this.$router.push("/wallet/address");
    },
    // 获取币种数量
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
       this.available[0].amount = res.data.moneyList.BTC.account
       this.available[1].amount = res.data.moneyList.USDT.account
       this.available[2].amount = res.data.moneyList.ETH.account
       this.available[0].coin = res.data.moneyList.BTC.market
       this.available[1].coin = res.data.moneyList.USDT.market
       this.available[2].coin = res.data.moneyList.ETH.market
    },
    // 获取币种分类和温馨提示
    async getInfo() {
      const { data: res } = await this.axios.get('https://exchange.gd-juzheng.com/api/user/cash', {
        params: {
          verification: this.verification,
          lang: sessionStorage.getItem('locale')
        }
      })
      this.coinDatas[0] = res.data.coinList.USDT
      this.coinDatas[1] = res.data.coinList.BTC
      this.coinDatas[2] = res.data.coinList.ETH
      this.tips = res.data.message
    },
    // 提交提币
    submit() {
      console.log(this.form)
      if (this.form.cash_token_id) {
        if (this.form.amount > 0) {
          this.$dialog
            .confirm({
              title: "立即提币",
              message: "确认提币请求"
            })
            .then(async () => {
              const { data: res } = await this.axios.get(
                "https://exchange.gd-juzheng.com/api/user/cash_account",
                {
                  params: {
                    verification: this.verification,
                    cash_token_id: this.form.cash_token_id,
                    cash_account: this.form.amount,
                    cash_coin: this.form.coin
                  }
                }
              );
              if (res.code == 1) {
                this.$notify({
                  message: res.msg,
                  type: "success",
                  duration: 1500
                });
                this.form.amount = "";
              } else {
                this.$notify({
                  message: res.msg,
                  type: "danger",
                  duration: 1000
                });
              }
            })
            .catch(() => {
              this.$dialog.close();
            });
        } else {
          this.$notify({
            message: "请输入正确的提币数量",
            type: "danger",
            duration: 1000
          });
        }
      } else {
        this.$notify({
          message: "请选择提币地址",
          type: "danger",
          duration: 1000
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.css");
.withdrawal {
  min-height: 100%;
  background: #010a2c;
}
h2 {
  box-sizing: border-box;
  background: #010a2c;
  padding: 30px;
  display: flex;
  margin-bottom: 5px;
  p {
    font-size: 30px;
    i {
      padding-right: 20px;
    }
  }
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
      flex: 1;

      text-align: center;
      &:nth-child(1) {
        justify-content: flex-start;
        flex: 0.6;
      }
      &:nth-last-child(3) {
        flex: 1;
        word-break: break-all;
      }
      &:nth-last-child(2) {
        flex: 1;
        word-break: break-all;
      }
    }
  }
}
article {
  box-sizing: border-box;
  padding: 30px;
  color: rgb(130, 142, 161);
  p {
    margin-bottom: 30px;
  }
  /deep/ p {
    padding: 5px 0;
    font-size: 26px;
    letter-spacing: 1px;
    line-height: 30px;
  }
}
.form {
  box-sizing: border-box;
  background: #010a2c;
  padding: 30px 30px 100px 30px;
  input {
    width: 90%;
    border: none;
    background: #010a2c;
    padding: 20px;
    font-size: 28px;
    color: rgb(130, 142, 161);
  }
  .nowrap {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 28px;
  }
  ul {
    padding: 10px;
    li {
      color: rgb(130, 142, 161);
      font-size: 26px;
      padding: 10px 0;
    }
  }
  .submit {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    .sub {
      padding: 30px 50px;
      font-size: 34px;
      text-align: center;
      background: linear-gradient(
        90deg,
        rgba(54, 124, 239, 1) 0%,
        rgba(47, 175, 240, 1) 100%
      );
      border-radius: 5px;
    }
    p {
      margin: 30px 50px;
      font-size: 26px;
      color: #3573ff;
      width: 50%;
    }
  }
}
.acount {
  position: relative;
  margin-bottom: 50px;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  section {
    position: absolute;
    background: rgb(29, 38, 57);
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    top: 80px;
    z-index: 100;
    p {
      padding: 20px 0;
      color: #fff;
    }
  }
  .inp02 {
    overflow: hidden;
    word-wrap: none;
    text-overflow: ellipsis;
  }
}
</style>