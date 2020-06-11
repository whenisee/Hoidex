<template>
  <div class="new" :style="[{'background':$store.state.mode?'#ededed':'#1d2635'}]">
    <!-- 第一块 -->
    <div class="padding-b box" :style="[{'background':$store.state.mode?'#fff':'#2e2e2e'}]">
      <h2  :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]" class="padding-tb f-big f-bold">NSC</h2>
      <p>{{$t('new.issue')}}</p>
      <p class="f-blue f-bold f-big">1 NSC = {{datas.issue_price}} USDT</p>
      <div class="flex desc">
        <div>
          <section>
            <p>{{$t('new.currency')}}</p>
            <p>{{coinList}}</p>
          </section>
          <section>
            <p>{{$t('new.starttime')}}</p>
            <p>{{datas.start_issue_time_text}}</p>
          </section>
        </div>
        <div>
          <section>
            <p>{{$t('new.launchtime')}}</p>
            <p>{{datas.start_buy_time_text}}</p>
          </section>
          <section>
            <p>{{$t('new.endtime')}}</p>
            <p>{{datas.end_time_text}}</p>
          </section>
        </div>
      </div>

      <!-- 换算 -->
      <div>
        <div class="flex padding-tb">
          <div class="bottom_line choose">
            <div>
              <div :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{current_coin}}</div>
              <div>
                <i
                  id="choose01"
                  class="iconfont icon-xialasanjiaoxingx"
                  style="margin-left:0px;display:inline-block;transform:scale(0.3)"
                  :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
                  @click="handleOpen"
                ></i>
              </div>
            </div>

            <div class="list" v-if="list_show">
              <ul :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
                <li
                  v-for="item of coin"
                  :key="item"
                  @click="chooseCoin(item)"
                  :style="[{'background':$store.state.mode?'#f7efef':'#2e2e2e'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
                >{{item}}</li>
              </ul>
            </div>
          </div>
          <div class="inp bottom_line">
            <input
              style="color: #fff"
              type="number"
              placeholder="0"
              v-model="change_account"
              :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
            />
          </div>
          <div class="btn">
            <div @click="handleAll">ALL</div>
          </div>
        </div>
        <p class="padding-s">1 {{current_coin}} = {{buy_account}} NSC</p>
        <p class="padding-s">{{account}} {{current_coin}} = {{coin_account}} NSC</p>
        <div class="btn finish">
          <div @click="submit">{{$t('new.apply')}}</div>
        </div>
      </div>
    </div>

    <!-- 第二块 -->
    <div class="box" :style="[{'background':$store.state.mode?'#fff':'#2e2e2e'}]">
      <h3  :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('new.cycle')}}</h3>
      <van-steps :active="active" :style="[{'background':$store.state.mode?'#fff':'#2e2e2e'}]">
        <van-step></van-step>
        <van-step></van-step>
        <van-step></van-step>
        <van-step></van-step>
      </van-steps>
      <div class="flex flex-between steps">
        <div>
          <p>{{$t('new.preheat')}}</p>
          <p></p>
        </div>
        <div>
          <p>{{$t('new.applystart')}}</p>
          <p>{{datas.start_issue_time_text}}</p>
        </div>
        <div>
          <p>{{$t('new.applyclose')}}</p>
          <p>{{datas.end_time_text}}</p>
        </div>
        <div>
          <p>{{$t('new.result')}}</p>
          <p>{{datas.end_time_text}}</p>
        </div>
      </div>
    </div>

    <!-- 第三块 -->
    <div class="box" :style="[{'background':$store.state.mode?'#fff':'#2e2e2e'}]">
      <section v-html="datas.content" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></section>
    </div>

    <!-- 认购码弹框 -->
    <van-dialog
      v-model="code_show"
      title="输入认购码"
      show-cancel-button
      @confirm="subCode"
      @cancel="cancel"
    >
      <div class="inp_box">
        <input
          class="dialog_inp"
          v-model="sureCode"
          :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 进度条
      active: 1,
      // 获取的数据
      datas: {},
      coinList: '',
      // 币种列表
      coin: ['USDT', 'BTC', 'ETH'],
      coinInfo: [],
      current_coin: 'USDT',
      list_show: false,
      // 认购码弹框
      code_show: false,
      // 认购码
      sureCode: '',
      account: '0',
      change_account: '',
      verification: '',
      buy_account: '0',
      coin_account: '0'
    }
  },
  methods: {
    initDatas() {
      let verification = localStorage.getItem('token')
      let lang = sessionStorage.getItem('locale')
      this.axios
        .get('/user/newregion', {
          params: {
            verification,
            lang
          }
        })
        .then(res => {
            console.log(res)
            this.datas = res.data.data
            let arr = []
            for (var key in this.datas.coinList) {
              arr.push(this.datas.coinList[key])
            }
            this.coinList = arr.join('/')
        })
    },
    // 打开币种
    handleOpen() {
      this.list_show = !this.list_show
    },
    // 选择币种
    chooseCoin(item) {
      this.change_account = ''
      this.current_coin = item
      this.changeInfo()
      console.log(this.coinInfo)
      this.coinInfo.forEach(list => {
        if (list.market == item) {
          this.account = list.account
        }
      })
    },
    // 立即申购
    async submit() {
      const { data: res } = await this.axios.get('/user/check_is_buy', {
        params: {
          verification: this.verification
        }
      })
      if (res.code == 1) {
        const { data: res } = await this.axios.get('/user/change_account', {
          params: {
            verification: this.verification,
            coin: this.current_coin,
            change_account: this.change_account
          }
        })
        if (res.code == 1) {
          this.$notify({
            type: 'success',
            duration: '1000',
            message: res.msg
          })
          this.getMoney()
          this.changeInfo()
        } else {
          this.$notify({
            type: 'danger',
            duration: '1000',
            message: res.msg
          })
        }
      } else {
        console.log('未绑定认购码')
        this.code_show = true
      }
    },
    // 提交认购码
    async subCode() {
      const { data: res } = await this.axios.get('/user/check_user_code', {
        params: {
          verification: this.verification,
          code: this.sureCode
        }
      })
      console.log(res)
      if (res.code == 1) {
        this.submit()
      } else {
        this.$notify({
          type: 'danger',
          duration: '1000',
          message: res.msg
        })
      }
    },
    // 取消提交认购码
    cancel() {
      this.sureCode = ''
      this.code_show = false
    },
    // 获取用户余额
    async getMoney() {
      const { data: res } = await this.axios.get('/user/UserMoneys', {
        params: {
          verification: this.verification
        }
      })
      this.coinInfo.push({ market: 'BTC', account: res.data.BTC.account })
      this.coinInfo.push({ market: 'ETH', account: res.data.ETH.account })
      this.coinInfo.push({ market: 'USDT', account: res.data.USDT.account })
      this.coinInfo.forEach(list => {
        if (list.market == this.current_coin) {
          this.account = list.account
        }
      })
    },
    // 获取币种兑换信息
    async changeInfo() {
      const { data: res } = await this.axios.get('/data/plan_coin', {
        params: {
          verification: this.verification,
          coin: this.current_coin
        }
      })
      this.buy_account = res.buy_account
      this.coin_account = res.coin_account
    },
    // all
    handleAll() {
      this.change_account = this.coin_account
    }
  },
  created() {
    this.verification = localStorage.getItem('token')
    this.initDatas()
    console.log(this.datas)
    this.getMoney()
    this.changeInfo()
    let that = this
    document.addEventListener('click', function(e) {
      if (e.target.id != 'choose01') {
        that.list_show = false
      }
    })
  }
}
</script>

<style lang="less" scoped>
.inp_box {
  width: 100%;
  margin: 20px 0;
  text-align: center;
  .dialog_inp {
    width: 80%;
  }
}

.new {
  display: flex;
  font-size: 26px;
  flex-direction: column;
  align-items: center;
  section {
    /deep/ p {
      padding: 10px;
      font-size: 26px;
      line-height: 34px;
      word-spacing: 2px;
      /deep/ font {
        color:rgb(130, 142, 161);
      }
    }
  }
  .desc {
    p {
      padding: 10px 0;
    }
    div {
      flex: 1;
    }
    section {
      margin-top: 20px;
    }
  }
  .bottom_line {
    border-bottom: 1px solid rgb(130, 142, 161);
  }
  .choose {
    padding: 20px;
    width: 140px;
    div {
      display: flex;
      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-child(2) {
          justify-content: flex-end;
        }
      }
    }
    position: relative;
    .list {
      position: absolute;
      top: 80px;
      left: 0px;
      background: #ededed;
      z-index: 100;
      ul {
        li {
          padding: 30px 55px;
          box-sizing: border-box;
          &:nth-child(2) {
            border-top: 1px solid #777;
            border-bottom: 1px solid #777;
          }
        }
      }
    }
  }
  .inp {
    padding: 20px;
    width: 180px;
    margin: 0 20px;
    input {
      width: 100%;
      border: none;
      background: rgb(38, 48, 67);
    }
  }
  .line-height {
    line-height: 40px;
  }
  .steps {
    div {
      flex: 1;
      p {
        padding: 10px 0;
        margin: 0;
      }
      &:nth-child(2) {
        padding: 0 50px;
      }
      &:nth-child(4) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0 20px;
        p {
          text-align: end;
        }
      }
    }
    p {
      font-size: 20px;
    }
  }
  .btn {
    padding: 20px 30px;
    background: rgb(53, 115, 255);
    color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .finish {
    margin: 30px 0;
    font-size: 30px;
  }
  /deep/ .van-step__circle-container {
    background: transparent;
    i {
      font-size: 40px;
    }
  }

  p {
    color: rgb(130, 142, 161);
    font-size: 28px;
    padding: 20px 0;
  }
  h3 {
    font-size: 30px;
    padding: 10px 0;
  }
  .box {
    width: 95%;
    margin: 30px 0;
    padding: 20px;
    background: rgb(38, 48, 67);
    box-sizing: border-box;
  }
  .padding-b {
    padding: 40px;
  }
  .padding-s {
    padding: 10px 0 !important;
  }
  .padding-tb {
    padding: 20px 0;
  }
  .flex {
    display: flex;
  }
  .flex-between {
    justify-content: space-between;
  }
  .f-blue {
    color: rgb(53, 115, 255);
  }
  .f-big {
    font-size: 34px;
  }
  .f-bold {
    font-weight: bold;
  }
  .f-white {
    color: white;
  }
}
</style>